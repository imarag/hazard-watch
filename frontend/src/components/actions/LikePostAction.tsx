import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ActionButton from '@/components/ui/ActionButton'
import { getErrorMessage } from '@/utils/auth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import postsService from '@/services/posts'
import type { Post } from '@/types/posts'
import { useNotificationActions } from '@/stores/notification'

interface LikePostActionProps {
  post: Post
}

export default function LikePostAction({ post }: LikePostActionProps) {
  const { showNotification, createNotification } = useNotificationActions()
  const queryClient = useQueryClient()

  const userLikedPost = post.likedByCurrentUser

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      userLikedPost
        ? postsService.unlikePost(post.id)
        : postsService.likePost(post.id),

    onMutate: async () => {
      // cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['posts'] })

      // snapshot current value in case we need to roll back
      const previousPosts = queryClient.getQueryData(['posts'])

      queryClient.setQueryData(['posts'], (old: Post[] | undefined) => {
        if (!old) return old
        return old.map((p) =>
          p.id === post.id
            ? {
                ...p,
                likedByCurrentUser: !p.likedByCurrentUser,
                likeCount: p.likedByCurrentUser
                  ? p.likeCount - 1
                  : p.likeCount + 1,
              }
            : p,
        )
      })

      return { previousPosts }
    },

    onError: (error: unknown, _, mutateResult) => {
      // roll back to previous value on error
      queryClient.setQueryData(['posts'], mutateResult?.previousPosts)
      showNotification(
        createNotification(
          `Cannot like the post: ${getErrorMessage(error)}`,
          'error',
        ),
      )
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  return (
    <ActionButton
      onClick={() => mutate()}
      loading={isPending}
      icon={userLikedPost ? FavoriteIcon : FavoriteBorderIcon}
      variant='outlined'
      color='error'
    />
  )
}
