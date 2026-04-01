'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { getToken, getUser, setToken, setUser, logout } from '../lib/auth.js'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(() => {
    const token = getToken()
    const user = getUser()
    if (token && user) return user
    return null
  })
  const [loading, setLoading] = useState(true)

useEffect(() => {
  const checkAuth = async () => {
    const token = getToken()
    const user = getUser()
    if (token && user) {
      setUserState(user)
    }
    setLoading(false)
  }
  checkAuth()
}, [])


  const login = (token, userData) => {
    setToken(token)
    setUser(userData)
    setUserState(userData)
  }

  const logoutUser = () => {
    logout()
    setUserState(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout: logoutUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)