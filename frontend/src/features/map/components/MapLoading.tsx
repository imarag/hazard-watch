import { Box, Backdrop, CircularProgress, Typography } from '@mui/material'

interface MapLoadingProps {
  open?: boolean
  text: string
}

export default function MapLoading({ open = false, text }: MapLoadingProps) {
  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Backdrop
        sx={(theme) => ({
          zIndex: theme.zIndex.drawer + 1,
          position: 'absolute',
        })}
        open={open}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            alignItems: 'center',
          }}
        >
          <Typography variant='body1' sx={{ fontWeight: 'fontWeightBold' }}>
            {text}
          </Typography>
          <CircularProgress color='inherit' />
        </Box>
      </Backdrop>
    </Box>
  )
}
