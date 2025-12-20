import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function CookiePolicy({ user, logout }) {
  return (
    <>
      <Head>
        <title>Cookie Policy - Car Smart Club</title>
        <meta name="description" content="Cookie Policy for Car Smart Club - How we use cookies and similar technologies." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
        <Header user={user} logout={logout} />
        
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
          <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 md:p-8 lg:p-10 border border-slate-700/50">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Cookie Policy</h1>
            <p className="text-gray-400 mb-8">Effective Date: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">3.1 Cookie Usage</h2>
              <p className="text-gray-300 mb-4">Car Smart Club uses cookies and similar technologies for:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li><strong className="text-white">Essential platform functionality:</strong> Required for the website to function properly</li>
                <li><strong className="text-white">Analytics and performance monitoring:</strong> To understand how visitors use our site</li>
                <li><strong className="text-white">Personalization and user experience:</strong> To remember your preferences and improve your experience</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">3.2 Cookie Consent Banner</h2>
              <p className="text-gray-300 mb-4">Upon first visit, users are presented with a cookie consent banner allowing them to:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Accept all cookies</li>
                <li>Reject non-essential cookies</li>
                <li>Customize cookie preferences</li>
              </ul>
              <p className="text-gray-300 mt-4">Consent records are stored and may be withdrawn at any time via browser settings or site controls.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">Types of Cookies We Use</h2>
              <div className="space-y-4">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Essential Cookies</h3>
                  <p className="text-gray-300 text-sm">These cookies are necessary for the website to function and cannot be switched off. They include authentication, security, and session management cookies.</p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Analytics Cookies</h3>
                  <p className="text-gray-300 text-sm">These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.</p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Functional Cookies</h3>
                  <p className="text-gray-300 text-sm">These cookies enable enhanced functionality and personalization, such as remembering your preferences.</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">Managing Your Cookie Preferences</h2>
              <p className="text-gray-300 mb-4">You can manage your cookie preferences by:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Using the cookie consent banner on your first visit</li>
                <li>Adjusting your browser settings to block or delete cookies</li>
                <li>Contacting us to update your preferences</li>
              </ul>
              <p className="text-gray-300 mt-4 text-sm">Note: Blocking essential cookies may affect website functionality.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">Contact</h2>
              <div className="text-gray-300 space-y-2">
                <p className="font-semibold text-white">Car Smart Club LLC</p>
                <p>8 The Green, STE B</p>
                <p>Dover, DE 19901</p>
                <p>📧 <a href="mailto:privacy@carsmartclub.com" className="text-cyan-400 hover:underline">privacy@carsmartclub.com</a></p>
              </div>
            </section>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  )
}
