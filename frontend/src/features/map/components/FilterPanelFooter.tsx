import { Button, Box } from '@mui/material'

interface FilterPanelFooterProps {
  applySettings: () => void
  restoreSettings: () => void
}

export default function FilterPanelFooter({
  applySettings,
  restoreSettings
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
        onClick={applySettings}
        size='small'
        variant='contained'
      >
        apply
      </Button>
      <Button
        onClick={restoreSettings}
        size='small'
        color='error'
        variant='outlined'
      >
        restore defaults
      </Button>
    </Box>
  )
}
