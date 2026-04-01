const isBrowser = typeof window !== 'undefined'

export const setToken = (token) => isBrowser && localStorage.setItem('token', token)
export const getToken = () => isBrowser ? localStorage.getItem('token') : null
export const removeToken = () => isBrowser && localStorage.removeItem('token')

export const setUser = (user) => isBrowser && localStorage.setItem('user', JSON.stringify(user))
export const getUser = () => {
  if (!isBrowser) return null
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}
export const removeUser = () => isBrowser && localStorage.removeItem('user')

export const logout = () => {
  if (!isBrowser) return
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}