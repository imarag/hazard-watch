import { Routes, Route } from 'react-router'
import { CssBaseline } from '@mui/material'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import ForgotPassword from '@/pages/ForgotPassword'
import ResetPassword from '@/pages/ResetPassword'
import Home from '@/pages/Home'
import CreatePost from '@/pages/CreatePost'
import ViewPost from '@/pages/ViewPost'
import EditPost from '@/pages/EditPost'
import Explore from '@/pages/Explore'
import About from '@/pages/about/About'
import Search from '@/pages/Search'
import ProtectedRoute from '@/features/auth/components/ProtectedRoute'
import AuthGate from '@/features/auth/components/AuthGate'
import AppLayout from '@/components/layout/AppLayout'
import MainLayout from '@/components/layout/MainLayout'
import AuthLayout from '@/components/layout/AuthLayout'
import { appRoutes } from '@/shared/constants/routes'

import 'react-leaflet-cluster/dist/assets/MarkerCluster.css'
import 'react-leaflet-cluster/dist/assets/MarkerCluster.Default.css'

function App() {
  return (
    <div>
      <CssBaseline />
      <AuthGate>
        <Routes>
          <Route element={<MainLayout />}>
            <Route element={<AuthLayout />}>
              <Route path={appRoutes.login.path} element={<Login />} />
              <Route
                path={appRoutes.resetPassword.path}
                element={<ResetPassword />}
              />
              <Route path={appRoutes.register.path} element={<Register />} />
              <Route
                path={appRoutes.forgotPassword.path}
                element={<ForgotPassword />}
              />
            </Route>
            <Route element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route element={<ProtectedRoute />}>
                <Route
                  path={appRoutes.createPost.path}
                  element={<CreatePost />}
                />
                <Route path={appRoutes.editPost.path} element={<EditPost />} />
              </Route>
              <Route path={appRoutes.search.path} element={<Search />} />
              <Route path={appRoutes.viewPost.path} element={<ViewPost />} />
              <Route path={appRoutes.map.path} element={<Explore />} />
              <Route path={appRoutes.about.path} element={<About />} />
            </Route>
          </Route>
        </Routes>
      </AuthGate>
    </div>
  )
}

export default App
