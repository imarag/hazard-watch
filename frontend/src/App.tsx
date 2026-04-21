import { Routes, Route } from 'react-router'
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'
import Home from './components/pages/Home'
import AppLayout from '@/components/layouts/AppLayout'
import MainLayout from '@/components/layouts/MainLayout'
import { CssBaseline } from '@mui/material'
import CreatePost from '@/components/pages/CreatePost'
import ViewPost from '@/components/pages/ViewPost'
import UpdatePost from './components/pages/UpdatePost'
import InteractiveMap from '@/components/pages/InteractiveMap'
import About from './components/pages/About'
import ProtectedRoute from './components/auth/ProtectedRoute'

function App() {
  return (
    <div>
      <CssBaseline />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/register' element={<Register />} />
          <Route element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/posts/create' element={<CreatePost />} />
              <Route path='/posts/:id/edit' element={<UpdatePost />} />
            </Route>
            <Route path='/posts/:id' element={<ViewPost />} />
            <Route path='/map' element={<InteractiveMap />} />
            <Route path='/about' element={<About />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
