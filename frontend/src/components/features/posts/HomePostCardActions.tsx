import type { Post } from '@/types/posts'
import { Box } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { getErrorMessage } from '@/utils/auth'
import { useNavigate } from 'react-router'
import { useAuth } from '@/contexts/AuthContext'
import EditPostAction from '@/components/actions/EditPostAction'
import DeletePostAction from '@/components/actions/DeletePostAction'
import postsService from '@/services/posts'
import ViewPostAction from '@/components/actions/ViewPostAction'
import { useNotification } from '@/contexts/NotificationContext'

interface HomePostCardActionsProps {
  post: Post
}

export default function HomePostCardActions({
  post,
}: HomePostCardActionsProps) {
  const { currentUser } = useAuth()
  const { createNotification, showNotification } = useNotification()
  const navigate = useNavigate()

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

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <ViewPostAction postId={post.id} />
      {currentUser?.id === post.user.id && (
        <>
          <EditPostAction postId={post.id} />
          <Box sx={{ marginLeft: 'auto' }}>
            <DeletePostAction
              postId={post.id}
              loading={deleteMutation.isPending}
              onDeletePost={async () => deleteMutation.mutate(post.id)}
            />
          </Box>
        </>
      )}
    </Box>
  )
}
