import { Box, Container, Stack, Typography } from '@mui/material'

interface FormContainerProps {
  children: React.ReactNode
  title: string
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void
  footer?: React.ReactNode
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export default function FormContainer({
  children,
  title,
  onSubmit,
  footer,
  maxWidth = 'xs',
}: FormContainerProps) {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container
        maxWidth={maxWidth}
        sx={{
          backgroundColor: 'background.paper',
          py: 4,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
        }}
      >
        <Stack
          component='form'
          onSubmit={onSubmit}
          spacing={3}
          sx={{ paddingInline: 2 }}
        >
          <Typography
            variant='h5'
            align='center'
            sx={{ mb: 1, fontWeight: 'fontWeightBold' }}
          >
            {title}
          </Typography>
          {children}
          {footer && <Box sx={{ textAlign: 'center' }}>{footer}</Box>}
        </Stack>
      </Container>
    </Box>
  )
}
