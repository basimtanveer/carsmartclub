import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Legal({ user, logout }) {
  return (
    <>
      <Head>
        <title>Legal & Policy Framework - Car Smart Club</title>
        <meta name="description" content="Legal information, privacy policy, terms and conditions, and other important policies for Car Smart Club." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
        <Header user={user} logout={logout} />
        
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
          <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 md:p-8 lg:p-10 border border-slate-700/50">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">📘 Legal & Policy Framework</h1>
            <p className="text-gray-300 mb-8 text-lg">www.carsmartclub.com - Consumer Platform</p>

            {/* Section 1: Corporate, Ownership & Ecosystem Disclosure */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">1. CORPORATE, OWNERSHIP & ECOSYSTEM DISCLOSURE</h2>
              
              <div className="space-y-4 text-gray-300">
                <div>
                  <h3 className="font-semibold text-white mb-2">Parent Company</h3>
                  <p>Synexa Inc., a Delaware C-Corporation (&quot;Synexa&quot;)</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-2">Operating Entity</h3>
                  <p>Car Smart Club LLC, a Delaware Limited Liability Company (&quot;Car Smart Club&quot;)</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-2">Ownership Structure</h3>
                  <p>Synexa Inc. is the majority owner of Car Smart Club LLC.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-2">Intellectual Property</h3>
                  <p>All trademarks, copyrights, software, platform architecture, chatbot logic, branding, and proprietary content associated with Car Smart Club are owned exclusively by Synexa Inc. and licensed to Car Smart Club LLC for operational use.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-2">Car Smart Ecosystem</h3>
                  <p>Car Smart Club LLC and Car Smart People LLC operate interconnected digital platforms, websites, applications, and chatbot technologies collectively known as the Car Smart Ecosystem.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-2">No Physical Locations</h3>
                  <p>Car Smart Club operates entirely online. There are no brick-and-mortar facilities for members.</p>
                </div>
              </div>
            </section>

            {/* Section 2: Privacy Policy */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">2. PRIVACY POLICY</h2>
              <p className="text-gray-400 mb-4">Effective Date: {new Date().toLocaleDateString()}</p>
              
              <div className="space-y-4 text-gray-300">
                <div>
                  <h3 className="font-semibold text-white mb-2">2.1 Data Controller</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Controller: Car Smart Club LLC</li>
                    <li>Parent Oversight: Synexa Inc.</li>
                    <li>Contact: <a href="mailto:privacy@carsmartclub.com" className="text-cyan-400 hover:underline">privacy@carsmartclub.com</a></li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-2">2.2 Data Collected</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Account registration details</li>
                    <li>Membership data</li>
                    <li>Payment information (processed by third-party processors only)</li>
                    <li>Communications (email, chatbot, video calls)</li>
                    <li>Device, cookie, and analytics data</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-2">2.3 Purpose of Processing</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Membership administration</li>
                    <li>Connecting members with registered Car Care Providers (&quot;CCPs&quot;)</li>
                    <li>Customer service and dispute facilitation</li>
                    <li>Fraud prevention and compliance</li>
                    <li>Platform analytics and improvements</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-2">2.4 Legal Basis</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Contractual necessity</li>
                    <li>Legitimate business interest</li>
                    <li>User consent</li>
                    <li>Legal obligations</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-2">2.5 Geographic Scope</h3>
                  <p>Memberships and services are available in:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>United States</li>
                    <li>Canada</li>
                    <li>Puerto Rico</li>
                    <li>U.S. Virgin Islands</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-2">2.6 Data Retention</h3>
                  <p>Data is retained while accounts are active and thereafter as required by law (generally up to 7 years).</p>
                </div>
              </div>
            </section>

            {/* Section 3: Cookie Policy */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">3. COOKIE POLICY & CONSENT BANNER</h2>
              
              <div className="space-y-4 text-gray-300">
                <div>
                  <h3 className="font-semibold text-white mb-2">3.1 Cookie Usage</h3>
                  <p>Car Smart Club uses cookies and similar technologies for:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Essential platform functionality</li>
                    <li>Analytics and performance monitoring</li>
                    <li>Personalization and user experience</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-2">3.2 Cookie Consent Banner</h3>
                  <p>Upon first visit, users are presented with a cookie consent banner allowing them to:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Accept all cookies</li>
                    <li>Reject non-essential cookies</li>
                    <li>Customize cookie preferences</li>
                  </ul>
                  <p className="mt-2">Consent records are stored and may be withdrawn at any time via browser settings or site controls.</p>
                </div>
              </div>
            </section>

            {/* Section 4: Chatbot & AI Disclosures */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">4. CHATBOT & AI DISCLOSURES</h2>
              
              <div className="space-y-4 text-gray-300">
                <div>
                  <h3 className="font-semibold text-white mb-2">4.1 Chatbot Use</h3>
                  <p>Car Smart Club utilizes automated chatbots and AI-assisted tools to:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Answer general questions</li>
                    <li>Provide guidance</li>
                    <li>Route users to human support</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-2">4.2 Chatbot Disclaimer</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Chatbot responses are informational only</li>
                    <li>Chatbots do not provide legal, mechanical, or professional advice</li>
                    <li>Users may request escalation to a human representative at any time</li>
                    <li>All chatbot interactions may be logged for quality, security, and compliance purposes</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 5: Terms & Conditions */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">5. TERMS & CONDITIONS</h2>
              
              <div className="space-y-4 text-gray-300">
                <div>
                  <h3 className="font-semibold text-white mb-2">5.1 Acceptance & Clickwrap</h3>
                  <p className="mb-2">By:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Creating an account</li>
                    <li>Checking the acceptance box</li>
                    <li>Clicking &quot;Sign Up,&quot; &quot;Join,&quot; or similar</li>
                  </ul>
                  <p className="mt-2">you expressly agree to:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>These Terms & Conditions</li>
                    <li>The Privacy Policy</li>
                    <li>Cookie Policy</li>
                  </ul>
                  <p className="mt-2">Acceptance is required to proceed.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-2">5.2 Marketplace Role</h3>
                  <p>Car Smart Club LLC:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Acts solely as a facilitator</li>
                    <li>Does not perform automotive services</li>
                    <li>Does not employ CCPs</li>
                  </ul>
                  <p className="mt-2">CCPs are independent businesses governed by Car Smart People LLC standards.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-2">5.3 Payments & Subscriptions</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Payments processed by third-party providers</li>
                    <li>Subscriptions auto-renew unless canceled</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-2">5.4 Dispute Assistance</h3>
                  <p>Car Smart Club personnel may act as liaisons but do not guarantee resolution or outcomes.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-2">5.5 Limitation of Liability</h3>
                  <p>Maximum liability is limited to the amount paid by the member during the current subscription period.</p>
                </div>
              </div>
            </section>

            {/* Section 6: Refund Policy */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">6. REFUND POLICY</h2>
              <div className="text-gray-300 space-y-2">
                <p>• Memberships refundable within 7 days if no services are initiated</p>
                <p>• Requests must be submitted within 30 days</p>
                <p>• Refunds processed within 7–10 business days</p>
              </div>
            </section>

            {/* Section 7: Mobile App Disclosure */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">7. MOBILE APP DISCLOSURE (APPLE & GOOGLE)</h2>
              <p className="text-gray-300">If accessed via a mobile application:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-gray-300 mt-2">
                <li>Apple and Google are not parties to these agreements</li>
                <li>They bear no responsibility for services, disputes, or support</li>
                <li>All claims must be directed to Car Smart Club LLC</li>
              </ul>
            </section>

            {/* Section 8: Governing Law */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">8. GOVERNING LAW</h2>
              <p className="text-gray-300">State of Delaware, USA.</p>
            </section>

            {/* Section 9: Contact */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">9. CONTACT</h2>
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


