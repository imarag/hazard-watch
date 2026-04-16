import { Typography } from '@mui/material'
import type React from 'react'

export default function Title({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      variant='h5'
      component='h2'
      align='center'
      sx={{ fontWeight: 'fontWeightMedium' }}
    >
      {children}
    </Typography>
  )
}
