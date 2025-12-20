import '../styles/globals.css'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { API_BASE_URL } from '../lib/api'
import Loader from '../components/Loader'

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for stored auth token
    const token = localStorage.getItem('token')
    if (token) {
      // Fetch user data
      fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(res => {
          if (res.ok) {
            return res.json()
          }
          // If not authenticated, clear token
          if (res.status === 401 || res.status === 403) {
            localStorage.removeItem('token')
            setUser(null)
            return null
          }
          throw new Error('Not authenticated')
        })
        .then(data => {
          if (data && data._id) {
            setUser(data)
          }
        })
        .catch((error) => {
          // Silently handle API errors - user can still use the app
          if (process.env.NODE_ENV === 'development') {
            console.warn('Auth check failed (API may be unavailable):', error.message)
          }
          localStorage.removeItem('token')
          setUser(null)
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = (userData, token) => {
    setUser(userData)
    localStorage.setItem('token', token)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
    router.push('/')
  }

  if (loading) {
    return <Loader fullScreen={true} size="xl" />
  }

  return <Component {...pageProps} user={user} login={login} logout={logout} />
}

export default MyApp



