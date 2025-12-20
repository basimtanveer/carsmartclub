import { useState, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { API_BASE_URL } from '../lib/api'
import Loader from '../components/Loader'
import cscLogo from '../public/assets/csc.jpg'

// Deals Preview Component
function DealsPreviewSection({ user, openCarSmartPeople }) {
  const [deals, setDeals] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDeals()
  }, [])

  const fetchDeals = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/deals?limit=3`)
      if (res.ok) {
        const data = await res.json()
        setDeals(data.slice(0, 3))
      }
    } catch (error) {
      console.error('Error fetching deals:', error)
      // Use default deals if API fails
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loader size="md" />
  }

  const defaultDeals = [
    { title: "20% off Oil Change", provider: "Joe's Auto", original: "$89", discount: "$71" },
    { title: "Free Car Wash with Brake Service", provider: "Metro Tires", original: "$150", discount: "$120" },
    { title: "$30 Discount on Engine Diagnostics", provider: "SpeedPro Garage", original: "$120", discount: "$90" }
  ]

  const displayDeals = deals.length > 0 ? deals : defaultDeals

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {displayDeals.map((deal, index) => (
          <div key={deal._id || index} className="bg-gradient-to-br from-slate-800/60 to-slate-700/60 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-600/50 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 shadow-xl">
                  {user?.isMember && (
                    <div className="mb-3">
                      <span className="bg-slate-700 text-white px-2 py-1 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap inline-block">
                        CLUB MEMBER DISCOUNT
                      </span>
                    </div>
                  )}
            <div className="flex justify-between items-start mb-4 sm:mb-6">
              <div className="flex-1">
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-2">{deal.title || deal.name}</h3>
                <p className="text-cyan-400 font-semibold text-sm sm:text-base md:text-lg">{deal.provider?.name || deal.provider}</p>
              </div>
              <div className="text-right ml-2">
                <span className="text-xs sm:text-sm text-gray-400 line-through">{deal.originalPrice || deal.original}</span>
                <p className="text-green-400 font-bold text-lg sm:text-xl md:text-2xl">${deal.discountPrice || deal.discount}</p>
              </div>
            </div>
            <div className="space-y-2">
              <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 shadow-lg">
                Claim Deal
              </button>
              <button 
                onClick={() => openCarSmartPeople({ deal: deal.title || deal.name, provider: deal.provider?.name || deal.provider, type: 'deal' })}
                className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 shadow-lg"
              >
                See Local Shops Offering This Deal
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8 sm:mt-12">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          {['Maintenance', 'Tires', 'Detailing', 'Diagnostics'].map((filter) => (
            <button key={filter} className="bg-slate-700/60 hover:bg-blue-500/20 border border-slate-600 hover:border-blue-500 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base md:text-lg font-semibold transition-all duration-300 shadow-lg">
              {filter}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

export default function Home({ user, login, logout }) {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showSmartie, setShowSmartie] = useState(false)
  const [vehicles, setVehicles] = useState([])
  const [providers, setProviders] = useState([])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Handle hash navigation when page loads
    if (router.asPath.includes('#')) {
      const hash = router.asPath.split('#')[1]
      setTimeout(() => {
        scrollToSection(hash)
      }, 500)
    }
  }, [router.asPath])

  useEffect(() => {
    if (user) {
      fetchVehicles()
    }
    fetchProviders()
  }, [user])

  const fetchProviders = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/providers?limit=3`)
      if (res.ok) {
        const data = await res.json()
        setProviders(data.slice(0, 3))
      }
    } catch (error) {
      console.error('Error fetching providers:', error)
      // Will use default providers if API fails
    }
  }

  const fetchVehicles = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${API_BASE_URL}/vehicles`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      if (res.ok) {
        const data = await res.json()
        setVehicles(data.slice(0, 2)) // Show max 2 for preview
      }
    } catch (error) {
      console.error('Error fetching vehicles:', error)
    }
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
    } else {
      // If element not found, try after a short delay (for page navigation)
      setTimeout(() => {
        const retryElement = document.getElementById(sectionId)
        if (retryElement) {
          retryElement.scrollIntoView({ behavior: 'smooth' })
          setActiveSection(sectionId)
        }
      }, 300)
    }
  }

  const openCarSmartPeople = (filters = {}) => {
    const baseUrl = 'https://www.carsmartpeople.com'
    const enhancedFilters = {
      ...filters,
      member: user?.isMember ? 'true' : 'false',
      club: 'car_smart_club'
    }
    const queryParams = new URLSearchParams(enhancedFilters).toString()
    const url = queryParams ? `${baseUrl}?${queryParams}` : baseUrl
    window.open(url, '_blank')
  }

  return (
    <>
      <Head>
        <title>Car Smart Club - Get your Prescription for Better Car Care</title>
        <meta name="description" content="Manage your car's health, find trusted providers, and earn rewards every time you book care or make a purchase." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
        {/* Header / Navigation */}
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white backdrop-blur-md shadow-xl' : 'bg-white backdrop-blur-sm'
        }`}>
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14 sm:h-16">
              <div className="flex items-center space-x-4 sm:space-x-8">
                <Link href="/" className="flex items-center">
                  <img 
                    src={cscLogo.src} 
                    alt="Car Smart Club Logo" 
                    className="h-6 sm:h-8 md:h-10 w-auto object-contain"
                  />
                </Link>
                <div className="hidden lg:flex space-x-8">
                  {['home', 'how-it-works', 'providers', 'garage', 'diagnostics', 'evaluations', 'offers', 'blog'].map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        if (item === 'providers') {
                          window.open('https://www.carsmartpeople.com', '_blank');
                        } else if (item === 'garage') {
                          router.push('/garage')
                        } else if (item === 'diagnostics') {
                          router.push('/diagnostics')
                        } else if (item === 'evaluations') {
                          router.push('/evaluation')
                        } else if (item === 'offers') {
                          router.push('/deals')
                        } else if (item === 'blog') {
                          scrollToSection('blog')
                        } else {
                          scrollToSection(item);
                        }
                      }}
                      className={`capitalize transition-colors duration-200 hover:text-blue-600 ${
                        activeSection === item ? 'text-blue-600' : 'text-gray-700'
                      }`}
                    >
                      {item.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                {user ? (
                  <>
                    <Link 
                      href="/account" 
                      className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 transform hover:scale-105 hover:shadow-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white hidden sm:flex"
                    >
                      <UserCircleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>{user.name}</span>
                      {user.availablePoints > 0 && <span className="text-xs">({user.availablePoints} pts)</span>}
                    </Link>
                    <button 
                      onClick={logout}
                      className="px-2 sm:px-3 md:px-6 py-1 sm:py-1.5 md:py-2 rounded-full font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 transform hover:scale-105 hover:shadow-lg bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/signin" className="text-xs sm:text-sm md:text-base transition-colors hidden sm:block text-gray-700 hover:text-blue-600">
                      Sign In
                    </Link>
                    <Link href="/join" className="px-2 sm:px-3 md:px-6 py-1 sm:py-1.5 md:py-2 rounded-full font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 transform hover:scale-105 hover:shadow-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                      Join Free
                    </Link>
                  </>
                )}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Mobile Menu */}
            <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
              isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="py-4 space-y-2 border-t border-gray-200">
                {['home', 'how-it-works', 'providers', 'garage', 'diagnostics', 'evaluations', 'offers', 'blog'].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      if (item === 'providers') {
                        window.open('https://www.carsmartpeople.com', '_blank');
                      } else if (item === 'garage') {
                        router.push('/garage')
                      } else if (item === 'diagnostics') {
                        router.push('/diagnostics')
                      } else if (item === 'evaluations') {
                        router.push('/evaluation')
                      } else if (item === 'offers') {
                        router.push('/deals')
                      } else if (item === 'blog') {
                        scrollToSection('blog')
                      } else {
                        scrollToSection(item);
                      }
                    }}
                    className={`block w-full text-left px-4 py-2 rounded-md capitalize transition-colors duration-200 hover:text-blue-600 hover:bg-gray-100 ${
                      activeSection === item ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                    }`}
                  >
                    {item.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section id="home" className="pt-16 pb-8 sm:pt-20 md:pt-24 sm:pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-screen flex items-center">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-500/20"></div>
          <div className="max-w-7xl mx-auto relative z-10 w-full">
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
              <div className="space-y-3 sm:space-y-4 md:space-y-6 text-center lg:text-left">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  Your <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                    Prescription
                  </span> for Better Car Care
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Manage your car&apos;s health, find trusted providers, and earn rewards every time you book care or make a purchase.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 pt-2 sm:pt-4 justify-center lg:justify-start">
                  <Link href="/diagnostics" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-center">
                    Start Car Diagnosis
                  </Link>
                  <button 
                    onClick={() => openCarSmartPeople({ service: 'general', location: 'nearby' })}
                    className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 transform hover:scale-105"
                  >
                    Find Local Providers
                  </button>
                  <Link href="/deals" className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 transform hover:scale-105 text-center">
                    Explore Local Deals
                  </Link>
                </div>
                <p className="text-xs sm:text-sm text-gray-400 pt-2">
                  Join thousands of smart drivers saving money and making better car decisions with Car Smart Club.
                </p>
              </div>
              <div className="relative mt-6 sm:mt-8 lg:mt-0">
                <div className="bg-slate-800/60 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 border border-slate-700/50 shadow-2xl">
                  <div className="space-y-3 sm:space-y-4 md:space-y-6">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full animate-pulse delay-100"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse delay-200"></div>
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 md:mb-4">Dashboard Preview</h3>
                    <div className="space-y-2 sm:space-y-3">
                      {vehicles.length > 0 ? (
                        vehicles.map((vehicle, idx) => (
                          <div key={idx} className="bg-slate-700/60 rounded-lg p-2 sm:p-3 border border-slate-600/50">
                            <div className="flex justify-between items-center">
                              <span className="text-xs sm:text-sm font-medium">{vehicle.make} {vehicle.model} {vehicle.year}</span>
                              <span className={`text-xs font-semibold ${
                                vehicle.status === 'OK' ? 'text-green-400' :
                                vehicle.status === 'Attention' ? 'text-yellow-400' :
                                'text-red-400'
                              }`}>
                                {vehicle.status === 'OK' ? '✅ Healthy' :
                                 vehicle.status === 'Attention' ? '⚠️ Needs Service' :
                                 '🔴 Critical'}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <>
                          <div className="bg-slate-700/60 rounded-lg p-2 sm:p-3 border border-slate-600/50">
                            <div className="flex justify-between items-center">
                              <span className="text-xs sm:text-sm font-medium">Honda Civic 2020</span>
                              <span className="text-green-400 text-xs font-semibold">✅ Healthy</span>
                            </div>
                          </div>
                          <div className="bg-slate-700/60 rounded-lg p-2 sm:p-3 border border-slate-600/50">
                            <div className="flex justify-between items-center">
                              <span className="text-xs sm:text-sm font-medium">Toyota Camry 2019</span>
                              <span className="text-yellow-400 text-xs font-semibold">⚠️ Needs Service</span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-400 mt-4">
                      Track all your cars in one simple dashboard. Know when to service, how much it&apos;s worth, and where to go next.
                    </p>
                    {!user && (
                      <Link href="/join" className="block w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 py-2 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 shadow-lg text-center mt-4">
                        🟢 Join Free & Earn 250 Points
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Car Smart Evaluation Section */}
        <section id="evaluation" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12 md:mb-20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6">
                🧠 Not Sure What to Do With Your Car?
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto">
                Our Car Smart Evaluation helps you decide whether to Keep, Sell, or Trade — and gives you a smart summary in under 3 minutes.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12 md:mb-20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6">How It Works</h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto">
                Car Smart Club connects drivers, their cars, and trusted auto providers in one smart ecosystem
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
              <div className="text-center p-4 sm:p-6 md:p-8 bg-slate-800/40 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 shadow-xl">
                <div className="text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6">1️⃣</div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">Add Your Car</h3>
                <p className="text-gray-400 text-sm sm:text-base md:text-lg">via VIN or make/model</p>
              </div>
              <div className="text-center p-4 sm:p-6 md:p-8 bg-slate-800/40 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 shadow-xl">
                <div className="text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6">2️⃣</div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">Run Diagnostics or Evaluation</h3>
                <p className="text-gray-400 text-sm sm:text-base md:text-lg">get instant insights</p>
              </div>
              <div className="text-center p-4 sm:p-6 md:p-8 bg-slate-800/40 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 shadow-xl">
                <div className="text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6">3️⃣</div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">Book with Providers</h3>
                <p className="text-gray-400 text-sm sm:text-base md:text-lg">access verified shops & discounts</p>
              </div>
              <div className="text-center p-4 sm:p-6 md:p-8 bg-slate-800/40 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 shadow-xl">
                <div className="text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6">4️⃣</div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">Earn & Redeem Points</h3>
                <p className="text-gray-400 text-sm sm:text-base md:text-lg">for car care, upgrades, or cash credit</p>
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
              <div className="bg-slate-800/60 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-700/50">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">Members:</h3>
                <p className="text-gray-300 text-sm sm:text-base md:text-lg">Enjoy automatic perks & points.</p>
              </div>
              <div className="bg-slate-800/60 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-700/50">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">Providers:</h3>
                <p className="text-gray-300 text-sm sm:text-base md:text-lg">Gain more clients via featured listings & Club promotions.</p>
              </div>
            </div>
            
            <div className="text-center">
              <Link 
                href="/join"
                className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                Join Now & Get 250 Bonus Points
              </Link>
            </div>
          </div>
        </section>

        {/* Smart Garage Preview */}
        <section id="garage" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12 md:mb-20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6">Your Smart Garage</h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-300 max-w-3xl mx-auto">Manage your vehicles with intelligent insights and real-time monitoring</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {vehicles.length > 0 ? (
                vehicles.map((vehicle, index) => (
                  <div key={vehicle._id} className="bg-slate-800/60 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 shadow-xl">
                    <div className="flex justify-between items-start mb-3 sm:mb-4 md:mb-6">
                      <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold">{vehicle.make} {vehicle.model} {vehicle.year}</h3>
                      <span className={`px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold ${
                        vehicle.status === 'OK' ? 'bg-green-500/20 text-green-400' :
                        vehicle.status === 'Attention' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {vehicle.status}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-3 sm:mb-4 md:mb-6 text-xs sm:text-sm md:text-lg">Mileage: {vehicle.mileage?.toLocaleString() || 'N/A'}</p>
                    <div className="space-y-2">
                      <Link href="/garage" className="block w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 py-2 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 shadow-lg text-center">
                        Manage Vehicle
                      </Link>
                      {vehicle.status !== 'OK' && (
                        <button 
                          onClick={() => openCarSmartPeople({ service: vehicle.status === 'Attention' ? 'maintenance' : 'repair', urgency: 'high' })}
                          className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 shadow-lg"
                        >
                          Get Help for This Issue
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                [
                  { name: 'Honda Civic 2020', status: 'OK', mileage: '45,230', color: 'green' },
                  { name: 'Toyota Camry 2019', status: 'Attention', mileage: '67,890', color: 'yellow' },
                  { name: 'Ford Mustang 2021', status: 'Critical', mileage: '23,450', color: 'red' }
                ].map((car, index) => (
                  <div key={index} className="bg-slate-800/60 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 shadow-xl">
                    <div className="flex justify-between items-start mb-3 sm:mb-4 md:mb-6">
                      <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold">{car.name}</h3>
                      <span className={`px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold ${
                        car.color === 'green' ? 'bg-green-500/20 text-green-400' :
                        car.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {car.status}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-3 sm:mb-4 md:mb-6 text-xs sm:text-sm md:text-lg">Mileage: {car.mileage}</p>
                    <div className="space-y-2">
                      <Link href="/garage" className="block w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 py-2 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 shadow-lg text-center">
                        Manage Vehicle
                      </Link>
                      {car.status !== 'OK' && (
                        <button 
                          onClick={() => openCarSmartPeople({ service: car.status === 'Attention' ? 'maintenance' : 'repair', urgency: 'high' })}
                          className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 shadow-lg"
                        >
                          Get Help for This Issue
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="text-center mt-6 sm:mt-8 md:mt-12">
              <Link href="/garage" className="bg-slate-700 hover:bg-slate-600 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-xl font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 shadow-lg inline-block">
                Add Vehicle
              </Link>
            </div>
          </div>
        </section>

        {/* Diagnostic & Evaluation Tools */}
        <section id="diagnostics" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12 md:mb-20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6">Diagnostic & Evaluation Tools</h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-300 max-w-3xl mx-auto">Get instant insights about your vehicle with our advanced diagnostic tools</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
              {/* Diagnostic Check Widget */}
              <div className="bg-slate-800/60 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 border border-slate-700/50 shadow-xl">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 flex items-center">
                  🔧 Diagnostic Check
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  <input
                    type="text"
                    placeholder="Enter VIN or click 'Run Diagnostics'"
                    className="w-full px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 bg-slate-700/60 border border-slate-600 rounded-lg sm:rounded-xl focus:border-cyan-500 focus:outline-none transition-all duration-300 text-sm sm:text-base md:text-lg"
                  />
                  <Link href="/diagnostics" className="block w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 py-2 sm:py-3 md:py-4 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 shadow-lg text-center">
                    Run Diagnostics
                  </Link>
                  <p className="text-gray-400 text-sm sm:text-base md:text-lg">
                    OBD-II device integration coming soon for real-time monitoring
                  </p>
                  <button 
                    onClick={() => openCarSmartPeople({ service: 'diagnostics', type: 'repair' })}
                    className="w-full bg-gray-400 hover:bg-gray-500 text-gray-900 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 shadow-lg mt-2 sm:mt-4"
                  >
                    Need Help? Connect with Local Repair Shops
                  </button>
                </div>
              </div>

              {/* Car Smart Evaluation Widget */}
              <div className="bg-slate-800/60 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 border border-slate-700/50 shadow-xl">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 flex items-center">
                  📊 Car Smart Evaluation
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base md:text-lg">What would you like to do with your car?</p>
                  <div className="grid grid-cols-3 gap-2 sm:gap-4">
                    {['Keep', 'Sell', 'Trade'].map((option) => (
                      <Link
                        key={option}
                        href={`/evaluation?purpose=${option}`}
                        className="bg-slate-700/60 hover:bg-cyan-500/20 border border-slate-600 hover:border-cyan-500 py-2 sm:py-3 md:py-4 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 shadow-lg text-center"
                      >
                        {option}
                      </Link>
                    ))}
                  </div>
                  <p className="text-gray-400 text-sm sm:text-base md:text-lg">
                    Get instant summary report (PDF or email)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Providers */}
        <section id="providers" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Featured Providers</h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto">Top-rated car care professionals in your area</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {providers.length > 0 ? (
                providers.map((provider) => (
                  <div key={provider._id} className="bg-slate-800/60 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 shadow-xl">
                    {user?.isMember && (
                      <div className="mb-3">
                        <span className="bg-slate-700 text-white px-2 py-1 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap inline-block">
                          CLUB MEMBER DISCOUNT
                        </span>
                      </div>
                    )}
                    <div className="mb-4 sm:mb-6">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                        <h3 className="text-base sm:text-lg md:text-xl font-bold">{provider.name}</h3>
                      </div>
                      <div className="flex items-center">
                        <span className="text-yellow-400 text-sm sm:text-base md:text-lg">★</span>
                        <span className="ml-1 sm:ml-2 text-sm sm:text-base md:text-lg font-semibold">{provider.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-400 mb-2 sm:mb-3 text-sm sm:text-base md:text-lg">{provider.services?.join(', ') || 'Full Service Auto Repair'}</p>
                    {provider.address && (
                      <p className="text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base md:text-lg">{provider.address.city}</p>
                    )}
                    <div className="space-y-2">
                      <Link href={`/providers/book?id=${provider._id}`} className="block w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 shadow-lg text-center">
                        Book Now
                      </Link>
                      <button 
                        onClick={() => openCarSmartPeople({ provider: provider.name, service: provider.services?.join(', '), location: provider.address?.city })}
                        className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 shadow-lg"
                      >
                        View on Car Smart People
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                [
                  { name: "AutoCare Plus", rating: 4.9, services: "Full Service Auto Repair", location: "Downtown" },
                  { name: "Metro Tires & Service", rating: 4.8, services: "Tires, Brakes, Alignment", location: "Midtown" },
                  { name: "Elite Detailing", rating: 4.9, services: "Premium Car Detailing", location: "Uptown" }
                ].map((provider, index) => (
                  <div key={index} className="bg-slate-800/60 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 shadow-xl">
                    {user?.isMember && (
                      <div className="mb-3">
                        <span className="bg-slate-700 text-white px-2 py-1 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap inline-block">
                          CLUB MEMBER DISCOUNT
                        </span>
                      </div>
                    )}
                    <div className="mb-4 sm:mb-6">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                        <h3 className="text-base sm:text-lg md:text-xl font-bold">{provider.name}</h3>
                      </div>
                      <div className="flex items-center">
                        <span className="text-yellow-400 text-sm sm:text-base md:text-lg">★</span>
                        <span className="ml-1 sm:ml-2 text-sm sm:text-base md:text-lg font-semibold">{provider.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-400 mb-2 sm:mb-3 text-sm sm:text-base md:text-lg">{provider.services}</p>
                    <p className="text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base md:text-lg">{provider.location}</p>
                    <div className="space-y-2">
                      <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 shadow-lg">
                        Book Now
                      </button>
                      <button 
                        onClick={() => openCarSmartPeople({ provider: provider.name, service: provider.services, location: provider.location })}
                        className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 shadow-lg"
                      >
                        View on Car Smart People
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Why Join Car Smart Club */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Why Join Car Smart Club?</h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto">Exclusive benefits for members</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {[
                { icon: '✅', title: 'Verified Providers', desc: 'All providers are verified and rated' },
                { icon: '📞', title: 'Phone & Online Booking', desc: 'Easy booking through multiple channels' },
                { icon: '💲', title: 'Member Discounts', desc: 'Exclusive deals and savings' },
                { icon: '🚗', title: 'Free Garage Dashboard', desc: 'Manage all your vehicles in one place' }
              ].map((feature, index) => (
                <div key={index} className="text-center p-4 sm:p-6 md:p-8 bg-slate-800/40 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 shadow-xl">
                  <div className="text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6">{feature.icon}</div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">{feature.title}</h3>
                  <p className="text-gray-400 text-sm sm:text-base md:text-lg">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Smart Deals Section */}
        <section id="offers" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">💡 Smart Deals</h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto">Exclusive offers from verified providers in your area</p>
            </div>
            <DealsPreviewSection user={user} openCarSmartPeople={openCarSmartPeople} />
            <div className="text-center mt-8 sm:mt-12">
              <Link 
                href="/deals"
                className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                View More Deals
              </Link>
            </div>
          </div>
        </section>

        {/* Member Testimonials */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">What Our Members Say</h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto">Real stories from satisfied Car Smart Club members</p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {[
                {
                  quote: "Saved $200 on maintenance through Car Smart Club. The provider was excellent and the process was seamless!",
                  author: "Sarah Johnson",
                  location: "Austin, TX",
                  savings: "$200 saved"
                },
                {
                  quote: "The diagnostic tool helped me identify an issue before it became expensive. Love the transparency!",
                  author: "Mike Chen",
                  location: "Seattle, WA",
                  savings: "Prevented $500 repair"
                },
                {
                  quote: "Found the best detailing service in my area with amazing discounts. Car looks brand new!",
                  author: "Emily Rodriguez",
                  location: "Miami, FL",
                  savings: "40% off premium service"
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-slate-800/60 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 shadow-xl">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-sm sm:text-base md:text-xl">★</span>
                      ))}
                    </div>
                  </div>
                  <blockquote className="text-gray-300 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed">
                    &quot;{testimonial.quote}&quot;
                  </blockquote>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                    <div>
                      <p className="font-semibold text-white text-sm sm:text-base">{testimonial.author}</p>
                      <p className="text-gray-400 text-xs sm:text-sm">{testimonial.location}</p>
                    </div>
                    <div className="bg-green-500/20 text-green-400 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold self-start sm:self-auto">
                      {testimonial.savings}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8 sm:mt-12">
              <div className="bg-slate-800/40 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-700/50 max-w-4xl mx-auto">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">Join Thousands of Happy Members</h3>
                <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-4 sm:mb-6">
                  Over 10,000 car owners trust Car Smart Club for their vehicle care needs
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
                  <div>
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-400">4.9★</div>
                    <div className="text-xs sm:text-sm text-gray-400">Average Rating</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-400">10K+</div>
                    <div className="text-xs sm:text-sm text-gray-400">Active Members</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-400">500+</div>
                    <div className="text-xs sm:text-sm text-gray-400">Verified Providers</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-400">$2M+</div>
                    <div className="text-xs sm:text-sm text-gray-400">Member Savings</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12 md:mb-20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6">Car Care Tips & Insights</h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-300 max-w-3xl mx-auto">Expert advice to keep your vehicle running smoothly</p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {[
                {
                  title: "How to Fix Your Brakes: A Complete Guide",
                  excerpt: "Learn the warning signs of brake problems and when to seek professional help.",
                  category: "Brakes",
                  cta: "Find a local brake shop near you"
                },
                {
                  title: "Engine Maintenance: Keep Your Car Running Smooth",
                  excerpt: "Essential engine care tips to prevent costly repairs and extend your vehicle's life.",
                  category: "Engine",
                  cta: "Connect with engine specialists"
                },
                {
                  title: "Tire Care 101: Safety and Performance Tips",
                  excerpt: "Everything you need to know about tire maintenance, rotation, and replacement.",
                  category: "Tires",
                  cta: "Find tire service providers"
                }
              ].map((article, index) => (
                <div key={index} className="bg-slate-800/60 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 shadow-xl">
                  <div className="mb-3 sm:mb-4">
                    <span className="bg-cyan-500/20 text-cyan-400 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                      {article.category}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4">{article.title}</h3>
                  <p className="text-gray-400 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">{article.excerpt}</p>
                  <div className="space-y-2 sm:space-y-3">
                    <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 py-2 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 shadow-lg">
                      Read More
                    </button>
                    <button 
                      onClick={() => openCarSmartPeople({ service: article.category.toLowerCase(), type: 'specialist' })}
                      className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 shadow-lg"
                    >
                      {article.cta}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8 sm:mt-12">
              <button 
                onClick={() => openCarSmartPeople({ service: 'all', view: 'directory' })}
                className="bg-slate-700 hover:bg-slate-600 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 shadow-lg"
              >
                Browse All Service Providers
              </button>
            </div>
          </div>
        </section>

        {/* Professional Signup Section */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-800/40 to-slate-700/40">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-slate-800/60 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 border border-slate-700/50 shadow-2xl">
              <div className="mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                  For Automotive Industry Professionals
                </h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-4 sm:mb-6">
                  Mechanics, Auto Body Repair, Tires & Wheels, Detailing, and more...
                </p>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-400 max-w-2xl mx-auto">
                  Join our network of verified local car care providers and connect with customers who need your expertise.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center mb-6 sm:mb-8">
                <div className="flex flex-wrap justify-center gap-1 sm:gap-2 md:gap-4">
                  <span className="bg-blue-500/20 text-blue-400 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                    🛠️ Mechanics
                  </span>
                  <span className="bg-green-500/20 text-green-400 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                    🔧 Auto Body Repair
                  </span>
                  <span className="bg-yellow-500/20 text-yellow-400 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                    🛞 Tires & Wheels
                  </span>
                  <span className="bg-purple-500/20 text-purple-400 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                    ✨ Detailing
                  </span>
                  <span className="bg-red-500/20 text-red-400 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                    🔋 Auto Electric
                  </span>
                  <span className="bg-cyan-500/20 text-cyan-400 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                    🚗 General Service
                  </span>
                </div>
              </div>
              
              <div className="bg-slate-700/50 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Why Join Our Network?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-left">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <span className="text-green-400 text-sm sm:text-base">✓</span>
                    <span className="text-xs sm:text-sm text-gray-300">Verified Provider Badge</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <span className="text-green-400 text-sm sm:text-base">✓</span>
                    <span className="text-xs sm:text-sm text-gray-300">Direct Customer Leads</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <span className="text-green-400 text-sm sm:text-base">✓</span>
                    <span className="text-xs sm:text-sm text-gray-300">Online Booking System</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <span className="text-green-400 text-sm sm:text-base">✓</span>
                    <span className="text-xs sm:text-sm text-gray-300">Review Management</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <span className="text-green-400 text-sm sm:text-base">✓</span>
                    <span className="text-xs sm:text-sm text-gray-300">Marketing Support</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <span className="text-green-400 text-sm sm:text-base">✓</span>
                    <span className="text-xs sm:text-sm text-gray-300">Priority Listing</span>
                  </div>
                </div>
              </div>
              
              <Link href="/provider-network" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-4 sm:px-6 md:px-8 lg:px-12 py-2 sm:py-3 md:py-4 rounded-full font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl inline-block">
                Become a Verified Local Car Care Provider
              </Link>
              
              <p className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
                Join our network • Get verified • Start receiving leads
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">What Our Members Say</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
                <p className="text-gray-300 mb-4">&quot;I saved $200 on brakes — my membership paid for itself.&quot;</p>
                <p className="text-sm text-gray-400">— Sarah Johnson, Austin TX</p>
              </div>
              <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
                <p className="text-gray-300 mb-4">&quot;Got a fair cash offer for my car in minutes. Love it.&quot;</p>
                <p className="text-sm text-gray-400">— Mike Chen, Seattle WA</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900/50 backdrop-blur-md py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-700/50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="sm:col-span-2 lg:col-span-1">
                <div className="flex items-center mb-3 sm:mb-4">
                  <img 
                    src={cscLogo.src} 
                    alt="Car Smart Club Logo" 
                    className="h-8 sm:h-10 md:h-12 w-auto object-contain"
                  />
                </div>
                <p className="text-gray-400 text-sm sm:text-base">Your prescription for better car care.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h4>
                <ul className="space-y-1 sm:space-y-2 text-gray-400">
                  <li>
                    <Link href="/privacy-policy" className="hover:text-cyan-400 transition-colors text-sm sm:text-base">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/gdpr" className="hover:text-cyan-400 transition-colors text-sm sm:text-base">
                      GDPR
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="hover:text-cyan-400 transition-colors text-sm sm:text-base">
                      Terms and Conditions
                    </Link>
                  </li>
                  <li>
                    <Link href="/refund-policy" className="hover:text-cyan-400 transition-colors text-sm sm:text-base">
                      Refund Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/cookie-policy" className="hover:text-cyan-400 transition-colors text-sm sm:text-base">
                      Cookie Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/provider-guide" className="hover:text-cyan-400 transition-colors text-sm sm:text-base">
                      Provider Guide
                    </Link>
                  </li>
                  <li>
                    <Link href="/provider-agreement" className="hover:text-cyan-400 transition-colors text-sm sm:text-base">
                      Provider Agreement
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Services</h4>
                <ul className="space-y-1 sm:space-y-2 text-gray-400">
                  <li>
                    <Link href="/diagnostics" className="hover:text-cyan-400 transition-colors text-sm sm:text-base">Diagnostics</Link>
                  </li>
                  <li>
                    <Link href="/evaluation" className="hover:text-cyan-400 transition-colors text-sm sm:text-base">Assessments</Link>
                  </li>
                  <li>
                    <Link href="/garage" className="hover:text-cyan-400 transition-colors text-sm sm:text-base">Garage Management</Link>
                  </li>
                  <li>
                    <Link href="/deals" className="hover:text-cyan-400 transition-colors text-sm sm:text-base">Smart Deals</Link>
                  </li>
                  <li>
                    <Link href="/plans" className="hover:text-cyan-400 transition-colors text-sm sm:text-base">Plans & Pricing</Link>
                  </li>
                  <li>
                    <button 
                      onClick={() => openCarSmartPeople({ view: 'directory', source: 'footer' })} 
                      className="hover:text-cyan-400 transition-colors text-sm sm:text-base text-left"
                    >
                      Provider Search
                    </button>
                  </li>
                </ul>
                <div className="mt-3 sm:mt-4">
                  <button 
                    onClick={() => openCarSmartPeople({ view: 'directory', source: 'footer' })}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 shadow-lg"
                  >
                    Browse Car Smart People Directory
                  </button>
                </div>
              </div>
              <div className="sm:col-span-2 lg:col-span-1">
                <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Newsletter</h4>
                <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">Get the latest deals & car care tips.</p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                  <input
                    type="email"
                    placeholder="Enter email"
                    className="flex-1 px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg sm:rounded-l-lg sm:rounded-r-none focus:border-cyan-500 focus:outline-none text-sm sm:text-base"
                  />
                  <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-3 sm:px-4 py-2 rounded-lg sm:rounded-l-none sm:rounded-r-lg font-semibold text-sm sm:text-base transition-all duration-300">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
            <div className="border-t border-slate-700/50 mt-6 sm:mt-8 pt-6 sm:pt-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-6">
                <div>
                  <h4 className="font-semibold mb-3 text-sm sm:text-base text-white">Legal</h4>
                  <ul className="space-y-1 sm:space-y-2 text-gray-400">
                    <li>
                      <Link href="/legal" className="hover:text-cyan-400 transition-colors text-xs sm:text-sm">
                        Legal & Policy
                      </Link>
                    </li>
                    <li>
                      <Link href="/provider-guide" className="hover:text-cyan-400 transition-colors text-xs sm:text-sm">
                        Provider Guide
                      </Link>
                    </li>
                    <li>
                      <Link href="/provider-agreement" className="hover:text-cyan-400 transition-colors text-xs sm:text-sm">
                        Provider Agreement
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="text-center text-gray-400">
                <p className="text-xs sm:text-sm">© {new Date().getFullYear()} Car Smart Club. Owned by Vika Enterprises. Powered by Car Smart People.</p>
              </div>
            </div>
          </div>
        </footer>

        {/* Smartie Chatbot */}
        <div className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 transition-all duration-300 ${showSmartie ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="bg-slate-800 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-slate-700/50 shadow-2xl max-w-xs sm:max-w-sm">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-2 sm:mr-3 animate-pulse">
                  <span className="text-lg sm:text-xl md:text-2xl">🤖</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base md:text-lg">Smartie</h4>
                  <p className="text-xs sm:text-sm text-gray-400">Your AI car care assistant</p>
                </div>
              </div>
              <button 
                onClick={() => setShowSmartie(false)}
                className="text-gray-400 hover:text-white transition-colors text-lg sm:text-xl"
              >
                ✕
              </button>
            </div>
            
            <div className="bg-slate-700/50 rounded-lg p-2 sm:p-3 mb-3 sm:mb-4">
              <p className="text-gray-300 text-xs sm:text-sm">
                👋 Hi! What&apos;s going on with your car today? I&apos;m here to help!
              </p>
            </div>
            
            <div className="space-y-1 sm:space-y-2">
              <p className="text-xs text-gray-400 mb-1 sm:mb-2">Quick Actions:</p>
              {[
                { text: '🔧 Run Diagnostics', action: 'diagnostics' },
                { text: '👨‍🔧 Find Provider', action: 'providers', external: true },
                { text: '📊 Get Evaluation', action: 'evaluations' },
                { text: '💡 View Smart Deals', action: 'offers' },
                { text: '🚗 Manage Garage', action: 'garage' }
              ].map((option) => (
                <button 
                  key={option.action}
                  onClick={() => {
                    if (option.external) {
                      openCarSmartPeople({ source: 'smartie_chatbot', action: option.action });
                    } else if (option.action === 'garage') {
                      router.push('/garage')
                    } else if (option.action === 'diagnostics') {
                      router.push('/diagnostics')
                    } else if (option.action === 'evaluations') {
                      router.push('/evaluation')
                    } else if (option.action === 'offers') {
                      router.push('/deals')
                    } else {
                      scrollToSection(option.action);
                    }
                    setShowSmartie(false);
                  }}
                  className="w-full text-left bg-slate-700/60 hover:bg-cyan-500/20 border border-slate-600 hover:border-cyan-500 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-all duration-300 hover:shadow-md"
                >
                  {option.text}
                </button>
              ))}
            </div>
            
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-600/50">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="text-xs">💬 Chat integration coming soon</span>
                <div className="flex space-x-1">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse delay-100"></span>
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse delay-200"></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chatbot Toggle Button */}
        <button
          onClick={() => setShowSmartie(!showSmartie)}
          className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 transform hover:scale-110 ${showSmartie ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl">🤖</span>
          {!showSmartie && (
            <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 md:-top-2 md:-right-2 w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
              <span className="text-white text-xs sm:text-xs">!</span>
            </div>
          )}
        </button>
      </div>
    </>
  )
}



