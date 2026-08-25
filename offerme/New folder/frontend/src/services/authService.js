

const DemoAuth = {
  _user: null,
  _listeners: [],

  signUp(email, password, displayName) {
    const users = JSON.parse(localStorage.getItem('demo_users') || '[]')
    if (users.find((u) => u.email === email)) {
      throw new Error('Email already in use')
    }
    const user = {
      uid: 'demo_' + Date.now(),
      email,
      displayName,
      role: 'user',
    }
    users.push({ ...user, password })
    localStorage.setItem('demo_users', JSON.stringify(users))
    this._user = user
    localStorage.setItem('demo_session', JSON.stringify(user))
    this._notify()
    return Promise.resolve(user)
  },

  signIn(email, password) {
    const users = JSON.parse(localStorage.getItem('demo_users') || '[]')
    const found = users.find((u) => u.email === email && u.password === password)
    if (!found) throw new Error('Invalid email or password')
    const { password: _, ...user } = found
    this._user = user
    localStorage.setItem('demo_session', JSON.stringify(user))
    this._notify()
    return Promise.resolve(user)
  },

  signOut() {
    this._user = null
    localStorage.removeItem('demo_session')
    this._notify()
    return Promise.resolve()
  },

  onAuthChange(callback) {
    const session = localStorage.getItem('demo_session')
    if (session) {
      this._user = JSON.parse(session)
    }
    setTimeout(() => callback(this._user), 0)
    this._listeners.push(callback)
    return () => {
      this._listeners = this._listeners.filter((l) => l !== callback)
    }
  },

  _notify() {
    this._listeners.forEach((cb) => cb(this._user))
  },
}

export const authService = {
  async signUp(email, password, displayName) {
    return DemoAuth.signUp(email, password, displayName)
  },

  async signIn(email, password) {
    return DemoAuth.signIn(email, password)
  },

  async signOut() {
    return DemoAuth.signOut()
  },

  getCurrentUser() {
    return DemoAuth._user
  },

  onAuthChange(callback) {
    return DemoAuth.onAuthChange(callback)
  },
}
