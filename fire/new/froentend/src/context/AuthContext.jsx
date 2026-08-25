import { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../config/firebase';
import api from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const isInitialLoad = useRef(true);

  const fetchProfile = async (firebaseUser) => {
    const token = await firebaseUser.getIdToken(true);
    const { data } = await api.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUserProfile(data.profile);
    return data.profile;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser && isInitialLoad.current) {
        try {
          await fetchProfile(firebaseUser);
        } catch {
          setUserProfile(null);
        }
      } else if (!firebaseUser) {
        setUserProfile(null);
      }
      isInitialLoad.current = false;
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const register = async (email, password, profileData) => {
    let cred;
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      cred = result.user;
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        const result = await signInWithEmailAndPassword(auth, email, password);
        cred = result.user;
      } else {
        throw err;
      }
    }
    const token = await cred.getIdToken();
    await api.post(
      '/auth/register-profile',
      {
        name: profileData.name,
        email,
        phone: profileData.phone,
        location: profileData.location,
        role: profileData.role,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const profile = await fetchProfile(cred);
    setUser(cred);
    return { credential: cred, profile };
  };

  const login = async (email, password) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    setUser(cred.user);
    let profile = null;
    try {
      profile = await fetchProfile(cred.user);
    } catch (err) {
      if (err.response?.status === 404) {
        profile = { uid: cred.user.uid, email: cred.user.email, role: 'user', incomplete: true };
        setUserProfile(profile);
      } else {
        throw err;
      }
    }
    return { credential: cred.user, profile };
  };

  const logout = () => {
    setUser(null);
    setUserProfile(null);
    return signOut(auth);
  };

  const hasRole = (role) => userProfile?.role === role;

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, register, login, logout, hasRole, fetchProfile, setUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
