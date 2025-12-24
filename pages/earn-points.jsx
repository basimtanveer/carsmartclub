import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Loader from '../components/Loader'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function EarnPoints({ user, login, logout }) {
  const router = useRouter()
  const [pointsBalance, setPointsBalance] = useState(null)
  const [pointsHistory, setPointsHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push('/signin')
      return
    }
    fetchPointsData()
  }, [user, router])

  const fetchPointsData = async () => {
    try {
      const token = localStorage.getItem('token')
      const [balanceRes, historyRes] = await Promise.all([
        fetch(`${API_BASE_URL}/points/balance`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
        fetch(`${API_BASE_URL}/points?status=active`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
      ])

      if (balanceRes.ok) {
        const balanceData = await balanceRes.json()
        setPointsBalance(balanceData)
      }

      if (historyRes.ok) {
        const historyData = await historyRes.json()
        setPointsHistory(historyData.points || [])
      }
    } catch (error) {
      console.error('Error fetching points:', error)
    } finally {
      setLoading(false)
    }
  }


  return (
    <>
      <Head>
        <title>Earn Car Smart Points - Car Smart Club</title>
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
            <h1 className="text-4xl font-bold mb-4">Earn Car Smart Points Every Time You Care for Your Car</h1>
            <p className="text-gray-300 text-lg">
              The smarter way to maintain your vehicle — earn points automatically whenever you book a service, buy products, or refer friends. Every action brings you closer to real rewards.
            </p>
          </div>

          {/* Points Balance Card */}
          {pointsBalance && (
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 mb-8 shadow-xl">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-blue-100 text-sm mb-2">Available Points</p>
                  <h2 className="text-5xl font-bold">{pointsBalance.availablePoints || 0}</h2>
                  <p className="text-blue-100 text-sm mt-2">≈ ${((pointsBalance.availablePoints || 0) / 50).toFixed(2)} value</p>
                </div>
                <div className="text-right">
                  <p className="text-blue-100 text-sm mb-2">Total Earned</p>
                  <h3 className="text-3xl font-bold">{pointsBalance.totalPoints || 0}</h3>
                </div>
              </div>
            </div>
          )}

          {/* Why Car Smart Points */}
          <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 mb-8">
            <h2 className="text-2xl font-bold mb-6">Why Car Smart Points?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-cyan-400 mb-2">● Simple & Transparent</h3>
                <p className="text-gray-300 text-sm mb-4">Earn 1 point for every $1 you spend (pre-tax) at any participating partner.</p>
              </div>
              <div>
                <h3 className="font-semibold text-cyan-400 mb-2">● Automatic & Seamless</h3>
                <p className="text-gray-300 text-sm mb-4">No extra steps. Points accumulate once your purchase or service is verified.</p>
              </div>
              <div>
                <h3 className="font-semibold text-cyan-400 mb-2">● Flexible Rewards</h3>
                <p className="text-gray-300 text-sm mb-4">Redeem points for discounts, services, accessories, or special offers.</p>
              </div>
              <div>
                <h3 className="font-semibold text-cyan-400 mb-2">● Exclusive Benefits</h3>
                <p className="text-gray-300 text-sm mb-4">Members gain access to early-access deals, seasonal multipliers, and referral bonuses.</p>
              </div>
            </div>
          </div>

          {/* How You Earn */}
          <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 mb-8">
            <h2 className="text-2xl font-bold mb-6">How You Earn</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4">Action</th>
                    <th className="text-right py-3 px-4">Points Earned</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-700/50">
                    <td className="py-3 px-4">Book a service through Car Smart Club or partner sites</td>
                    <td className="text-right py-3 px-4 font-semibold">1 point per $1 spent</td>
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="py-3 px-4">Purchase car-care products or accessories</td>
                    <td className="text-right py-3 px-4 font-semibold">Bonus points (promotional multiplier)</td>
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="py-3 px-4">Refer a friend who becomes a paid member</td>
                    <td className="text-right py-3 px-4 font-semibold text-green-400">+200 points</td>
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="py-3 px-4">Write a verified post-purchase review</td>
                    <td className="text-right py-3 px-4 font-semibold text-green-400">+25 points</td>
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="py-3 px-4">Welcome bonus (just for joining)</td>
                    <td className="text-right py-3 px-4 font-semibold text-green-400">+250 points</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Seasonal or partner promotions</td>
                    <td className="text-right py-3 px-4 font-semibold">1.25× – 1.5× base points</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Tip: Upgrade to Premium membership and receive 1.25 points per $1 (effectively ~2.5% value).
            </p>
          </div>

          {/* How It Works */}
          <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 mb-8">
            <h2 className="text-2xl font-bold mb-6">How It Works</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-cyan-500 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-semibold mb-1">Join Car Smart Club</h3>
                  <p className="text-gray-300 text-sm">Create your free member profile in minutes.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-cyan-500 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-semibold mb-1">Shop or Book Smart</h3>
                  <p className="text-gray-300 text-sm">Use Car Smart Club or one of our partner microsites (Tire-Rx, Brakes-Rx, Windshield-Rx) to make eligible purchases.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-cyan-500 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-semibold mb-1">Watch Your Points Grow</h3>
                  <p className="text-gray-300 text-sm">Once your invoice is verified (upload or shop confirmation), points post to your dashboard.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-cyan-500 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h3 className="font-semibold mb-1">Redeem for Rewards</h3>
                  <p className="text-gray-300 text-sm">Use your points for savings or upgrades (see the Redeem page). Premium members benefit from higher earning and bonus events.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Points History */}
          {pointsHistory.length > 0 && (
            <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 mb-8">
              <h2 className="text-2xl font-bold mb-6">Recent Points Activity</h2>
              <div className="space-y-3">
                {pointsHistory.slice(0, 10).map((point) => (
                  <div key={point._id} className="flex justify-between items-center p-3 bg-slate-700/60 rounded-lg">
                    <div>
                      <p className="font-medium">{point.description || 'Points earned'}</p>
                      <p className="text-sm text-gray-400">{new Date(point.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className={`font-bold ${point.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {point.amount > 0 ? '+' : ''}{point.amount} pts
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          {!user && (
            <div className="text-center bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Start Earning Points</h2>
              <p className="text-blue-100 mb-6">Sign up now and get 250 bonus Car Smart Points to kick-start your savings journey.</p>
              <Link href="/join" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all">
                Join Free & Get 250 Points
              </Link>
            </div>
          )}
          </main>
          <Footer />
          </>
        )}
      </div>
    </>
  )
}





