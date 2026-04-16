import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { createTheme, ThemeProvider } from '@mui/material'
import UserContextProvider from './components/providers/UserContextProvider.tsx'

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1d232a',
      paper: '#191e24',
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
