import { Typography, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router'
import type React from 'react'

type FormFooterProps = {
  children?: React.ReactNode
  to: string
  linkText: string
}

export default function FormFooter({
  children,
  to,
  linkText,
}: FormFooterProps) {
  return (
    <Typography variant='caption' align='center'>
      {children}{' '}
      <Link component={RouterLink} to={to}>
        {linkText}
      </Link>
    </Typography>
  )
}
