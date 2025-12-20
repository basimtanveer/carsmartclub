import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import { API_BASE_URL } from '../lib/api'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Join({ user, login, logout }) {
  const router = useRouter()
  const { ref } = router.query
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    zipCode: '',
    ageRange: '',
    preferences: [],
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [referralCode, setReferralCode] = useState(ref || '')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          zipCode: formData.zipCode,
          ageRange: formData.ageRange,
          preferences: formData.preferences,
          referralCode: referralCode || undefined,
        }),
      })

      if (!res.ok) {
        try {
          const data = await res.json()
          setError(data.message || 'Registration failed. Please check your information.')
        } catch (jsonError) {
          setError('Registration failed. Please try again.')
        }
        setLoading(false)
        return
      }

      const data = await res.json()
      if (data.token) {
        login(data, data.token)
        router.push('/')
      } else {
        setError('Registration failed. Please try again.')
      }
    } catch (error) {
      console.error('Registration error:', error)
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
        <title>Join - Car Smart Club</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white flex flex-col">
        <Header user={user} logout={logout} />
        <div className="flex-1 px-4 py-8 pt-24 overflow-y-auto">
          <div className="max-w-5xl w-full mx-auto">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold mb-2">Join Car Smart Club</h1>
              <p className="text-gray-400">Start your journey to better car care</p>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50">
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm md:col-span-2">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-700/60 border border-slate-600 rounded-lg focus:border-cyan-500 focus:outline-none"
                      required
                    />
                  </div>

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

                  <div>
                    <label className="block text-sm font-medium mb-2">Confirm Password</label>
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-700/60 border border-slate-600 rounded-lg focus:border-cyan-500 focus:outline-none"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone (optional)</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-700/60 border border-slate-600 rounded-lg focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">ZIP Code (optional)</label>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-700/60 border border-slate-600 rounded-lg focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  
                  {referralCode && (
                    <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 md:col-span-2">
                      <p className="text-sm text-green-400">🎉 Referral code detected! You&apos;ll earn bonus points when you join.</p>
                      <input
                        type="text"
                        value={referralCode}
                        onChange={(e) => setReferralCode(e.target.value)}
                        className="w-full mt-2 px-4 py-2 bg-slate-700/60 border border-slate-600 rounded-lg focus:border-cyan-500 focus:outline-none"
                        placeholder="Referral code"
                      />
                    </div>
                  )}

                  <div className="md:col-span-2 pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 py-3 rounded-xl font-semibold transition-all disabled:opacity-50"
                    >
                      {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                  </div>
                </div>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-400">
                  Already have an account?{' '}
                  <Link href="/signin" className="text-cyan-400 hover:text-cyan-300 font-semibold">
                    Sign In
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



