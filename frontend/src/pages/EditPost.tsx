import { useParams, Navigate } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import EditPostForm from '@/features/posts/components/EditPostForm'
import Loading from '@/components/ui/Loading'
import { getPostById } from '@/features/posts/services'
import { useNotificationActions } from '@/shared/stores/notification'
import { getErrorMessage } from '@/features/auth/utils'

export default function EditPost() {
  const { id: postId } = useParams<{ id: string }>()
  const { showNotification, createNotification } = useNotificationActions()

  const { data: post, isLoading } = useQuery({
    queryKey: ['post', postId],
    enabled: !!postId,
    queryFn: async () => {
      try {
        return await getPostById(postId!)
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

  if (!postId) {
    return <Navigate to='/' replace />
  }

  if (isLoading) {
    return <Loading text='Loading post' />
  }

  if (!post) {
    return <Navigate to='/' replace />
  }

  return <EditPostForm post={post} />
}
