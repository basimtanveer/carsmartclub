import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import cscLogo from '../public/assets/csc.jpg'

export default function Header({ user, logout }) {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
    } else {
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
            {router.pathname === '/' && (
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
            )}
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
            {router.pathname === '/' && (
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
            )}
          </div>
        </div>
        
        {router.pathname === '/' && (
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
        )}
      </nav>
    </header>
  )
}


