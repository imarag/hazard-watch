import { Card, CardContent, Typography, Divider, Grid } from '@mui/material'
import Loading from '../ui/Loading'
import { getErrorMessage } from '@/utils/auth'
import { useNotification } from '@/contexts/NotificationContext'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import postsService from '@/services/posts'
import { useAuth } from '@/contexts/AuthContext'
import { useNavigate } from 'react-router'
import { appRoutes } from '@/constants/routes'
import PageLayout from '../layouts/PageLayout'
import EditPostAction from '../actions/EditPostAction'
import DeletePostAction from '../actions/DeletePostAction'
import type { Post } from '@/types/posts'
import ViewInfoTitle from '../features/view-post/ViewInfoTitle'
import ViewInfoBody from '../features/view-post/ViewInfoBody'
import ViewMap from '../features/view-post/ViewMap'

function ViewInfo({ post }: { post: Post }) {
  const lat = post.location.geometry.coordinates[1]
  const lon = post.location.geometry.coordinates[0]
  return (
    <Card variant='outlined' sx={{ height: '100%', borderRadius: 4 }}>
      <CardContent sx={{ padding: 4 }}>
        <ViewInfoTitle title={post.title} hazardType={post.hazardType} />
        <Divider sx={{ borderColor: 'divider', marginBlock: 2 }} />
        <ViewInfoBody post={post} lon={lon} lat={lat} />
      </CardContent>
    </Card>
  )
}

export default function ViewPost() {
  const { createNotification, showNotification } = useNotification()
  const navigate = useNavigate()
  const { id: postId } = useParams()
  const { currentUser, isUserLoggedIn } = useAuth()

  const { data: post = null, isLoading } = useQuery({
    queryKey: ['post', postId],
    enabled: !!postId,
    queryFn: () => postsService.getPostById(postId!),
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error)
      showNotification(
        createNotification(`Cannot fetch the post: ${errorMessage}`, 'error'),
      )
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (postId: string) => {
      return await postsService.deletePost(postId)
    },
    onSuccess: () => {
      showNotification(
        createNotification('Post deleted succesfully.', 'success'),
      )
      navigate('/')
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error)
      showNotification(
        createNotification(`Cannot delete the post: ${errorMessage}`, 'error'),
      )
    },
  })

  const isSameUser = post?.user.id === currentUser?.id
  const Action =
    isSameUser && isUserLoggedIn && post ? (
      <>
        <EditPostAction postId={post.id} />
        <DeletePostAction
          postId={post.id}
          loading={deleteMutation.isPending}
          onDeletePost={async () => deleteMutation.mutate(post.id)}
        />
      </>
    ) : null

  return (
    <PageLayout pageTitle={appRoutes.viewPost.pageTitle} actions={Action}>
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
          <Grid size={4}>
            <ViewInfo post={post} />
          </Grid>
          <Grid size={8}>
            <ViewMap post={post} />
          </Grid>
        </Grid>
      )}
    </PageLayout>
  )
}
