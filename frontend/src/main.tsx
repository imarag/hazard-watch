import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import AuthContextProvider from '@/components/providers/AuthContextProvider.tsx'
import ThemeContextProvider from '@/components/providers/ThemeContextProvider.tsx'
import NotificationContextProvider from '@/components/providers/NotificationContextProvider.tsx'
import SideNavContextProvider from '@/components/providers/SideNavContextProvider.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ThemeContextProvider>
        <NotificationContextProvider>
          <AuthContextProvider>
            <SideNavContextProvider>
              <App />
            </SideNavContextProvider>
          </AuthContextProvider>
        </NotificationContextProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  </QueryClientProvider>,
)
