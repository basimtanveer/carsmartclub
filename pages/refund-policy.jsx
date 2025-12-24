import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function RefundPolicy({ user, logout }) {
  return (
    <>
      <Head>
        <title>Refund Policy - Car Smart Club</title>
        <meta name="description" content="Refund policy for Car Smart Club memberships and services." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
        <Header user={user} logout={logout} />
        
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
          <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 md:p-8 lg:p-10 border border-slate-700/50">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Refund Policy</h1>
            <p className="text-gray-400 mb-8">Effective Date: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">Membership Refunds</h2>
              <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>Memberships refundable within <strong className="text-white">7 days</strong> if no services are initiated</li>
                  <li>Requests must be submitted within <strong className="text-white">30 days</strong> of purchase</li>
                  <li>Refunds processed within <strong className="text-white">7–10 business days</strong></li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">How to Request a Refund</h2>
              <p className="text-gray-300 mb-4">To request a refund, please contact us at:</p>
              <div className="bg-slate-700/50 rounded-lg p-4">
                <p className="text-gray-300"><strong className="text-white">Email:</strong> <a href="mailto:support@carsmartclub.com" className="text-cyan-400 hover:underline">support@carsmartclub.com</a></p>
                <p className="text-gray-300 mt-2"><strong className="text-white">Subject Line:</strong> Refund Request</p>
                <p className="text-gray-300 mt-2">Please include your membership details and reason for refund.</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">Non-Refundable Items</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Services already rendered by Car Care Providers</li>
                <li>Points or credits already redeemed</li>
                <li>Memberships after the 7-day refund period</li>
                <li>Third-party service fees</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">Processing Time</h2>
              <p className="text-gray-300">Once your refund request is approved, refunds are typically processed within 7–10 business days. The refund will be issued to the original payment method used for the purchase.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">Contact</h2>
              <div className="text-gray-300 space-y-2">
                <p className="font-semibold text-white">Car Smart Club LLC</p>
                <p>8 The Green, STE B</p>
                <p>Dover, DE 19901</p>
                <p>📧 <a href="mailto:support@carsmartclub.com" className="text-cyan-400 hover:underline">support@carsmartclub.com</a></p>
              </div>
            </section>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  )
}


