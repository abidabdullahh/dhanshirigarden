import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

const USERS_STORAGE_KEY = 'dg_users_database'
const CURRENT_USER_KEY = 'dg_current_user'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(CURRENT_USER_KEY)
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  // Synchronize registered user into persistent database
  const recordUserEntry = (userData) => {
    try {
      const raw = localStorage.getItem(USERS_STORAGE_KEY)
      const list = raw ? JSON.parse(raw) : []
      const existingIdx = list.findIndex((u) => u.email === userData.email)

      const updatedUser = {
        ...userData,
        lastActive: new Date().toISOString(),
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
      }

      if (existingIdx >= 0) {
        list[existingIdx] = {
          ...list[existingIdx],
          ...updatedUser,
          loginCount: (list[existingIdx].loginCount || 1) + 1,
        }
      } else {
        list.push({
          ...updatedUser,
          registeredAt: new Date().toISOString(),
          loginCount: 1,
          orders: [],
        })
      }

      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(list))
    } catch (e) {
      console.error('Failed to persist user profile:', e)
    }
  }

  // Google Sign-In Handler
  const loginWithGoogle = (customProfile = null) => {
    const profile = customProfile || {
      id: 'g_' + Math.random().toString(36).substring(2, 9),
      name: 'Abid Abdullah',
      email: 'abidabdullah.dev@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      provider: 'google',
    }

    setUser(profile)
    try {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(profile))
    } catch {}

    recordUserEntry(profile)
    return profile
  }

  const logout = () => {
    setUser(null)
    try {
      localStorage.removeItem(CURRENT_USER_KEY)
    } catch {}
  }

  const getAllUsers = () => {
    try {
      const raw = localStorage.getItem(USERS_STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loginWithGoogle,
        logout,
        getAllUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
