import { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import cscLogo from '../public/assets/csc.jpg'

export default function ProviderNetwork({ user, login, logout }) {
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    services: [],
    website: '',
  })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    
    // In production, this would submit to backend
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    alert('Thank you for your interest! We will contact you soon.')
    setSubmitting(false)
  }

  return (
    <>
      <Head>
        <title>Provider Network - Car Smart Club</title>
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
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Grow Your Auto Business with Car Smart Club</h1>
            <p className="text-gray-300 text-lg">
              Join our verified network of mechanics, detailers, and dealers to get direct access to ready-to-buy local customers.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              { icon: '✅', title: 'Verified Provider Badge', desc: 'Build trust with customers' },
              { icon: '⭐', title: 'Featured Listings', desc: 'Get priority placement in search' },
              { icon: '📞', title: 'Priority Leads', desc: 'Direct access to ready-to-buy customers' },
              { icon: '📢', title: 'Marketing Support', desc: 'Promote your business through our platform' },
              { icon: '💰', title: 'Increased Revenue', desc: 'More bookings and customers' },
              { icon: '📊', title: 'Analytics Dashboard', desc: 'Track your performance and ROI' },
            ].map((benefit, idx) => (
              <div key={idx} className="bg-slate-800/60 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
                <div className="text-3xl mb-3">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-300 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>

          {/* Application Form */}
          <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50">
            <h2 className="text-2xl font-bold mb-6">Apply as a Provider</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Business Name *</label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-700/60 border border-slate-600 rounded-lg focus:border-cyan-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-700/60 border border-slate-600 rounded-lg focus:border-cyan-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-700/60 border border-slate-600 rounded-lg focus:border-cyan-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Website</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-700/60 border border-slate-600 rounded-lg focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Address *</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-700/60 border border-slate-600 rounded-lg focus:border-cyan-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">City *</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-700/60 border border-slate-600 rounded-lg focus:border-cyan-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">State *</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-700/60 border border-slate-600 rounded-lg focus:border-cyan-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">ZIP Code *</label>
                  <input
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-700/60 border border-slate-600 rounded-lg focus:border-cyan-500 focus:outline-none"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Services Offered *</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['Oil Change', 'Brake Service', 'Tire Service', 'Engine Repair', 'Detailing', 'Car Wash', 'Diagnostics', 'Other'].map((service) => (
                    <label key={service} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.services.includes(service)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ ...formData, services: [...formData.services, service] })
                          } else {
                            setFormData({ ...formData, services: formData.services.filter(s => s !== service) })
                          }
                        }}
                        className="w-4 h-4 text-cyan-500 rounded focus:ring-cyan-500"
                      />
                      <span className="text-sm">{service}</span>
                    </label>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 py-3 rounded-xl font-semibold transition-all disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </div>
        </main>
      </div>
    </>
  )
}

