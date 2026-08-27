import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '@/services/authService'
import { firestoreService } from '@/services/firestoreService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = authService.onAuthChange(async (firebaseUser) => {
      setUser(firebaseUser)
      if (firebaseUser) {
        const profile = await firestoreService.getDocument(
          firestoreService.COLLECTIONS.USERS,
          firebaseUser.uid
        )
        setUserProfile(profile)
      } else {
        setUserProfile(null)
      }
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const signUp = async (email, password, displayName, role = 'user') => {
    const firebaseUser = await authService.signUp(email, password, displayName)
    await firestoreService.createDocument(firestoreService.COLLECTIONS.USERS, {
      uid: firebaseUser.uid,
      email,
      displayName,
      role,
      phone: '',
      bio: '',
      avatar: '',
    })
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
    await firestoreService.updateDocument(
      firestoreService.COLLECTIONS.USERS,
      user.uid,
      data
    )
    setUserProfile((prev) => ({ ...prev, ...data }))
  }

  const value = {
    user,
    userProfile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
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
