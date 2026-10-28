import { createContext, useContext } from 'react'

export const RouterContext = createContext({
  route: '/',
  navigate: () => {},
})

export function useRouter() {
  return useContext(RouterContext)
}
