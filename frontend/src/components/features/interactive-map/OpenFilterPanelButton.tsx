import { Box, IconButton } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'

export default function OpenFilterPanelButton({
  open,
  onClick,
}: {
  open: boolean
  onClick: () => void
}) {
  return (
    <Box
      sx={{
        position: 'absolute',
        right: 0,
        marginRight: 2,
        top: '50%',
        translateY: '-50%',
        zIndex: 1000,
      }}
    >
      <IconButton
        sx={{
          backgroundColor: 'white',
          color: 'common.black',
          boxShadow: 3,
        }}
        onClick={onClick}
      >
        <FilterListIcon fontSize='large' />
      </IconButton>
    </Box>
  )
}
