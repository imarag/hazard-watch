import type { Post } from '@/features/posts/types'
import { Box } from '@mui/material'
import { useCurrentUser } from '@/features/auth/store'
import GoToEditPostAction from '@/features/posts/components/GoToEditPostAction'
import DeletePostAction from '@/features/posts/components/DeletePostAction'
import ViewPostAction from '@/features/posts/components/ViewPostAction'

interface HomePostCardActionsProps {
  post: Post
}

export default function HomePostCardActions({
  post,
}: HomePostCardActionsProps) {
  const currentUser = useCurrentUser()

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <ViewPostAction postId={post.id} />
      {currentUser?.id === post.author.id && (
        <>
          <GoToEditPostAction post={post} />
          <DeletePostAction post={post} />
        </>
      )}
    </Box>
  )
}
