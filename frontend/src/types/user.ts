export interface CurrentUser {
  id: string
  username: string
}

export type CurrentUserContextType = {
  currentUser: CurrentUser | null
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>
}
