import Link from 'next/link'
import { useRouter } from 'next/router'
import cscLogo from '../public/assets/csc.jpg'

export default function Footer() {
  const router = useRouter()

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    } else {
      setTimeout(() => {
        const retryElement = document.getElementById(sectionId)
        if (retryElement) {
          retryElement.scrollIntoView({ behavior: 'smooth' })
        }
      }, 300)
    }
  }

  const openCarSmartPeople = (filters = {}) => {
    const baseUrl = 'https://www.carsmartpeople.com'
    const queryParams = new URLSearchParams(filters).toString()
    const url = queryParams ? `${baseUrl}?${queryParams}` : baseUrl
    window.open(url, '_blank')
  }

  return (
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
  )
}


