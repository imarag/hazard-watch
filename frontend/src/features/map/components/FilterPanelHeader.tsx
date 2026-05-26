import { Box, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface FilterPanelHeaderProps {
  onClosePanel: () => void
}

export default function FilterPanelHeader({
  onClosePanel,
}: FilterPanelHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <IconButton onClick={onClosePanel}>
        <CloseIcon />
      </IconButton>
      <Typography sx={{ fontWeight: 'fontWeightBold' }} variant='subtitle1'>
        Filters
      </Typography>
    </Box>
  )
}
