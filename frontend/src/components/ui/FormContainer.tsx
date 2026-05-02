import { Box, Container, Stack, Typography } from '@mui/material'

interface FormContainerProps {
  children: React.ReactNode
  title: string
  subtitle?: string
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void
  footer?: React.ReactNode
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export default function FormContainer({
  children,
  title,
  subtitle,
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
          sx={{ paddingInline: { xs: 0, md: 1, xl: 2 } }}
        >
          <Box sx={{ marginBottom: 1 }}>
            <Typography
              variant='h5'
              align='center'
              sx={{ fontWeight: 'fontWeightBold' }}
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography
                variant='subtitle1'
                align='center'
                sx={{
                  fontWeight: 'fontWeightMedium',
                  color: 'text.disabled',
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
          {children}
          {footer && <Box sx={{ textAlign: 'center' }}>{footer}</Box>}
        </Stack>
      </Container>
    </Box>
  )
}
