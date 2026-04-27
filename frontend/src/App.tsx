import { Routes, Route } from 'react-router'
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'
import Home from './components/pages/Home'
import AppLayout from '@/components/layouts/AppLayout'
import MainLayout from '@/components/layouts/MainLayout'
import { CssBaseline } from '@mui/material'
import CreatePost from '@/components/pages/CreatePost'
import ViewPost from '@/components/pages/ViewPost'
import EditPost from './components/pages/EditPost'
import InteractiveMap from '@/components/pages/InteractiveMap'
import About from './components/pages/About'
import ProtectedRoute from './components/auth/ProtectedRoute'
import { appRoutes } from './constants/routes'

import 'react-leaflet-cluster/dist/assets/MarkerCluster.css'
import 'react-leaflet-cluster/dist/assets/MarkerCluster.Default.css'

function App() {
  return (
    <div>
      <CssBaseline />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={appRoutes.login.path} element={<Login />} />
          <Route path={appRoutes.register.path} element={<Register />} />
          <Route element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route element={<ProtectedRoute />}>
              <Route
                path={appRoutes.createPost.path}
                element={<CreatePost />}
              />
              <Route path={appRoutes.editPost.path} element={<EditPost />} />
            </Route>
            <Route path={appRoutes.viewPost.path} element={<ViewPost />} />
            <Route path={appRoutes.map.path} element={<InteractiveMap />} />
            <Route path={appRoutes.about.path} element={<About />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
