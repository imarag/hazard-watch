export type AppRoute = {
  path: string
  title: string
  pageTitle: string
  actions: Array<() => React.ReactElement>
}

export type AppRoutes = Record<string, AppRoute>
