import { Typography, Grid, Box } from '@mui/material'
import Loading from '@/components/ui/Loading'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import ViewPostInfoCard from '@/features/posts/components/ViewPostInfoCard'
import DeletePostAction from '@/features/posts/components/DeletePostAction'
import GoToEditPostAction from '@/features/posts/components/GoToEditPostAction'
import ActionBar from '@/components/ui/ActionBar'
import { useNotificationActions } from '@/shared/stores/notification'
import { useCurrentUser, useIsUserLoggedIn } from '@/features/auth/store'
import PostViewMap from '@/features/posts/components/PostViewMap'
import { getPostQueryOptions } from '@/features/posts/queries'

export default function ViewPost() {
  const { showNotification, createNotification } = useNotificationActions()
  const { id: postId } = useParams()
  const currentUser = useCurrentUser()
  const isUserLoggedIn = useIsUserLoggedIn()

  const { data: post = null, isLoading } = useQuery(
    getPostQueryOptions(postId, (errorMessage: string) => {
      showNotification(createNotification(errorMessage, 'error'))
    }),
  )

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
              <ViewPostInfoCard post={post} />
            </Grid>
            <Grid
              size={{ xs: 12, lg: 6, xl: 8 }}
              sx={{ height: { xs: '400px', sm: '100%' } }}
            >
              <PostViewMap post={post} />
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  )
}
