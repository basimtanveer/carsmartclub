import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Terms({ user, logout }) {
  return (
    <>
      <Head>
        <title>Terms and Conditions - Car Smart Club</title>
        <meta name="description" content="Terms and Conditions for using Car Smart Club services." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
        <Header user={user} logout={logout} />
        
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
          <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 md:p-8 lg:p-10 border border-slate-700/50">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Terms and Conditions</h1>
            <p className="text-gray-400 mb-8">Effective Date: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">5.1 Acceptance & Clickwrap</h2>
              <p className="text-gray-300 mb-4">By:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Creating an account</li>
                <li>Checking the acceptance box</li>
                <li>Clicking &quot;Sign Up,&quot; &quot;Join,&quot; or similar</li>
              </ul>
              <p className="text-gray-300 mt-4 mb-2">you expressly agree to:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>These Terms & Conditions</li>
                <li>The Privacy Policy</li>
                <li>Cookie Policy</li>
              </ul>
              <p className="text-gray-300 mt-4">Acceptance is required to proceed.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">5.2 Marketplace Role</h2>
              <p className="text-gray-300 mb-2">Car Smart Club LLC:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Acts solely as a facilitator</li>
                <li>Does not perform automotive services</li>
                <li>Does not employ CCPs</li>
              </ul>
              <p className="text-gray-300 mt-4">CCPs are independent businesses governed by Car Smart People LLC standards.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">5.3 Payments & Subscriptions</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Payments processed by third-party providers</li>
                <li>Subscriptions auto-renew unless canceled</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">5.4 Dispute Assistance</h2>
              <p className="text-gray-300">Car Smart Club personnel may act as liaisons but do not guarantee resolution or outcomes.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">5.5 Limitation of Liability</h2>
              <p className="text-gray-300">Maximum liability is limited to the amount paid by the member during the current subscription period.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">8. Governing Law</h2>
              <p className="text-gray-300">State of Delaware, USA.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">Contact</h2>
              <div className="text-gray-300 space-y-2">
                <p className="font-semibold text-white">Car Smart Club LLC</p>
                <p>8 The Green, STE B</p>
                <p>Dover, DE 19901</p>
                <p>📧 <a href="mailto:legal@carsmartclub.com" className="text-cyan-400 hover:underline">legal@carsmartclub.com</a></p>
              </div>
            </section>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  )
}


