import { Card, CardContent, Divider } from '@mui/material'
import ViewPostInfoTitle from '@/features/posts/components/ViewPostInfoTitle'
import ViewPostInfoBody from '@/features/posts/components/ViewPostInfoBody'

export default function ViewPostInfoCard() {
  return (
    <Card
      variant='outlined'
      sx={{ height: '100%', borderRadius: 4, overflowY: 'auto' }}
    >
      {/* <CardContent sx={{ padding: 4 }}>
        <ViewInfoTitle title={post.title} hazardType={post.hazardType} />
        <Divider sx={{ borderColor: 'divider', marginBlock: 2 }} />
        <ViewInfoBody post={post} />
      </CardContent> */}
    </Card>
  )
}
