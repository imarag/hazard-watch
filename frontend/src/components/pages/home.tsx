import { useState, useMemo } from 'react'
import postsService from '@/services/posts'
import { Box } from '@mui/material'
import PostsList from '@/components/features/posts/PostsList'
import type { SortField, SortDirection } from '@/types/posts'
import { sortPosts } from '@/utils/posts'
import { appRoutes } from '@/constants/routes'
import CreatePostAction from '@/components/actions/CreatePostAction'
import { useAuth } from '@/contexts/AuthContext'
import { useNotification } from '@/contexts/NotificationContext'
import { useQuery } from '@tanstack/react-query'
import { getErrorMessage } from '@/utils/auth'
import PageLayout from '@/components/layouts/PageLayout'
import PostSearchBar from '@/components/features/home/PostSearchBar.tsx'
import PostToolBar from '@/components/features/home/PostToolBar'
import Loading from '@/components/ui/Loading'

export default function Home() {
  const { createNotification, showNotification } = useNotification()
  const { isUserLoggedIn } = useAuth()

  const [sortField, setSortField] = useState<SortField>('createdAt')
  const [sortDir, setSortDir] = useState<SortDirection>('desc')
  const [searchText, setSearchText] = useState('')

  const Actions = isUserLoggedIn ? <CreatePostAction /> : null

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
    <PageLayout pageTitle={appRoutes.home.pageTitle} actions={Actions}>
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
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
    </PageLayout>
  )
}
