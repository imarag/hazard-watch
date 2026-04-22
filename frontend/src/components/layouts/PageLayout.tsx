import { Box } from '@mui/material'
import TopBar from '../structure/TopBar'

interface PageLayoutProps {
  pageTitle: string
  children: React.ReactNode
  actions?: React.ReactNode
}

export default function PageLayout({
  pageTitle,
  actions,
  children,
}: PageLayoutProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ flexGrow: 0 }}>
        <TopBar title={pageTitle}>{actions}</TopBar>
      </Box>
      <Box sx={{ flexGrow: 1, padding: 2 }}>{children}</Box>
    </Box>
  )
}
