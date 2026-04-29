import type { Post } from '@/types/posts'
import { Box } from '@mui/material'
import { useAuth } from '@/contexts/AuthContext'
import GoToEditPostAction from '@/components/actions/GoToEditPostAction'
import DeletePostAction from '@/components/actions/DeletePostAction'
import ViewPostAction from '@/components/actions/ViewPostAction'

interface HomePostCardActionsProps {
  post: Post
}

export default function HomePostCardActions({
  post,
}: HomePostCardActionsProps) {
  const { currentUser } = useAuth()

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <ViewPostAction postId={post.id} />
      {currentUser?.id === post.user.id && (
        <>
          <GoToEditPostAction post={post} />
          <Box sx={{ marginLeft: 'auto' }}>
            <DeletePostAction post={post} />
          </Box>
        </>
      )}
    </Box>
  )
}
