import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function PrivacyPolicy({ user, logout }) {
  return (
    <>
      <Head>
        <title>Privacy Policy - Car Smart Club</title>
        <meta name="description" content="Privacy Policy for Car Smart Club - How we collect, use, and protect your personal information." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
        <Header user={user} logout={logout} />
        
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
          <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 md:p-8 lg:p-10 border border-slate-700/50">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-gray-400 mb-8">Effective Date: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">2.1 Data Controller</h2>
              <div className="text-gray-300 space-y-2">
                <p><strong className="text-white">Controller:</strong> Car Smart Club LLC</p>
                <p><strong className="text-white">Parent Oversight:</strong> Synexa Inc.</p>
                <p><strong className="text-white">Contact:</strong> <a href="mailto:privacy@carsmartclub.com" className="text-cyan-400 hover:underline">privacy@carsmartclub.com</a></p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">2.2 Data Collected</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Account registration details</li>
                <li>Membership data</li>
                <li>Payment information (processed by third-party processors only)</li>
                <li>Communications (email, chatbot, video calls)</li>
                <li>Device, cookie, and analytics data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">2.3 Purpose of Processing</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Membership administration</li>
                <li>Connecting members with registered Car Care Providers (&quot;CCPs&quot;)</li>
                <li>Customer service and dispute facilitation</li>
                <li>Fraud prevention and compliance</li>
                <li>Platform analytics and improvements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">2.4 Legal Basis</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Contractual necessity</li>
                <li>Legitimate business interest</li>
                <li>User consent</li>
                <li>Legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">2.5 Geographic Scope</h2>
              <p className="text-gray-300 mb-2">Memberships and services are available in:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>United States</li>
                <li>Canada</li>
                <li>Puerto Rico</li>
                <li>U.S. Virgin Islands</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">2.6 Data Retention</h2>
              <p className="text-gray-300">Data is retained while accounts are active and thereafter as required by law (generally up to 7 years).</p>
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
