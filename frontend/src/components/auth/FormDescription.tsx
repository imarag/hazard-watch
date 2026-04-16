import { Typography, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router'
import type React from 'react'

type FormDescriptionProps = {
  children?: React.ReactNode
  to: string
  linkText: string
}

export default function FormDescription({
  children,
  to,
  linkText,
}: FormDescriptionProps) {
  return (
    <Typography variant='caption' align='center'>
      {children}{' '}
      <Link component={RouterLink} to={to}>
        {linkText}
      </Link>
    </Typography>
  )
}
