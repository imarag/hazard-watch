import { Stack, Typography } from '@mui/material'

interface FilterPanelSectionProps {
  title: string
  children: React.ReactNode
}

export default function FilterPanelSection({
  title,
  children,
}: FilterPanelSectionProps) {
  return (
    <Stack direction='column' spacing={1}>
      <Typography
        variant='subtitle1'
        sx={{ fontWeight: 'fontWeightMedium', color: 'text.secondary' }}
      >
        {title}
      </Typography>
      {children}
    </Stack>
  )
}
