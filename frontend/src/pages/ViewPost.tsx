import { Typography, Grid, Box } from '@mui/material'
import Loading from '@/components/ui/Loading'
import { getErrorMessage } from '@/utils/auth'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import postsService from '@/services/posts'
import ViewPostInfoCard from '@/features/posts/components/ViewPostInfoCard'
// import ViewMap from '@/features/posts/components/ViewMap'
import DeletePostAction from '@/features/posts/components/DeletePostAction'
import GoToEditPostAction from '@/features/posts/components/GoToEditPostAction'
import ActionBar from '@/components/ui/ActionBar'
import { useNotificationActions } from '@/stores/notification'
import { useCurrentUser, useIsUserLoggedIn } from '@/stores/auth'

export default function ViewPost() {
  const { showNotification, createNotification } = useNotificationActions()
  const { id: postId } = useParams()
  const currentUser = useCurrentUser()
  const isUserLoggedIn = useIsUserLoggedIn()

  const { data: post = null, isLoading } = useQuery({
    queryKey: ['post', postId],
    enabled: !!postId,
    queryFn: async () => {
      try {
        return await postsService.getPostById(postId!)
      } catch (error: unknown) {
        showNotification(
          createNotification(
            `Cannot fetch the post: ${getErrorMessage(error)}`,
            'error',
          ),
        )
        throw error
      }
    },
  })
  const isSameUser = isUserLoggedIn && currentUser?.id === post?.author.id
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        gap: { xs: 1, sm: 2 },
      }}
    >
      {isSameUser && post && (
        <ActionBar>
          <GoToEditPostAction post={post} />
          <DeletePostAction post={post} />
        </ActionBar>
      )}
      <Box sx={{ flexGrow: 1 }}>
        {isLoading ? (
          <Loading text='Loading post' />
        ) : !post ? (
          <Typography>Post not found.</Typography>
        ) : (
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ height: '100%' }}
          >
            <Grid
              size={{ xs: 12, lg: 6, xl: 4 }}
              sx={{
                height: { xs: 'min-content', lg: '100%' },
                overflowY: 'auto',
              }}
            >
              <ViewPostInfoCard />
            </Grid>
            <Grid
              size={{ xs: 12, lg: 6, xl: 8 }}
              sx={{ height: { xs: '400px', sm: '100%' } }}
            >
              {/* <ViewMap post={post} /> */}
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  )
}
