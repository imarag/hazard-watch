import { Typography } from '@mui/material'
import type { SvgIconComponent } from '@mui/icons-material'

interface PostCardTextProps {
  text: string
  icon?: SvgIconComponent | null
}

export default function PostCardText({ text, icon: Icon }: PostCardTextProps) {
  return (
    <Typography
      variant='body1'
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.75,
      }}
    >
      {text}
      {Icon && <Icon fontSize='small' />}
    </Typography>
  )
}
