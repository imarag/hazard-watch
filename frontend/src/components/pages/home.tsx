import { useState, useMemo } from 'react'
import postsService from '@/services/posts'
import { Box, Typography } from '@mui/material'
import PostsList from '../features/posts/PostsList'
import PostsToolBar from '../features/posts/PostsToolBar'
import type { SortField, SortDirection } from '@/types/posts'
import { sortPosts } from '@/utils/posts'
import { appRoutes } from '@/constants/routes'
import CreatePostAction from '../actions/CreatePostAction'
import { useAuth } from '@/contexts/AuthContext'
import { useNotification } from '@/contexts/NotificationContext'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import PageLayout from '../layouts/PageLayout'

export default function Home() {
  const { createNotification, showNotification } = useNotification()
  const { isUserLoggedIn } = useAuth()

  const [sortField, setSortField] = useState<SortField>('createdAt')
  const [sortDir, setSortDir] = useState<SortDirection>('desc')

  const Actions = isUserLoggedIn ? <CreatePostAction /> : null

  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    initialData: [],
    queryFn: async () => {
      try {
        return await postsService.getAllPosts()
      } catch (error: unknown) {
        let errorMessage = 'Something went wrong'
        if (axios.isAxiosError(error)) {
          errorMessage = error.response?.data?.message ?? errorMessage
        }
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

  const sortedPosts = useMemo(
    () => sortPosts(posts, sortField, sortDir),
    [posts, sortField, sortDir],
  )

  return (
    <PageLayout pageTitle={appRoutes.home.pageTitle} actions={Actions}>
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ grow: 0 }}>
          <PostsToolBar
            sortField={sortField}
            sortDir={sortDir}
            setSortDir={setSortDir}
            setSortField={setSortField}
            posts={sortedPosts}
          />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          {isLoading ? (
            <Typography>Loading posts...</Typography>
          ) : (
            <PostsList posts={sortedPosts} />
          )}
        </Box>
      </Box>
    </PageLayout>
  )
}
