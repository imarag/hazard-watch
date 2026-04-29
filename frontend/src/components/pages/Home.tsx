import { useState, useMemo } from 'react'
import postsService from '@/services/posts'
import { Box } from '@mui/material'
import { appRoutes } from '@/constants/routes'
import AddIcon from '@mui/icons-material/Add'
import PostsList from '@/components/features/posts/PostsList'
import type { SortField, SortDirection } from '@/types/posts'
import { sortPosts } from '@/utils/posts'
import { useNotification } from '@/contexts/NotificationContext'
import { useQuery } from '@tanstack/react-query'
import { getErrorMessage } from '@/utils/auth'
import PostSearchBar from '@/components/features/home/PostSearchBar.tsx'
import PostToolBar from '@/components/features/home/PostToolBar'
import Loading from '@/components/ui/Loading'
import ActionButton from '../ui/ActionButton'

export default function Home() {
  const { createNotification, showNotification } = useNotification()

  const [sortField, setSortField] = useState<SortField>('createdAt')
  const [sortDir, setSortDir] = useState<SortDirection>('desc')
  const [searchText, setSearchText] = useState('')

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      try {
        return await postsService.getAllPosts()
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(error)
        showNotification(
          createNotification(
            `Cannot fetch the posts: ${errorMessage}`,
            'error',
          ),
        )
        throw error
      }
    },
  })

  const filteredPosts = useMemo(() => {
    return searchText
      ? posts.filter((p) =>
          Object.values(p).some((val) =>
            String(val).toLowerCase().includes(searchText.toLowerCase()),
          ),
        )
      : posts
  }, [searchText, posts])

  const sortedPosts = useMemo(
    () => sortPosts(filteredPosts, sortField, sortDir),
    [filteredPosts, sortField, sortDir],
  )

  const totalPosts = posts.length
  const totalFilteredPosts = filteredPosts.length

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'end',
        }}
      >
        <ActionButton
          to={appRoutes.createPost.path}
          icon={AddIcon}
          label='Create Post'
          variant='contained'
        />
      </Box>
      <PostSearchBar
        disabled={isLoading}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <PostToolBar
        isLoading={isLoading}
        sortField={sortField}
        sortDir={sortDir}
        setSortDir={setSortDir}
        setSortField={setSortField}
        totalPosts={totalPosts}
        totalFilteredPosts={totalFilteredPosts}
      />
      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        {isLoading ? (
          <Loading text='Loading posts' />
        ) : (
          <PostsList posts={sortedPosts} />
        )}
      </Box>
    </Box>
  )
}
