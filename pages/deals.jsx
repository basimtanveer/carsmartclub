import { useState, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Loader from '../components/Loader'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Deals({ user, login, logout }) {
  const [deals, setDeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('')

  useEffect(() => {
    fetchDeals()
  }, [category])

  const fetchDeals = async () => {
    try {
      const url = new URL(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api'}/deals`)
      if (category) {
        url.searchParams.append('category', category)
      }
      if (user?.isMember) {
        url.searchParams.append('memberExclusive', 'true')
      }

      const res = await fetch(url)
      const data = await res.json()
      setDeals(data)
    } catch (error) {
      console.error('Error fetching deals:', error)
    } finally {
      setLoading(false)
    }
  }

  const openCarSmartPeople = (deal) => {
    const baseUrl = 'https://www.carsmartpeople.com'
    const filters = {
      deal: deal.title,
      provider: deal.provider?.name || '',
      type: 'deal',
    }
    const queryParams = new URLSearchParams(filters).toString()
    window.open(`${baseUrl}?${queryParams}`, '_blank')
  }

  return (
    <>
      <Head>
        <title>Smart Deals - Car Smart Club</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
        {/* Header */}
        <Header user={user} logout={logout} />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">💡 Smart Deals</h1>
            <p className="text-gray-300 text-lg">Exclusive offers from verified providers in your area</p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={() => setCategory('')}
              className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                category === '' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-slate-700/60 hover:bg-slate-700'
              }`}
            >
              All
            </button>
            {['Maintenance', 'Tires', 'Detailing', 'Diagnostics', 'Repair'].map((cat) => (
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

          {loading ? (
            <Loader size="lg" />
          ) : deals.length === 0 ? (
            <div className="text-center py-12 bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-slate-700/50">
              <p className="text-gray-400 text-lg">No deals available at the moment. Check back soon!</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {deals.map((deal) => (
                <div key={deal._id} className="bg-gradient-to-br from-slate-800/60 to-slate-700/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-600/50 hover:border-cyan-500/50 transition-all">
                  {deal.isMemberExclusive && (
                    <div className="mb-3">
                      <span className="bg-slate-700 text-white px-2 py-1 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap inline-block">
                        CLUB MEMBER EXCLUSIVE
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-2">{deal.title}</h3>
                      <p className="text-cyan-400 font-semibold">{deal.provider?.name || 'Provider'}</p>
                      {deal.provider?.address && (
                        <p className="text-sm text-gray-400">{deal.provider.address.city}, {deal.provider.address.state}</p>
                      )}
                    </div>
                    <div className="text-right ml-2">
                      <span className="text-sm text-gray-400 line-through">${deal.originalPrice}</span>
                      <p className="text-green-400 font-bold text-xl">${deal.discountPrice}</p>
                      {deal.discountPercent > 0 && (
                        <p className="text-xs text-green-400">{deal.discountPercent}% OFF</p>
                      )}
                    </div>
                  </div>
                  {deal.description && (
                    <p className="text-sm text-gray-300 mb-4">{deal.description}</p>
                  )}
                  <div className="space-y-2">
                    <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 py-2 rounded-xl font-semibold transition-all">
                      Claim Deal
                    </button>
                    <button
                      onClick={() => openCarSmartPeople(deal)}
                      className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-xl font-semibold transition-all"
                    >
                      View Provider
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  )
}

