import { Card, CardContent, Divider } from '@mui/material'
import ViewPostInfoTitle from '@/components/features/post/componentsViewPostInfoTitle'
import ViewPostInfoBody from '@/components/features/post/componentsViewPostInfoBody'

export default function ViewPostInfoCard() {
  return (
    <Card
      variant='outlined'
      sx={{ height: '100%', borderRadius: 4, overflowY: 'auto' }}
    >
      <CardContent sx={{ padding: 4 }}>
        <ViewInfoTitle title={post.title} hazardType={post.hazardType} />
        <Divider sx={{ borderColor: 'divider', marginBlock: 2 }} />
        <ViewInfoBody post={post} />
      </CardContent>
    </Card>
  )
}
