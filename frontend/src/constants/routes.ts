export const appRoutes = {
  home: {
    path: '/',
    title: 'Posts',
    pageTitle: 'Hazard reports',
  },
  createPost: {
    path: '/posts/create',
    title: 'Create Post',
    pageTitle: 'Report a hazard',
  },
  viewPost: {
    path: '/posts/:id',
    title: 'View Post',
    pageTitle: 'Hazard report',
  },
  editPost: {
    path: '/posts/:id/edit',
    title: 'Edit Post',
    pageTitle: 'Edit hazard report',
  },
  map: {
    path: '/map',
    title: 'Map',
    pageTitle: 'Hazard map',
  },
  about: {
    path: '/about',
    title: 'About',
    pageTitle: 'About Hazard Watch & Me',
  },
  login: {
    path: '/auth/login',
    title: 'Login',
    pageTitle: 'Login',
  },
  register: {
    path: '/auth/register',
    title: 'Register',
    pageTitle: 'Register',
  },
  logout: {
    path: '',
    title: 'Logout',
    pageTitle: 'Logout',
  },
  forgotPassword: {
    path: '/auth/forgot-password',
    title: 'Forgot Password',
    pageTitle: 'Forgot Password',
  },
  resetPassword: {
    path: '/auth/reset-password',
    title: 'Reset Password',
    pageTitle: 'Reset Password',
  },
} as const

export type RouteKey = keyof typeof appRoutes
export type AppRoute = {
  path: string
  title: string
  pageTitle: string
}
export type AppRoutes = Record<RouteKey, AppRoute>
