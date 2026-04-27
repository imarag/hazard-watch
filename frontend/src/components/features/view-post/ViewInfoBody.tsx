import { Stack } from '@mui/material'
import { formatCoordinates } from '@/utils/geometry'
import { hazardIconMapping } from '@/constants/hazards'
import { formatDate } from '@/utils/typography'
import type { Post } from '@/types/posts'
import PostCardText from '@/components/features/view-post/PostCardText'
import PostCardItem from '@/components/features/view-post/PostCardItem'

interface ViewInfoBodyProps {
  post: Post
  lon: number
  lat: number
}

export default function ViewInfoBody({ post, lon, lat }: ViewInfoBodyProps) {
  return (
    <Stack spacing={2}>
      <PostCardItem label='Description'>
        <PostCardText text={post.description} />
      </PostCardItem>
      <PostCardItem label='Author'>
        <PostCardText text={post.user.name} />
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
