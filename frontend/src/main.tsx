import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import AuthContextProvider from '@/components/providers/AuthContextProvider.tsx'
import ThemeContextProvider from './components/providers/ThemeContextProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <ThemeContextProvider>
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </ThemeContextProvider>,
)
