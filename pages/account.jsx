import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import toast from 'react-hot-toast'
import { API_BASE_URL } from '../lib/api'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Account({ user, login, logout }) {
  const router = useRouter()
  const [memberStatus, setMemberStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push('/signin')
      return
    }
    fetchMemberStatus()
  }, [user, router])

  const fetchMemberStatus = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${API_BASE_URL}/members/status`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      const data = await res.json()
      setMemberStatus(data)
    } catch (error) {
      console.error('Error fetching member status:', error)
    }
  }

  const handleJoinMember = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${API_BASE_URL}/members/join`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      if (res.ok) {
        const data = await res.json()
        setMemberStatus(data)
        toast.success('Successfully joined Car Smart Club! 🎉 Enjoy exclusive member benefits!', {
          duration: 5000,
        })
        // Refresh member status to show updated UI
        await fetchMemberStatus()
      } else {
        const errorData = await res.json()
        toast.error(errorData.message || 'Failed to join. Please try again.')
      }
    } catch (error) {
      console.error('Error joining:', error)
      toast.error('An error occurred. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>My Account - Car Smart Club</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
        {/* Header */}
        <Header user={user} logout={logout} />

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 mt-8 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">My Account</h1>
            <p className="text-gray-300 text-lg">Manage your account and membership</p>
          </div>

          <div className="space-y-6">
            {/* Profile Info */}
            <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50">
              <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                  <p className="text-lg">{user?.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                  <p className="text-lg">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Membership Status */}
            <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50">
              <h2 className="text-2xl font-bold mb-6">Membership Status</h2>
              {memberStatus?.isMember ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <p className="text-lg font-semibold text-green-400">You are a Car Smart Club Member!</p>
                      {memberStatus.memberSince && (
                        <p className="text-sm text-gray-400">
                          Member since {new Date(memberStatus.memberSince).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                    <p className="text-sm text-green-400">
                      Enjoy exclusive member benefits including discounts, priority booking, and verified provider access.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-gray-300">You are not currently a member. Join now to unlock exclusive benefits!</p>
                  <button
                    onClick={handleJoinMember}
                    disabled={loading}
                    className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-50"
                  >
                    {loading ? 'Joining...' : 'Join Car Smart Club'}
                  </button>
                </div>
              )}
            </div>

            {/* Quick Links */}
            <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50">
              <h2 className="text-2xl font-bold mb-6">Quick Links</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/garage" className="p-4 bg-slate-700/60 rounded-lg hover:bg-slate-700 transition-all">
                  <h3 className="font-semibold mb-2">🚗 My Garage</h3>
                  <p className="text-sm text-gray-400">Manage your vehicles</p>
                </Link>
                <Link href="/diagnostics" className="p-4 bg-slate-700/60 rounded-lg hover:bg-slate-700 transition-all">
                  <h3 className="font-semibold mb-2">🔧 Diagnostics</h3>
                  <p className="text-sm text-gray-400">Run vehicle diagnostics</p>
                </Link>
                <Link href="/evaluation" className="p-4 bg-slate-700/60 rounded-lg hover:bg-slate-700 transition-all">
                  <h3 className="font-semibold mb-2">📊 Evaluation</h3>
                  <p className="text-sm text-gray-400">Get car evaluation</p>
                </Link>
                <Link href="/deals" className="p-4 bg-slate-700/60 rounded-lg hover:bg-slate-700 transition-all">
                  <h3 className="font-semibold mb-2">💡 Smart Deals</h3>
                  <p className="text-sm text-gray-400">View exclusive deals</p>
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}

