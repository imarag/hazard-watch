import {
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  Box,
} from '@mui/material'
import Loading from '@/components/ui/Loading'
import { getErrorMessage } from '@/utils/auth'
import { useNotification } from '@/contexts/NotificationContext'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import postsService from '@/services/posts'
import ViewInfoTitle from '@/components/features/view-post/ViewInfoTitle'
import ViewInfoBody from '@/components/features/view-post/ViewInfoBody'
import ViewMap from '@/components/features/view-post/ViewMap'
import DeletePostAction from '@/components/actions/DeletePostAction'
import GoToEditPostAction from '@/components/actions/GoToEditPostAction'
import ActionBar from '@/components/actions/ActionBar'
import { useAuth } from '@/contexts/AuthContext'

export default function ViewPost() {
  const { createNotification, showNotification } = useNotification()
  const { id: postId } = useParams()
  const { currentUser, isUserLoggedIn } = useAuth()

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
  const isSameUser = isUserLoggedIn && currentUser?.id === post?.user.id
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
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
              <Card
                variant='outlined'
                sx={{ height: '100%', borderRadius: 4, overflowY: 'auto' }}
              >
                <CardContent sx={{ padding: 4 }}>
                  <ViewInfoTitle
                    title={post.title}
                    hazardType={post.hazardType}
                  />
                  <Divider sx={{ borderColor: 'divider', marginBlock: 2 }} />
                  <ViewInfoBody post={post} />
                </CardContent>
              </Card>
            </Grid>
            <Grid
              size={{ xs: 12, lg: 6, xl: 8 }}
              sx={{ height: { xs: '400px', sm: '100%' } }}
            >
              <ViewMap post={post} />
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  )
}
