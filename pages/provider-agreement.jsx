import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function ProviderAgreement({ user, logout }) {
  return (
    <>
      <Head>
        <title>Car Smart Care Provider Agreement - Car Smart Club</title>
        <meta name="description" content="Independent Provider Agreement for Car Smart Care Providers participating in the Car Smart Ecosystem." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
        <Header user={user} logout={logout} />
        
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
          <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 md:p-8 lg:p-10 border border-slate-700/50">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">🚗 CAR SMART CARE PROVIDER AGREEMENT</h1>
            <p className="text-gray-300 mb-2">(Independent Provider Agreement)</p>
            <p className="text-gray-400 text-sm mb-8">Effective Date: {new Date().toLocaleDateString()} | Last Updated: {new Date().toLocaleDateString()}</p>

            <div className="bg-slate-700/50 rounded-lg p-4 mb-8">
              <p className="text-gray-300 mb-2">This Car Smart Care Provider Agreement (&quot;Agreement&quot;) is entered into by and between:</p>
              <p className="text-gray-300 mb-2"><strong className="text-white">Car Smart People LLC</strong>, a Delaware Limited Liability Company, with a principal mailing address at 8 The Green, STE B, Dover, DE 19901 (&quot;Car Smart People&quot; or &quot;Company&quot;),</p>
              <p className="text-gray-300">and</p>
              <p className="text-gray-300 mt-2">The registering automotive professional or business entity (&quot;Provider&quot; or &quot;CCP&quot;).</p>
              <p className="text-gray-300 mt-2">Car Smart People LLC is majority-owned by <strong className="text-white">Synexa Inc.</strong>, a Delaware C-Corporation.</p>
            </div>

            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-3 text-cyan-400">1. PURPOSE OF AGREEMENT</h2>
              <p className="text-gray-300">This Agreement governs Provider participation in the Car Smart Ecosystem, including the listing, marketing, communication, and facilitation of services to Car Smart Club Members through digital platforms operated by:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-gray-300 mt-2">
                <li>Car Smart People LLC (provider governance and services)</li>
                <li>Car Smart Club LLC (consumer membership platform)</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-3 text-cyan-400">2. INCORPORATION BY REFERENCE</h2>
              <p className="text-gray-300 mb-2">The following documents are expressly incorporated into and form part of this Agreement:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-gray-300">
                <li>Car Smart Care Provider Guide</li>
                <li>Provider Code of Ethics</li>
                <li>Service Standards for Car Smart Club Members</li>
                <li>CCP Onboarding Checklist</li>
                <li>Data Processing Addendum (DPA)</li>
                <li>Terms & Conditions and Privacy Policy</li>
              </ul>
              <p className="text-gray-300 mt-2">Provider acknowledges that these documents may be updated periodically and agrees to comply with the most current versions.</p>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-3 text-cyan-400">3. INDEPENDENT CONTRACTOR STATUS</h2>
              <p className="text-gray-300 mb-2">Provider agrees and acknowledges that:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-gray-300">
                <li>Provider is an independent contractor</li>
                <li>Provider is not an employee, agent, partner, or joint venturer of:
                  <ul className="list-disc list-inside space-y-1 ml-6 mt-1">
                    <li>Car Smart People LLC</li>
                    <li>Car Smart Club LLC</li>
                    <li>Synexa Inc.</li>
                  </ul>
                </li>
                <li>Provider has no authority to bind or represent the Company</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-3 text-cyan-400">4. PROVIDER OBLIGATIONS</h2>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h3 className="font-semibold text-white mb-2">4.1 Compliance with Provider Guide</h3>
                  <p>Provider agrees to comply with all requirements, standards, and expectations set forth in the Car Smart Care Provider Guide, including but not limited to:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Ethical conduct</li>
                    <li>Professional service delivery</li>
                    <li>Transparent pricing and estimates</li>
                    <li>Member communication standards</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">4.2 Licensing & Insurance</h3>
                  <p>Provider represents and warrants that it:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Holds all required licenses, permits, and certifications</li>
                    <li>Maintains applicable insurance coverage</li>
                    <li>Will keep all credentials current</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-3 text-cyan-400">5. SERVICES TO CAR SMART CLUB MEMBERS</h2>
              <ul className="list-disc list-inside space-y-1 ml-4 text-gray-300">
                <li>Provider delivers services directly to members</li>
                <li>All diagnoses, repairs, pricing, and outcomes are the sole responsibility of the Provider</li>
                <li>Car Smart entities do not perform automotive services</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-3 text-cyan-400">6. DATA PROTECTION & CONFIDENTIALITY</h2>
              <p className="text-gray-300 mb-2">Provider agrees to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-gray-300">
                <li>Use member data solely to fulfill requested services</li>
                <li>Protect personal and vehicle data using reasonable safeguards</li>
                <li>Delete or anonymize member data after service completion</li>
                <li>Report any data breach within 72 hours</li>
              </ul>
              <p className="text-gray-300 mt-2">These obligations survive termination of this Agreement.</p>
            </section>

            {/* Section 7 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-3 text-cyan-400">7. PLATFORM TOOLS & CHATBOT DISCLOSURE</h2>
              <p className="text-gray-300 mb-2">Provider acknowledges that:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-gray-300">
                <li>Platform tools (including chatbots) are informational only</li>
                <li>Chatbots do not provide professional or mechanical advice</li>
                <li>Provider retains full responsibility for all service decisions</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-3 text-cyan-400">8. FEES & PAYMENTS</h2>
              <p className="text-gray-300">Provider agrees to pay all applicable subscription, listing, or service fees. Fees are billed in advance and are non-refundable once services are activated, unless otherwise stated in writing.</p>
            </section>

            {/* Section 9 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-3 text-cyan-400">9. DISPUTE COOPERATION</h2>
              <p className="text-gray-300 mb-2">Provider agrees to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-gray-300">
                <li>Respond promptly to member complaints</li>
                <li>Cooperate in good-faith dispute facilitation efforts</li>
                <li>Provide documentation when reasonably requested</li>
              </ul>
              <p className="text-gray-300 mt-2">Car Smart entities do not guarantee dispute outcomes.</p>
            </section>

            {/* Section 10 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-3 text-cyan-400">10. BRAND & TRADEMARK USE</h2>
              <p className="text-gray-300 mb-2">All trademarks, logos, software, and platform content are owned by <strong className="text-white">Synexa Inc.</strong>.</p>
              <p className="text-gray-300 mb-2">Provider may:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-gray-300">
                <li>Reference participation in the Car Smart Ecosystem</li>
                <li>Use approved branding materials if authorized</li>
              </ul>
              <p className="text-gray-300 mt-2 mb-2">Provider may not:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-gray-300">
                <li>Alter or misuse trademarks</li>
                <li>Imply employment, endorsement, or agency</li>
              </ul>
            </section>

            {/* Section 11 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-3 text-cyan-400">11. TERM & TERMINATION</h2>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h3 className="font-semibold text-white mb-2">11.1 Term</h3>
                  <p>This Agreement begins upon Provider acceptance and continues until terminated.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">11.2 Termination</h3>
                  <p className="mb-2">Car Smart People LLC may suspend or terminate Provider access for:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Violations of this Agreement</li>
                    <li>Violations of the Provider Guide or Code of Ethics</li>
                    <li>Failure to maintain credentials</li>
                    <li>Repeated member complaints</li>
                    <li>Legal or regulatory risk</li>
                  </ul>
                  <p className="mt-2">Termination may occur with or without notice, where legally permitted.</p>
                </div>
              </div>
            </section>

            {/* Section 12 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-3 text-cyan-400">12. LIMITATION OF LIABILITY</h2>
              <p className="text-gray-300 mb-2">To the maximum extent permitted by law:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-gray-300">
                <li>Car Smart entities are not liable for Provider service outcomes</li>
                <li>No liability for indirect, incidental, or consequential damages</li>
                <li>Total aggregate liability is limited to fees paid by Provider during the prior 12 months</li>
              </ul>
            </section>

            {/* Section 13 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-3 text-cyan-400">13. INDEMNIFICATION</h2>
              <p className="text-gray-300">Provider agrees to indemnify and hold harmless:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-gray-300 mt-2">
                <li>Car Smart People LLC</li>
                <li>Car Smart Club LLC</li>
                <li>Synexa Inc.</li>
                <li>Officers, directors, employees, and agents</li>
              </ul>
              <p className="text-gray-300 mt-2">from any claims arising out of Provider services, conduct, or violations of this Agreement.</p>
            </section>

            {/* Section 14 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-3 text-cyan-400">14. GOVERNING LAW & VENUE</h2>
              <p className="text-gray-300">This Agreement is governed by the laws of the State of Delaware, without regard to conflict of law principles.</p>
            </section>

            {/* Section 15 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-3 text-cyan-400">15. ELECTRONIC ACCEPTANCE & CLICKWRAP</h2>
              <p className="text-gray-300 mb-2">Provider agrees that:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-gray-300">
                <li>Electronic acceptance constitutes a binding agreement</li>
                <li>Acceptance is recorded via timestamp, IP address, and account ID</li>
                <li>No physical signature is required</li>
              </ul>
            </section>

            {/* Section 16 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-3 text-cyan-400">16. ENTIRE AGREEMENT</h2>
              <p className="text-gray-300">This Agreement, together with the incorporated documents, constitutes the entire agreement between the parties and supersedes all prior agreements or understandings.</p>
            </section>

            {/* Section 17 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-3 text-cyan-400">17. CONTACT INFORMATION</h2>
              <div className="text-gray-300 space-y-2">
                <p className="font-semibold text-white">Car Smart People LLC</p>
                <p>8 The Green, STE B</p>
                <p>Dover, DE 19901, USA</p>
                <p>📧 <a href="mailto:legal@carsmartpeople.com" className="text-cyan-400 hover:underline">legal@carsmartpeople.com</a></p>
              </div>
            </section>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  )
}


