import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Loader from '../../components/Loader'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function BookProvider({ user, login, logout }) {
  const router = useRouter()
  const { id } = router.query
  const [provider, setProvider] = useState(null)
  const [loading, setLoading] = useState(true)
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    service: '',
    notes: '',
  })

  useEffect(() => {
    if (id) {
      fetchProvider()
    }
  }, [id])

  const fetchProvider = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api'}/providers/${id}`)
      const data = await res.json()
      setProvider(data)
    } catch (error) {
      console.error('Error fetching provider:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      router.push('/signin')
      return
    }
    // Handle booking submission
    alert('Booking request submitted! The provider will contact you soon.')
  }

  if (loading) {
    return <Loader fullScreen={true} size="xl" />
  }

  if (!provider) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="text-white text-xl">Provider not found</div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Book {provider.name} - Car Smart Club</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
        {/* Header */}
        <header className="bg-white backdrop-blur-sm shadow-xl">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center">
                <img src={cscLogo.src} alt="Car Smart Club Logo" className="h-10 w-auto object-contain" />
              </Link>
              <div className="flex items-center space-x-4">
                {user ? (
                  <>
                    <Link href="/account" className="text-gray-700 hover:text-blue-600">{user.name}</Link>
                    <button onClick={logout} className="px-6 py-2 rounded-full font-semibold bg-gradient-to-r from-red-500 to-pink-500 text-white">
                      Logout
                    </button>
                  </>
                ) : (
                  <Link href="/signin" className="px-6 py-2 rounded-full font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Book Appointment</h1>
            <p className="text-gray-300 text-lg">Schedule a service with {provider.name}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Provider Info */}
            <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50">
              <h2 className="text-2xl font-bold mb-6">{provider.name}</h2>
              <div className="space-y-4">
                <div>
                  <span className="text-yellow-400 text-xl">★</span>
                  <span className="ml-2 text-lg font-semibold">{provider.rating}</span>
                  <span className="text-gray-400 ml-2">({provider.reviewCount} reviews)</span>
                </div>
                {provider.address && (
                  <div>
                    <p className="text-gray-300">
                      {provider.address.street}<br />
                      {provider.address.city}, {provider.address.state} {provider.address.zipCode}
                    </p>
                  </div>
                )}
                {provider.phone && (
                  <div>
                    <p className="text-gray-300">Phone: {provider.phone}</p>
                  </div>
                )}
                {provider.services && provider.services.length > 0 && (
                  <div>
                    <p className="font-semibold mb-2">Services:</p>
                    <div className="flex flex-wrap gap-2">
                      {provider.services.map((service, idx) => (
                        <span key={idx} className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {provider.description && (
                  <div>
                    <p className="text-gray-300">{provider.description}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Booking Form */}
            <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50">
              <h2 className="text-2xl font-bold mb-6">Booking Details</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Service</label>
                  <select
                    value={bookingData.service}
                    onChange={(e) => setBookingData({ ...bookingData, service: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-700/60 border border-slate-600 rounded-lg focus:border-cyan-500 focus:outline-none"
                    required
                  >
                    <option value="">Select a service</option>
                    {provider.services?.map((service, idx) => (
                      <option key={idx} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Date</label>
                  <input
                    type="date"
                    value={bookingData.date}
                    onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-700/60 border border-slate-600 rounded-lg focus:border-cyan-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Time</label>
                  <input
                    type="time"
                    value={bookingData.time}
                    onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-700/60 border border-slate-600 rounded-lg focus:border-cyan-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Additional Notes</label>
                  <textarea
                    value={bookingData.notes}
                    onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-700/60 border border-slate-600 rounded-lg focus:border-cyan-500 focus:outline-none"
                    rows="4"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 py-3 rounded-xl font-semibold transition-all"
                >
                  Book Appointment
                </button>
              </form>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}


