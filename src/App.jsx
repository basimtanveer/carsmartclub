import { useState, useEffect } from 'react'
import './App.css'
import cscLogo from './assets/csc.jpg'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [showSmartie, setShowSmartie] = useState(false)
  const [isMember, setIsMember] = useState(false) // Member status for personalized experience

  // Helper function to open Car Smart People with contextual filters and analytics
  const openCarSmartPeople = (filters = {}) => {
    const baseUrl = 'https://www.carsmartpeople.com'
    
    // Add member context to filters
    const enhancedFilters = {
      ...filters,
      member: isMember ? 'true' : 'false',
      club: 'car_smart_club'
    }
    
    const queryParams = new URLSearchParams(enhancedFilters).toString()
    const url = queryParams ? `${baseUrl}?${queryParams}` : baseUrl
    
    // Analytics tracking
    console.log('CSC to CSP click:', {
      timestamp: new Date().toISOString(),
      filters: enhancedFilters,
      source: 'car_smart_club',
      member: isMember,
      url: url
    })
    
    // In a real implementation, you would send this to your analytics service
    // Example: analytics.track('csc_to_csp_click', { filters: enhancedFilters, source: 'car_smart_club', member: isMember })
    
    window.open(url, '_blank')
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      {/* Header / Navigation */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white backdrop-blur-md shadow-xl' : 'bg-white backdrop-blur-sm'
      }`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center space-x-4 sm:space-x-8">
              <div className="flex items-center">
                <img 
                  src={cscLogo} 
                  alt="Car Smart Club Logo" 
                  className="h-8 sm:h-10 w-auto object-contain"
                />
              </div>
              <div className="hidden lg:flex space-x-8">
                {['home', 'how-it-works', 'providers', 'garage', 'diagnostics', 'evaluations', 'offers', 'blog'].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      if (item === 'providers') {
                        window.open('https://www.carsmartpeople.com', '_blank');
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
              <button 
                onClick={() => setIsMember(!isMember)}
                className={`text-sm sm:text-base transition-colors hidden sm:block ${
                  isMember ? 'text-orange-600 hover:text-orange-700' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {isMember ? 'Member' : 'Sign In'}
              </button>
              <button 
                onClick={() => setIsMember(!isMember)}
                className={`px-3 sm:px-6 py-1.5 sm:py-2 rounded-full font-semibold text-xs sm:text-base transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                  isMember 
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white' 
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white'
                }`}
              >
                {isMember ? 'Member ✓' : 'Join'}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-8 sm:pt-24 sm:pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-500/20"></div>
        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="animate-fade-in-up space-y-4 sm:space-y-6 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight">
                A <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  Prescription
                </span> for Better Car Care
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Manage & Assess your car(s), run diagnostics, and find trusted providers — all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4 justify-center lg:justify-start">
                <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-4 sm:px-6 py-2.5 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                  Start Car Diagnosis
                </button>
                <button 
                  onClick={() => openCarSmartPeople({ service: 'general', location: 'nearby' })}
                  className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-4 sm:px-6 py-2.5 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105"
                >
                  Find Local Providers
                </button>
                <button className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 px-4 sm:px-6 py-2.5 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105">
                  Explore Local Deals
                </button>
              </div>
            </div>
            <div className="relative animate-fade-in-right mt-8 lg:mt-0">
              <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-4 sm:p-6 lg:p-8 border border-slate-700/50 shadow-2xl">
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse delay-100"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-200"></div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Dashboard Preview</h3>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="bg-slate-700/60 rounded-lg p-2 sm:p-3 border border-slate-600/50">
                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm font-medium">Honda Civic 2020</span>
                        <span className="text-green-400 text-xs font-semibold">✓ Healthy</span>
                      </div>
                    </div>
                    <div className="bg-slate-700/60 rounded-lg p-2 sm:p-3 border border-slate-600/50">
                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm font-medium">Toyota Camry 2019</span>
                        <span className="text-yellow-400 text-xs font-semibold">⚠ Needs Check</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Smartie Robot Animation */}
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center animate-bounce shadow-xl">
                <span className="text-lg sm:text-2xl">🤖</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">How It Works</h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto">
              We partner with <span className="text-cyan-400 font-semibold">Car Smart People</span> — see trusted providers in your area
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-8 bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 shadow-xl">
              <div className="text-5xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold mb-4">1. Diagnose Your Car</h3>
              <p className="text-gray-400 text-lg">Run diagnostics to identify any issues with your vehicle</p>
            </div>
            <div className="text-center p-8 bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 shadow-xl">
              <div className="text-5xl mb-6">👨‍🔧</div>
              <h3 className="text-2xl font-bold mb-4">2. Find Local Experts</h3>
              <p className="text-gray-400 text-lg">Connect with verified car care professionals in your area</p>
            </div>
            <div className="text-center p-8 bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 shadow-xl">
              <div className="text-5xl mb-6">✅</div>
              <h3 className="text-2xl font-bold mb-4">3. Get Quality Service</h3>
              <p className="text-gray-400 text-lg">Enjoy member discounts and priority booking with trusted providers</p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Ready to Connect with Car Smart People?</h3>
              <p className="text-gray-300 text-lg mb-6">
                Browse our network of verified automotive professionals and get the help your car needs.
              </p>
              <button 
                onClick={() => openCarSmartPeople({ featured: 'true', member: 'exclusive' })}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                Go to Car Smart People Directory
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Garage Preview */}
      <section id="garage" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Your Smart Garage</h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto">Manage your vehicles with intelligent insights and real-time monitoring</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { name: 'Honda Civic 2020', status: 'OK', mileage: '45,230', color: 'green' },
              { name: 'Toyota Camry 2019', status: 'Attention', mileage: '67,890', color: 'yellow' },
              { name: 'Ford Mustang 2021', status: 'Critical', mileage: '23,450', color: 'red' }
            ].map((car, index) => (
              <div key={index} className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-4 sm:p-6 lg:p-8 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 shadow-xl">
                <div className="flex justify-between items-start mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-bold">{car.name}</h3>
                  <span className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold ${
                    car.color === 'green' ? 'bg-green-500/20 text-green-400' :
                    car.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {car.status}
                  </span>
                </div>
                <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-lg">Mileage: {car.mileage}</p>
                <div className="space-y-2">
                  <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 shadow-lg">
                    Manage Vehicle
                  </button>
                  {car.status !== 'OK' && (
                    <button 
                      onClick={() => openCarSmartPeople({ service: car.status === 'Attention' ? 'maintenance' : 'repair', urgency: 'high' })}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 shadow-lg"
                    >
                      Get Help for This Issue
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 sm:mt-12">
            <button className="bg-slate-700 hover:bg-slate-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 shadow-lg">
              Add Vehicle
            </button>
          </div>
        </div>
      </section>

      {/* Diagnostic & Evaluation Tools */}
      <section id="diagnostics" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Diagnostic & Evaluation Tools</h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto">Get instant insights about your vehicle with our advanced diagnostic tools</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Diagnostic Check Widget */}
            <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-10 border border-slate-700/50 shadow-xl">
              <h3 className="text-3xl font-bold mb-6 flex items-center">
                🔧 Diagnostic Check
              </h3>
              <div className="space-y-6">
                <input
                  type="text"
                  placeholder="Enter VIN or click 'Run Diagnostics'"
                  className="w-full px-6 py-4 bg-slate-700/60 border border-slate-600 rounded-xl focus:border-cyan-500 focus:outline-none transition-all duration-300 text-lg"
                />
                <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg">
                  Run Diagnostics
                </button>
                <p className="text-gray-400 text-lg">
                  OBD-II device integration coming soon for real-time monitoring
                </p>
                <button 
                  onClick={() => openCarSmartPeople({ service: 'diagnostics', type: 'repair' })}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 py-3 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg mt-4"
                >
                  Need Help? Connect with Local Repair Shops
                </button>
              </div>
            </div>

            {/* Car Smart Evaluation Widget */}
            <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-10 border border-slate-700/50 shadow-xl">
              <h3 className="text-3xl font-bold mb-6 flex items-center">
                📊 Car Smart Evaluation
              </h3>
              <div className="space-y-6">
                <p className="text-gray-300 mb-6 text-lg">What would you like to do with your car?</p>
                <div className="grid grid-cols-3 gap-4">
                  {['Keep', 'Sell', 'Trade'].map((option) => (
                    <button
                      key={option}
                      className="bg-slate-700/60 hover:bg-cyan-500/20 border border-slate-600 hover:border-cyan-500 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg"
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <p className="text-gray-400 text-lg">
                  Get instant summary report (PDF or email)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Deals Section */}
      <section id="offers" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6">💡 Smart Deals</h2>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto">Exclusive offers from verified providers in your area</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "20% off Oil Change", provider: "Joe's Auto", original: "$89", discount: "$71" },
              { title: "Free Car Wash with Brake Service", provider: "Metro Tires", original: "$150", discount: "$120" },
              { title: "$30 Discount on Engine Diagnostics", provider: "SpeedPro Garage", original: "$120", discount: "$90" }
            ].map((deal, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-800/60 to-slate-700/60 backdrop-blur-xl rounded-2xl p-8 border border-slate-600/50 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 shadow-xl">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold">{deal.title}</h3>
                      {isMember && (
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-2 py-1 rounded-full text-xs font-bold">
                          CLUB MEMBER EXCLUSIVE
                        </span>
                      )}
                    </div>
                    <p className="text-cyan-400 font-semibold text-lg">{deal.provider}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-400 line-through">{deal.original}</span>
                    <p className="text-green-400 font-bold text-2xl">{deal.discount}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 py-3 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg">
                    Claim Deal
                  </button>
                  <button 
                    onClick={() => openCarSmartPeople({ deal: deal.title, provider: deal.provider, type: 'deal' })}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 py-2 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg"
                  >
                    See Local Shops Offering This Deal
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <div className="flex justify-center space-x-6 mb-8">
              {['Maintenance', 'Tires', 'Detailing', 'Diagnostics'].map((filter) => (
                <button key={filter} className="bg-slate-700/60 hover:bg-blue-500/20 border border-slate-600 hover:border-blue-500 px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg">
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Car Smart Club */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6">Why Join Car Smart Club?</h2>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto">Exclusive benefits for members</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '✅', title: 'Verified Providers', desc: 'All providers are verified and rated' },
              { icon: '📞', title: 'Phone & Online Booking', desc: 'Easy booking through multiple channels' },
              { icon: '💲', title: 'Member Discounts', desc: 'Exclusive deals and savings' },
              { icon: '🚗', title: 'Free Garage Dashboard', desc: 'Manage all your vehicles in one place' }
            ].map((feature, index) => (
              <div key={index} className="text-center p-8 bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 shadow-xl">
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400 text-lg">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Providers */}
      <section id="providers" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6">Featured Providers</h2>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto">Top-rated car care professionals in your area</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "AutoCare Plus", rating: 4.9, services: "Full Service Auto Repair", location: "Downtown" },
              { name: "Metro Tires & Service", rating: 4.8, services: "Tires, Brakes, Alignment", location: "Midtown" },
              { name: "Elite Detailing", rating: 4.9, services: "Premium Car Detailing", location: "Uptown" }
            ].map((provider, index) => (
              <div key={index} className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 shadow-xl">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-6">
                    <span className="text-white font-bold text-xl">{provider.name[0]}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold">{provider.name}</h3>
                      {isMember && (
                        <span className="bg-gradient-to-r from-orange-400 to-red-400 text-white px-2 py-1 rounded-full text-xs font-bold">
                          CLUB MEMBER DISCOUNT
                        </span>
                      )}
                    </div>
                    <div className="flex items-center">
                      <span className="text-yellow-400 text-lg">★</span>
                      <span className="ml-2 text-lg font-semibold">{provider.rating}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 mb-3 text-lg">{provider.services}</p>
                <p className="text-gray-500 mb-6 text-lg">{provider.location}</p>
                <div className="space-y-2">
                  <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 py-3 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg">
                    Book Now
                  </button>
                  <button 
                    onClick={() => openCarSmartPeople({ provider: provider.name, service: provider.services, location: provider.location })}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 py-2 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg"
                  >
                    View on Car Smart People
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Member Testimonials */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6">What Our Members Say</h2>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto">Real stories from satisfied Car Smart Club members</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
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
              <div key={index} className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 shadow-xl">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-xl">★</span>
                    ))}
                  </div>
                </div>
                <blockquote className="text-gray-300 text-lg mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">{testimonial.author}</p>
                    <p className="text-gray-400 text-sm">{testimonial.location}</p>
                  </div>
                  <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                    {testimonial.savings}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-8 border border-slate-700/50 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Join Thousands of Happy Members</h3>
              <p className="text-gray-300 text-lg mb-6">
                Over 10,000 car owners trust Car Smart Club for their vehicle care needs
              </p>
              <div className="flex justify-center space-x-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-cyan-400">4.9★</div>
                  <div className="text-sm text-gray-400">Average Rating</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-cyan-400">10K+</div>
                  <div className="text-sm text-gray-400">Active Members</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-cyan-400">500+</div>
                  <div className="text-sm text-gray-400">Verified Providers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-cyan-400">$2M+</div>
                  <div className="text-sm text-gray-400">Member Savings</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Signup Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-800/40 to-slate-700/40">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 sm:p-12 border border-slate-700/50 shadow-2xl">
            <div className="mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                For Automotive Industry Professionals
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 mb-6">
                Mechanics, Auto Body Repair, Tires & Wheels, Detailing, and more...
              </p>
              <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
                Join our network of verified local car care providers and connect with customers who need your expertise.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8">
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-semibold">
                  🛠️ Mechanics
                </span>
                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                  🔧 Auto Body Repair
                </span>
                <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-semibold">
                  🛞 Tires & Wheels
                </span>
                <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm font-semibold">
                  ✨ Detailing
                </span>
                <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm font-semibold">
                  🔋 Auto Electric
                </span>
                <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm font-semibold">
                  🚗 General Service
                </span>
              </div>
            </div>
            
            <div className="bg-slate-700/50 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Why Join Our Network?</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                <div className="flex items-center space-x-3">
                  <span className="text-green-400">✓</span>
                  <span className="text-sm text-gray-300">Verified Provider Badge</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-400">✓</span>
                  <span className="text-sm text-gray-300">Direct Customer Leads</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-400">✓</span>
                  <span className="text-sm text-gray-300">Online Booking System</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-400">✓</span>
                  <span className="text-sm text-gray-300">Review Management</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-400">✓</span>
                  <span className="text-sm text-gray-300">Marketing Support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-400">✓</span>
                  <span className="text-sm text-gray-300">Priority Listing</span>
                </div>
              </div>
            </div>
            
            <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-8 sm:px-12 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              Become a Verified Local Car Care Provider
            </button>
            
            <p className="text-sm text-gray-500 mt-4">
              Join our network • Get verified • Start receiving leads
            </p>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Car Care Tips & Insights</h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto">Expert advice to keep your vehicle running smoothly</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <div key={index} className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 shadow-xl">
                <div className="mb-4">
                  <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm font-semibold">
                    {article.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-4">{article.title}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{article.excerpt}</p>
                <button 
                  onClick={() => openCarSmartPeople({ service: article.category.toLowerCase(), type: 'specialist' })}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 py-3 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg"
                >
                  {article.cta}
                </button>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button 
              onClick={() => openCarSmartPeople({ service: 'all', view: 'directory' })}
              className="bg-slate-700 hover:bg-slate-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg"
            >
              Browse All Service Providers
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/50 backdrop-blur-md py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-700/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <img 
                  src={cscLogo} 
                  alt="Car Smart Club Logo" 
                  className="w-full h-auto object-contain"
                />
              </div>
              <p className="text-gray-400">Your prescription for better car care.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                {['About', 'Terms', 'Privacy', 'Support', 'Blog'].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-cyan-400 transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                {['Diagnostics', 'Assessments', 'Garage Management', 'Provider Search'].map((service) => (
                  <li key={service}>
                    <a href="#" className="hover:text-cyan-400 transition-colors">{service}</a>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <button 
                  onClick={() => openCarSmartPeople({ view: 'directory', source: 'footer' })}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 shadow-lg"
                >
                  Browse Car Smart People Directory
                </button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">Get the latest deals & car care tips.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter email"
                  className="flex-1 px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-l-lg focus:border-cyan-500 focus:outline-none"
                />
                <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-4 py-2 rounded-r-lg font-semibold transition-all duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-700/50 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Car Smart Club. Owned by Vika Enterprises. Powered by Car Smart People.</p>
          </div>
        </div>
      </footer>

      {/* Smartie Chatbot */}
      <div className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 transition-all duration-300 ${showSmartie ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="bg-slate-800 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-slate-700/50 shadow-2xl max-w-xs sm:max-w-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-3 animate-pulse">
                <span className="text-2xl">🤖</span>
              </div>
      <div>
                <h4 className="font-bold text-lg">Smartie</h4>
                <p className="text-sm text-gray-400">Your AI car care assistant</p>
              </div>
      </div>
            <button 
              onClick={() => setShowSmartie(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
        </button>
          </div>
          
          <div className="bg-slate-700/50 rounded-lg p-3 mb-4">
            <p className="text-gray-300 text-sm">
              👋 Hi! What's going on with your car today? I'm here to help!
            </p>
          </div>
          
          <div className="space-y-2">
            <p className="text-xs text-gray-400 mb-2">Quick Actions:</p>
            {[
              { text: '🔧 Run Diagnostics', action: 'diagnostics' },
              { text: '👨‍🔧 Find Provider', action: 'providers', external: true },
              { text: '📊 Get Evaluation', action: 'evaluations' },
              { text: '💡 View Smart Deals', action: 'deals' },
              { text: '🚗 Manage Garage', action: 'garage' }
            ].map((option) => (
              <button 
                key={option.action}
                onClick={() => {
                  if (option.external) {
                    openCarSmartPeople({ source: 'smartie_chatbot', action: option.action });
                  } else {
                    scrollToSection(option.action);
                  }
                  setShowSmartie(false);
                }}
                className="w-full text-left bg-slate-700/60 hover:bg-cyan-500/20 border border-slate-600 hover:border-cyan-500 px-3 py-2 rounded-lg text-sm transition-all duration-300 hover:shadow-md"
              >
                {option.text}
              </button>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-slate-600/50">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>💬 Chat integration coming soon</span>
              <div className="flex space-x-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-100"></span>
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-200"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setShowSmartie(!showSmartie)}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 transform hover:scale-110 ${showSmartie ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <span className="text-2xl sm:text-3xl">🤖</span>
        {!showSmartie && (
          <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
            <span className="text-white text-xs">!</span>
          </div>
        )}
      </button>
    </div>
  )
}

export default App