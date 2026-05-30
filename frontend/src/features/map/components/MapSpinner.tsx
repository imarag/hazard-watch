import { PuffLoader } from 'react-spinners'
import { Box } from '@mui/material'
export default function MapSpinner() {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
      }}
    >
      <PuffLoader color='#464646' size={80} />
    </Box>
  )
}
