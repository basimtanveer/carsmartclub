import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import { API_BASE_URL } from '../lib/api'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function SignIn({ user, login, logout }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        try {
          const data = await res.json()
          setError(data.message || 'Invalid credentials. Please check your email and password.')
        } catch (jsonError) {
          setError('Invalid credentials. Please check your email and password.')
        }
        setLoading(false)
        return
      }

      const data = await res.json()
      if (data.token) {
        login(data, data.token)
        router.push('/')
      } else {
        setError('Login failed. Please try again.')
      }
    } catch (error) {
      console.error('Login error:', error)
      if (error.message?.includes('Failed to fetch') || error.message?.includes('ERR_CONNECTION_REFUSED')) {
        setError('Unable to connect to the server. Please ensure the backend API server is running.')
      } else {
        setError('An error occurred. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Sign In - Car Smart Club</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white flex flex-col">
        <Header user={user} logout={logout} />
        <div className="flex-1 px-4 py-8 pt-24">
          <div className="max-w-md w-full mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Sign In</h1>
              <p className="text-gray-400">Welcome back to Car Smart Club</p>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-700/60 border border-slate-600 rounded-lg focus:border-cyan-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-700/60 border border-slate-600 rounded-lg focus:border-cyan-500 focus:outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 py-3 rounded-xl font-semibold transition-all disabled:opacity-50"
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-400">
                  Don&apos;t have an account?{' '}
                  <Link href="/join" className="text-cyan-400 hover:text-cyan-300 font-semibold">
                    Join Now
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

