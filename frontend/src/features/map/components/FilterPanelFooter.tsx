import { Button, Box } from '@mui/material'

interface FilterPanelFooterProps {
  resetConfig: () => void
}

export default function FilterPanelFooter({
  resetConfig,
}: FilterPanelFooterProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexShrink: 0,
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Button
        onClick={resetConfig}
        size='small'
        color='error'
        variant='outlined'
      >
        restore defaults
      </Button>
    </Box>
  )
}
