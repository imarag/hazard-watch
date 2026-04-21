import { matchPath, useLocation } from 'react-router'
import { appRoutes } from '../constants/routes'
import type { AppRoute } from '@/types/routes'

export function usePageRoute(): AppRoute {
  const { pathname } = useLocation()
  const matchedRouteName = Object.keys(appRoutes).find((routeName) =>
    matchPath(appRoutes[routeName].path, pathname),
  )
  return matchedRouteName ? appRoutes[matchedRouteName] : appRoutes.home
}
