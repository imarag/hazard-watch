import CreatePostAction from '@/components/actions/CreatePostAction'
import EditPostAction from '@/components/actions/EditPostAction'
import BackToPostsAction from '@/components/actions/BackToPostsAction'
import DeletePostAction from '@/components/actions/DeletePostAction'
import type { AppRoutes } from '@/types/routes'

export const authRequiredActions = [
  CreatePostAction,
  EditPostAction,
  DeletePostAction,
]

export const appRoutes: AppRoutes = {
  home: {
    path: '/',
    title: 'Posts',
    pageTitle: 'Hazard reports',
    actions: [CreatePostAction],
  },
  createPost: {
    path: '/posts/create',
    title: 'Create Post',
    pageTitle: 'Report a hazard',
    actions: [],
  },
  viewPost: {
    path: '/posts/:id',
    title: 'View Post',
    pageTitle: 'Hazard report',
    actions: [EditPostAction, DeletePostAction],
  },
  editPost: {
    path: '/posts/:id/edit',
    title: 'Edit Post',
    pageTitle: 'Edit hazard report',
    actions: [BackToPostsAction],
  },
  map: {
    path: '/map',
    title: 'Map',
    pageTitle: 'Hazard map',
    actions: [],
  },
  about: {
    path: '/about',
    title: 'About',
    pageTitle: 'About Hazard Watch',
    actions: [],
  },
  login: {
    path: '/auth/login',
    title: 'Login',
    pageTitle: 'Login',
    actions: [],
  },
  register: {
    path: '/auth/register',
    title: 'Register',
    pageTitle: 'Register',
    actions: [],
  },
  logout: {
    path: '',
    title: 'Logout',
    pageTitle: 'Logout',
    actions: [],
  },
} as const
