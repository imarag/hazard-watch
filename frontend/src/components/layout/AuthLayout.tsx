import { Box, Typography } from '@mui/material'
import BackToHomeAction from '../actions/BackToHomeAction'
import { Outlet } from 'react-router'

export default function AuthLayout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 3,
        }}
      >
        <Typography variant='h6'>Hazard-Watch</Typography>
        <BackToHomeAction />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ padding: { xs: 1, md: 2 } }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
