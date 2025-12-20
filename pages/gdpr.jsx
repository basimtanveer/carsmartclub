import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function GDPR({ user, logout }) {
  return (
    <>
      <Head>
        <title>GDPR Compliance - Car Smart Club</title>
        <meta name="description" content="GDPR compliance information for Car Smart Club users in the European Union." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
        <Header user={user} logout={logout} />
        
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
          <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 md:p-8 lg:p-10 border border-slate-700/50">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">GDPR Compliance</h1>
            <p className="text-gray-400 mb-8">General Data Protection Regulation (GDPR) Information</p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">Your Rights Under GDPR</h2>
              <p className="text-gray-300 mb-4">If you are located in the European Economic Area (EEA), you have the following rights regarding your personal data:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li><strong className="text-white">Right to Access:</strong> You can request a copy of your personal data we hold.</li>
                <li><strong className="text-white">Right to Rectification:</strong> You can request correction of inaccurate data.</li>
                <li><strong className="text-white">Right to Erasure:</strong> You can request deletion of your personal data.</li>
                <li><strong className="text-white">Right to Restrict Processing:</strong> You can request limitation of data processing.</li>
                <li><strong className="text-white">Right to Data Portability:</strong> You can request your data in a portable format.</li>
                <li><strong className="text-white">Right to Object:</strong> You can object to processing of your personal data.</li>
                <li><strong className="text-white">Right to Withdraw Consent:</strong> You can withdraw consent at any time.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">Exercising Your Rights</h2>
              <p className="text-gray-300 mb-4">To exercise any of these rights, please contact us at:</p>
              <div className="bg-slate-700/50 rounded-lg p-4">
                <p className="text-gray-300"><strong className="text-white">Email:</strong> <a href="mailto:privacy@carsmartclub.com" className="text-cyan-400 hover:underline">privacy@carsmartclub.com</a></p>
                <p className="text-gray-300 mt-2"><strong className="text-white">Subject Line:</strong> GDPR Request</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">Data Processing Legal Basis</h2>
              <p className="text-gray-300 mb-4">We process your personal data based on:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Your consent (which you can withdraw at any time)</li>
                <li>Contractual necessity (to provide our services)</li>
                <li>Legitimate business interests</li>
                <li>Legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">Data Transfers</h2>
              <p className="text-gray-300">Car Smart Club LLC operates primarily in the United States. When you use our services, your data may be transferred to and processed in the United States. We ensure appropriate safeguards are in place to protect your data in accordance with GDPR requirements.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">Contact</h2>
              <div className="text-gray-300 space-y-2">
                <p className="font-semibold text-white">Car Smart Club LLC</p>
                <p>8 The Green, STE B</p>
                <p>Dover, DE 19901, USA</p>
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
