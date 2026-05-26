import { Stack } from '@mui/material'
import { formatCoordinates } from '@/utils/geometry'
import { hazardIconMapping } from '@/constants/hazards'
import { formatDate } from '@/utils/typography'
import type { Post } from '@/types/posts'
import PostCardText from '@/components/features/view-post/PostCardText'
import PostCardItem from '@/components/features/view-post/PostCardItem'

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
          text={post.hazardType}
          icon={hazardIconMapping[post.hazardType]}
        />
      </PostCardItem>
      <PostCardItem label='Coordinates'>
        <PostCardText text={formatCoordinates(lon, lat)} />
      </PostCardItem>
      <PostCardItem label='Report creation date'>
        <PostCardText text={formatDate(post.createdAt)} />
      </PostCardItem>
    </Stack>
  )
}
