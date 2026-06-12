import { Stack } from '@mui/material'
import { formatCoordinates } from '@/shared/utils/geometry'
import { hazardMeta } from '@/features/hazards/constants'
import { formatDate } from '@/shared/utils/typography'
import type { Post } from '@/features/posts/types'
import PostCardText from '@/features/posts/components/PostCardText'
import PostCardItem from '@/features/posts/components/PostCardItem'

interface PostViewInfoBodyProps {
  post: Post
}

export default function ViewPostInfoBody({ post }: PostViewInfoBodyProps) {
  const lon = post.longitude
  const lat = post.latitude
  return (
    <Stack spacing={2}>
      <PostCardItem label='Description'>
        <PostCardText text={post.description} />
      </PostCardItem>
      <PostCardItem label='Author'>
        <PostCardText text={post.author.name} />
      </PostCardItem>
      <PostCardItem label='Hazard type'>
        <PostCardText
          text={post.hazard_type}
          icon={hazardMeta[post.hazard_type]['muiIcon']}
        />
      </PostCardItem>
      <PostCardItem label='Coordinates'>
        <PostCardText text={formatCoordinates(lon, lat)} />
      </PostCardItem>
      <PostCardItem label='Report creation date'>
        <PostCardText text={formatDate(post.created_at)} />
      </PostCardItem>
    </Stack>
  )
}
