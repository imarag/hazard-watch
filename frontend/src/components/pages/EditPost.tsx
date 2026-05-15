import { useParams } from 'react-router'
import { Box } from '@mui/material'
import EditPostForm from '@/components/features/edit-post/EditPostForm'
import Loading from '@/components/ui/Loading'
import { getErrorMessage } from '@/utils/auth'
import { useQuery } from '@tanstack/react-query'
import postsService from '@/services/posts'
import { useNotificationActions } from '@/stores/notification'

export default function EditPost() {
  const { id: postId } = useParams()
  const { showNotification, createNotification } = useNotificationActions()

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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flexGrow: 1 }}>
        {isLoading ? (
          <Loading text='Loading post' />
        ) : post ? (
          <EditPostForm key={post.id} post={post} />
        ) : null}
      </Box>
    </Box>
  )
}
