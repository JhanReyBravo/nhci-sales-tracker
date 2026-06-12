import { createContext, useContext, useState } from 'react'
import api from './api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('nhci_user')) } catch { return null }
  })

  async function login(email, password) {
    const { data } = await api.post('/login', { email, password })
    localStorage.setItem('nhci_token', data.token)
    localStorage.setItem('nhci_user', JSON.stringify(data.user))
    setUser(data.user)
    return data.user
  }

  async function logout() {
    try { await api.post('/logout') } catch {}
    localStorage.removeItem('nhci_token')
    localStorage.removeItem('nhci_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
