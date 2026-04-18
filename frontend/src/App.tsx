import { Routes, Route } from 'react-router'
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'
import Home from '@/components/pages/home'
import AppLayout from '@/components/layouts/AppLayout'
import MainLayout from '@/components/layouts/MainLayout'
import { CssBaseline } from '@mui/material'
import CreatePost from '@/components/pages/CreatePost'
import ViewPost from '@/components/pages/ViewPost'

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
            <Route path='/posts/create' element={<CreatePost />} />
            <Route path='/posts/:id' element={<ViewPost />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
