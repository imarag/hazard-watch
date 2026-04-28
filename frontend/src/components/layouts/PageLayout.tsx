import { Box } from '@mui/material'
import TopBar from '@/components/structure/TopBar'

interface PageLayoutProps {
  pageTitle: string
  children: React.ReactNode
  actions?: React.ReactNode
  isAuth?: boolean
}

export default function PageLayout({
  pageTitle,
  actions,
  children,
  isAuth = false,
}: PageLayoutProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ flexGrow: 0 }}>
        <TopBar title={pageTitle} isAuth={isAuth}>
          {actions}
        </TopBar>
      </Box>
      <Box sx={{ flexGrow: 1, padding: 2 }}>{children}</Box>
    </Box>
  )
}
