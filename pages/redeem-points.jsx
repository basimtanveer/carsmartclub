import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Loader from '../components/Loader'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function RedeemPoints({ user, login, logout }) {
  const router = useRouter()
  const [rewards, setRewards] = useState([])
  const [pointsBalance, setPointsBalance] = useState(null)
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(true)
  const [redeeming, setRedeeming] = useState(null)

  useEffect(() => {
    if (!user) {
      router.push('/signin')
      return
    }
    fetchData()
  }, [user, category])

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token')
      const [balanceRes, rewardsRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api'}/points/balance`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api'}/rewards${category ? `?category=${category}` : ''}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
      ])

      if (balanceRes.ok) {
        const balanceData = await balanceRes.json()
        setPointsBalance(balanceData)
      }

      if (rewardsRes.ok) {
        const rewardsData = await rewardsRes.json()
        setRewards(rewardsData)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRedeem = async (rewardId) => {
    if (!confirm(`Redeem ${rewards.find(r => r._id === rewardId)?.name} for ${rewards.find(r => r._id === rewardId)?.pointsRequired} points?`)) {
      return
    }

    setRedeeming(rewardId)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api'}/rewards/${rewardId}/redeem`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (res.ok) {
        const data = await res.json()
        alert(`Successfully redeemed! You have ${data.remainingPoints} points remaining.`)
        fetchData()
      } else {
        const error = await res.json()
        alert(error.message || 'Failed to redeem reward')
      }
    } catch (error) {
      alert('Error redeeming reward. Please try again.')
    } finally {
      setRedeeming(null)
    }
  }

  return (
    <>
      <Head>
        <title>Redeem Car Smart Points - Car Smart Club</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
        <Header user={user} logout={logout} />
        {loading ? (
          <Loader fullScreen={true} size="xl" />
        ) : (
          <>
            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Turn Your Car Smart Points into Real Car Care</h1>
            <p className="text-gray-300 text-lg">
              Your points are more than just numbers — they're your pass to easier, smarter, and more affordable car maintenance.
            </p>
          </div>

          {/* Points Balance */}
          {pointsBalance && (
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 mb-8 shadow-xl">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-green-100 text-sm mb-2">Available Points</p>
                  <h2 className="text-5xl font-bold">{pointsBalance.availablePoints || 0}</h2>
                  <p className="text-green-100 text-sm mt-2">≈ ${((pointsBalance.availablePoints || 0) / 50).toFixed(2)} value (50 pts = $1)</p>
                </div>
                <Link href="/earn-points" className="bg-white text-green-600 px-6 py-3 rounded-xl font-semibold hover:bg-green-50 transition-all">
                  Earn More Points
                </Link>
              </div>
            </div>
          )}

          {/* Categories */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={() => setCategory('')}
              className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                category === '' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-slate-700/60 hover:bg-slate-700'
              }`}
            >
              All Rewards
            </button>
            {['Essential Maintenance', 'Car Wash & Detailing', 'Exclusive Discounts', 'Premium Upgrades'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                  category === cat ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-slate-700/60 hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Rewards Grid */}
          {rewards.length === 0 ? (
            <div className="text-center py-12 bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-slate-700/50">
              <p className="text-gray-400 text-lg">No rewards available at the moment. Check back soon!</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {rewards.map((reward) => {
                const canAfford = pointsBalance && pointsBalance.availablePoints >= reward.pointsRequired
                return (
                  <div key={reward._id} className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all">
                    <div className="mb-4">
                      <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-xs font-semibold">
                        {reward.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{reward.name}</h3>
                    {reward.description && (
                      <p className="text-gray-400 text-sm mb-4">{reward.description}</p>
                    )}
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="text-2xl font-bold text-green-400">{reward.pointsRequired} pts</p>
                        <p className="text-xs text-gray-400">≈ ${(reward.pointsRequired / 50).toFixed(2)} value</p>
                      </div>
                      {reward.provider && (
                        <p className="text-sm text-cyan-400">{reward.provider.name}</p>
                      )}
                    </div>
                    <button
                      onClick={() => handleRedeem(reward._id)}
                      disabled={!canAfford || redeeming === reward._id}
                      className={`w-full py-3 rounded-xl font-semibold transition-all ${
                        canAfford
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
                          : 'bg-slate-700/60 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {redeeming === reward._id ? 'Redeeming...' : canAfford ? 'Redeem Now' : 'Insufficient Points'}
                    </button>
                  </div>
                )
              })}
            </div>
          )}

          {/* How Redemption Works */}
          <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 mb-8">
            <h2 className="text-2xl font-bold mb-6">How Redemption Works</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-cyan-500 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-semibold mb-1">Check Your Balance</h3>
                  <p className="text-gray-300 text-sm">Log into your dashboard to view your available Car Smart Points.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-cyan-500 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-semibold mb-1">Browse Rewards</h3>
                  <p className="text-gray-300 text-sm">Select from available services, credits or special offers from our participating network.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-cyan-500 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-semibold mb-1">Redeem Instantly</h3>
                  <p className="text-gray-300 text-sm">At checkout or booking, apply the points (50 points = $1 credit) to reduce your out-of-pocket cost.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-cyan-500 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h3 className="font-semibold mb-1">Enjoy the Savings</h3>
                  <p className="text-gray-300 text-sm">Your points save you money — it's that simple.</p>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-500/20 border border-blue-500/50 rounded-lg">
              <p className="text-sm text-blue-300">
                🔄 No Rush, No Expiration: Points remain active for up to 36 months from issuance. Use them anytime for maintenance, upgrades or member-only rewards.
              </p>
            </div>
          </div>

          {/* What You Can Redeem For */}
          <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50">
            <h2 className="text-2xl font-bold mb-6">What You Can Redeem For</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4">Reward Type</th>
                    <th className="text-left py-3 px-4">Examples</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-700/50">
                    <td className="py-3 px-4 font-semibold">Essential Maintenance</td>
                    <td className="py-3 px-4 text-gray-300">Oil changes, tire rotations, brake services</td>
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="py-3 px-4 font-semibold">Car Wash & Detailing</td>
                    <td className="py-3 px-4 text-gray-300">Keep your car spotless and shining</td>
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="py-3 px-4 font-semibold">Exclusive Discounts</td>
                    <td className="py-3 px-4 text-gray-300">Use points toward credits on your next visit</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold">Premium Upgrades</td>
                    <td className="py-3 px-4 text-gray-300">Apply points to premium packages or partner offers</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              More providers = more rewards. As we onboard new local service and accessory partners, your redemption options will expand — from detailing shops to repair discounts and accessories.
            </p>
          </div>
          </main>
          <Footer />
          </>
        )}
      </div>
    </>
  )
}

