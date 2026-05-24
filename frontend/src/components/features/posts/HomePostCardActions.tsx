import type { Post } from '@/types/posts'
import { Box } from '@mui/material'
import { useCurrentUser } from '@/stores/auth'
import GoToEditPostAction from '@/components/actions/GoToEditPostAction'
import DeletePostAction from '@/components/actions/DeletePostAction'
import ViewPostAction from '@/components/actions/ViewPostAction'

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
