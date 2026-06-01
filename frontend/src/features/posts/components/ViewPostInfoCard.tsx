import { Card, Divider, CardContent } from '@mui/material'
import ViewPostInfoBody from './ViewPostInfoBody'
import ViewPostInfoTitle from './ViewPostInfoTitle'
import type { Post } from '../types'

interface ViewPostInfoCardProps {
  post: Post
}

export default function ViewPostInfoCard({ post }: ViewPostInfoCardProps) {
  return (
    <Card
      variant='outlined'
      sx={{ height: '100%', borderRadius: 4, overflowY: 'auto' }}
    >
      <CardContent sx={{ padding: 4 }}>
        <ViewPostInfoTitle title={post.title} hazardType={post.hazardType} />
        <Divider sx={{ borderColor: 'divider', marginBlock: 2 }} />
        <ViewPostInfoBody post={post} />
      </CardContent>
    </Card>
  )
}
