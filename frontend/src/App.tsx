import { Routes, Route } from 'react-router'
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'
import Home from '@/components/home'
import AppLayout from './components/layouts/AppLayout'
import MainLayout from './components/layouts/MainLayout'
import { CssBaseline } from '@mui/material'

function App() {
  return (
    <div>
      <CssBaseline />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/register' element={<Register />} />
          <Route element={<AppLayout />}>
            <Route path='/' element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
