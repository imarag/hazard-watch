import { Box } from '@mui/material'
import PostCardTitle from './PostCardTitle'

interface PostCardItemProps {
  label: string
  children: React.ReactNode
}

export default function PostCardItem({ label, children }: PostCardItemProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
      <PostCardTitle label={label} />
      {children}
    </Box>
  )
}
