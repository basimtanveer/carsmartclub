import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Loader from '../components/Loader'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Plans({ user, login, logout }) {
  const router = useRouter()
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [upgrading, setUpgrading] = useState(null)

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api'}/plans`)
      if (res.ok) {
        const data = await res.json()
        setPlans(data)
      }
    } catch (error) {
      console.error('Error fetching plans:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpgrade = async (planName) => {
    if (!user) {
      router.push('/signin')
      return
    }

    setUpgrading(planName)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api'}/plans/upgrade`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ planName }),
      })

      if (res.ok) {
        alert(`Successfully upgraded to ${planName} plan!`)
        router.push('/account')
      } else {
        const error = await res.json()
        alert(error.message || 'Failed to upgrade plan')
      }
    } catch (error) {
      alert('Error upgrading plan. Please try again.')
    } finally {
      setUpgrading(null)
    }
  }

  const planFeatures = {
    'Free': [
      'Basic dashboard',
      '1 offer/month',
      '250 welcome points',
      'Access to evaluation tool',
    ],
    'Smart': [
      'Unlimited deals',
      'Appointment booking',
      '1 free inspection/year',
      'Priority customer support',
      '1.1x points multiplier',
    ],
    'Premium': [
      'Everything in Smart',
      'Priority booking',
      'Roadside assistance',
      'Concierge service',
      '1.25x points multiplier',
      'Birthday rewards',
    ],
    'Family': [
      'Everything in Premium',
      'Covers up to 3 cars',
      'Loyalty points for each service',
      'Family account management',
      '1.3x points multiplier',
    ],
  }

  return (
    <>
      <Head>
        <title>Plans & Pricing - Car Smart Club</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
        {/* Header */}
        <Header user={user} logout={logout} />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 mt-8 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Join Car Smart Club for Free</h1>
            <p className="text-gray-300 text-lg">Choose the plan that&apos;s right for you</p>
          </div>

          {loading ? (
            <Loader size="lg" />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {['Free', 'Smart', 'Premium', 'Family'].map((planName) => {
                const plan = plans.find(p => p.name === planName) || { name: planName, price: planName === 'Free' ? 0 : planName === 'Smart' ? 7.99 : planName === 'Premium' ? 14.99 : 19.99 }
                const features = planFeatures[planName] || []
                const isCurrentPlan = user && user.plan === planName
                const planHierarchy = { 'Free': 0, 'Smart': 1, 'Premium': 2, 'Family': 3 }
                const canUpgrade = user && planHierarchy[user.plan] < planHierarchy[planName]

                return (
                  <div
                    key={planName}
                    className={`bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border ${
                      isCurrentPlan ? 'border-cyan-500' : 'border-slate-700/50'
                    } hover:border-cyan-500/50 transition-all`}
                  >
                    {isCurrentPlan && (
                      <div className="bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                        CURRENT PLAN
                      </div>
                    )}
                    <h2 className="text-2xl font-bold mb-2">{planName}</h2>
                    <div className="mb-4">
                      <span className="text-4xl font-bold">${plan.price}</span>
                      {plan.price > 0 && <span className="text-gray-400">/month</span>}
                    </div>
                    <ul className="space-y-2 mb-6">
                      {features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-green-400 mr-2">✓</span>
                          <span className="text-sm text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {!user ? (
                      <Link
                        href="/join"
                        className="block w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 py-3 rounded-xl font-semibold text-center transition-all"
                      >
                        {planName === 'Free' ? 'Join Free' : 'Get Started'}
                      </Link>
                    ) : isCurrentPlan ? (
                      <button
                        disabled
                        className="w-full bg-slate-700 text-gray-500 py-3 rounded-xl font-semibold cursor-not-allowed"
                      >
                        Current Plan
                      </button>
                    ) : canUpgrade ? (
                      <button
                        onClick={() => handleUpgrade(planName)}
                        disabled={upgrading === planName}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 py-3 rounded-xl font-semibold transition-all disabled:opacity-50"
                      >
                        {upgrading === planName ? 'Upgrading...' : 'Upgrade Now'}
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full bg-slate-700 text-gray-500 py-3 rounded-xl font-semibold cursor-not-allowed"
                      >
                        Downgrade Not Available
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* Loyalty Tiers */}
          <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 mb-8">
            <h2 className="text-2xl font-bold mb-6">Loyalty Tiers</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Silver', criteria: 'Default', benefits: ['Earn 1 pt per $ spent', 'Standard support'] },
                { name: 'Gold', criteria: '$500 annual spend', benefits: ['+10% faster point earning', '1 free diagnostic/year', 'Priority support'] },
                { name: 'Platinum', criteria: '$1000 annual spend', benefits: ['Priority booking', 'Concierge service', 'Birthday reward', 'Exclusive deals'] },
              ].map((tier) => (
                <div key={tier.name} className="bg-slate-700/60 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                  <p className="text-sm text-gray-400 mb-4">{tier.criteria}</p>
                  <ul className="space-y-2">
                    {tier.benefits.map((benefit, idx) => (
                      <li key={idx} className="text-sm text-gray-300">• {benefit}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          {!user && (
            <div className="text-center bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Join Now & Get 250 Bonus Points</h2>
              <p className="text-blue-100 mb-6">This adds status and progression, giving members something to strive for — without relying on endless discounts.</p>
              <Link href="/join" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all">
                Create Free Account
              </Link>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  )
}

