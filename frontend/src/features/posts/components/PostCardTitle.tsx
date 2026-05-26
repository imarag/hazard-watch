import { Typography } from '@mui/material'

interface PostCardTitleProps {
  label: string
}

export default function PostCardTitle({ label }: PostCardTitleProps) {
  return (
    <Typography
      variant='body1'
      sx={{
        color: 'text.disabled',
        fontWeight: 'fontWeightBold',
        paddingBlock: 1,
      }}
    >
      {label}
    </Typography>
  )
}
