import { Box, Typography, Button } from '@mui/material'

interface FilterPanelFooterProps {
  onClearFilters: () => void
  totalPosts: number
}

export default function FilterPanelFooter({
  onClearFilters,
  totalPosts,
}: FilterPanelFooterProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Typography variant='body2' sx={{ color: 'text.disabled' }}>
        Found{' '}
        <Typography
          component='span'
          variant='body2'
          sx={{ fontWeight: 'fontWeightBold' }}
        >
          {totalPosts}
        </Typography>{' '}
        reports.
      </Typography>
      <Button size='small' variant='outlined' onClick={onClearFilters}>
        Clear filters
      </Button>
    </Box>
  )
}
