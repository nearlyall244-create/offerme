import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '@/services/authService'

const AuthContext = createContext(null)

async function fetchProfile(token) {
  const res = await fetch('/api/auth?action=get-profile', {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) return null
  const data = await res.json()
  if (!data.profile) return null

  // Normalize role names: backend returns 'customer'/'vendor', frontend uses 'user'/'business'
  const roleMap = { customer: 'user', vendor: 'business' }
  const normalizedRole = roleMap[data.role] || data.role

  return { ...data.profile, role: normalizedRole }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = authService.onAuthChange(async (firebaseUser) => {
      setUser(firebaseUser)
      if (firebaseUser) {
        try {
          const token = await authService.getToken()
          if (token) {
            const profile = await fetchProfile(token)
            setUserProfile(profile)
          }
        } catch {
          setUserProfile(null)
        }
      } else {
        setUserProfile(null)
      }
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const signUp = async (email, password, displayName, role = 'user', phone_number = '') => {
    const firebaseUser = await authService.signUp(email, password, displayName)
    const token = await authService.getToken()

    const isVendor = role === 'business' || role === 'vendor'

    if (isVendor) {
      const res = await fetch('/api/auth?action=signup-vendor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ shop_name: displayName || 'My Shop', phone_number }),
      })
      const data = await res.json()
      setUserProfile(data.shop ? { ...data.shop, role: 'business' } : { firebase_uid: firebaseUser.uid, email, displayName, role: 'business' })
    } else {
      const res = await fetch('/api/auth?action=signup-customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: displayName, phone_number }),
      })
      const data = await res.json()
      setUserProfile(data.customer ? { ...data.customer, role: 'user' } : { firebase_uid: firebaseUser.uid, email, displayName, role: 'user' })
    }

    return firebaseUser
  }

  const signIn = async (email, password) => {
    return authService.signIn(email, password)
  }

  const signOut = async () => {
    await authService.signOut()
    setUser(null)
    setUserProfile(null)
  }

  const updateProfile = async (data) => {
    if (!user) return
    setUserProfile((prev) => ({ ...prev, ...data }))
  }

  const refreshProfile = async () => {
    const token = await authService.getToken()
    if (token) {
      const profile = await fetchProfile(token)
      setUserProfile(profile)
    }
  }

  const value = {
    user,
    userProfile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    refreshProfile,
    isUser: userProfile?.role === 'user',
    isBusiness: userProfile?.role === 'business',
    isAdmin: userProfile?.role === 'admin',
  }

  return (
    <AuthContext.Provider value={value}>
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
