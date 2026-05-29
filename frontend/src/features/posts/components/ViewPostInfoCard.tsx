import { Card } from '@mui/material'

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
