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
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography variant='body2'>
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
      <Button size='small' variant='text' onClick={onClearFilters}>
        Clear filters
      </Button>
    </Box>
  )
}
