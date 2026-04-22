import type { AppRoutes } from '@/types/routes'

export const appRoutes: AppRoutes = {
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
    pageTitle: 'About Hazard Watch',
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
} as const
