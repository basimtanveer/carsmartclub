import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function ProviderGuide({ user, logout }) {
  return (
    <>
      <Head>
        <title>Car Smart Care Provider Standards & Onboarding - Car Smart Club</title>
        <meta name="description" content="Provider Code of Ethics, Service Standards, and Onboarding Checklist for Car Care Providers." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
        <Header user={user} logout={logout} />
        
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
          <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 md:p-8 lg:p-10 border border-slate-700/50">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">🚗 Car Smart Care Provider Standards & Onboarding</h1>
            <p className="text-xl text-gray-300 mb-2">Serving Car Smart Club Members with Integrity, Quality, and Transparency</p>
            
            <div className="bg-slate-700/50 rounded-lg p-4 mb-8">
              <p className="text-gray-300 mb-2"><strong className="text-white">Applies to:</strong> All registered Car Care Providers (CCPs) participating in the Car Smart Ecosystem</p>
              <p className="text-gray-300"><strong className="text-white">Governing Entity:</strong> Car Smart People LLC, a Delaware Limited Liability Company (Majority owned by Synexa Inc., Delaware C-Corporation)</p>
            </div>

            <div className="bg-cyan-500/20 border border-cyan-500/50 rounded-lg p-4 mb-8">
              <h2 className="font-bold text-cyan-400 mb-2">OUR COMMITMENT TO EXCELLENCE</h2>
              <p className="text-gray-300">Car Smart Care Providers are trusted professionals who serve Car Smart Club Members through a digital-first platform designed to improve transparency, service quality, and consumer confidence.</p>
              <p className="text-gray-300 mt-2">This page outlines:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-gray-300 mt-2">
                <li>The Provider Code of Ethics</li>
                <li>Required Service Standards</li>
                <li>The CCP Onboarding Checklist</li>
                <li>Ongoing compliance expectations</li>
              </ul>
              <p className="text-gray-300 mt-2 font-semibold">Participation in the Car Smart Ecosystem requires agreement to and compliance with all standards below.</p>
            </div>

            {/* Provider Code of Ethics */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">🧭 PROVIDER CODE OF ETHICS</h2>
              <p className="text-gray-300 mb-4">All CCPs must operate in accordance with the following ethical principles:</p>
              
              <div className="space-y-4 text-gray-300">
                <div>
                  <h3 className="font-semibold text-white mb-2">1. HONESTY & TRANSPARENCY</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Provide clear, accurate explanations of vehicle conditions and services</li>
                    <li>Offer written estimates before beginning work</li>
                    <li>Disclose pricing, parts, labor, and potential alternatives upfront</li>
                    <li>Never perform unauthorized repairs</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-2">2. PROFESSIONAL INTEGRITY</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Recommend only services that are reasonably necessary</li>
                    <li>Avoid deceptive, misleading, or high-pressure sales practices</li>
                    <li>Represent credentials, certifications, and experience truthfully</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-2">3. QUALITY & SAFETY</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Perform services using industry best practices</li>
                    <li>Use appropriate tools, parts, and procedures</li>
                    <li>Follow all safety, environmental, and regulatory requirements</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-2">4. RESPECT & FAIR TREATMENT</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Treat all members with courtesy and professionalism</li>
                    <li>Maintain non-discriminatory service practices</li>
                    <li>Respect member time, property, and concerns</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-2">5. CONFIDENTIALITY & DATA PROTECTION</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Use member data solely for service fulfillment</li>
                    <li>Secure all personal and vehicle information</li>
                    <li>Do not sell, share, or misuse member data</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-2">6. ACCOUNTABILITY</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Address errors or service concerns in good faith</li>
                    <li>Cooperate with Car Smart Club personnel during dispute facilitation</li>
                    <li>Accept responsibility for services provided</li>
                  </ul>
                </div>
              </div>
              
              <p className="text-red-400 font-semibold mt-4">Violations of this Code may result in suspension or removal from the platform.</p>
            </section>

            {/* Service Standards */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">🔧 SERVICE STANDARDS FOR CAR SMART CLUB MEMBERS</h2>
              
              <div className="space-y-4 text-gray-300">
                <div>
                  <h3 className="font-semibold text-white mb-2">Professional Conduct</h3>
                  <p>CCPs are expected to:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Communicate clearly and respectfully</li>
                    <li>Honor appointments and commitments</li>
                    <li>Provide timely updates when delays occur</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-2">Communication Expectations</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Respond to member inquiries within 1 business day</li>
                    <li>Clearly explain diagnoses, timelines, and costs</li>
                    <li>Use phone, email, messaging, or video calls professionally</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-2">Payments & Pricing</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Disclose all charges before work begins</li>
                    <li>Avoid hidden fees or price changes without approval</li>
                    <li>Process payments ethically and securely</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Onboarding Checklist */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">📋 CCP ONBOARDING CHECKLIST</h2>
              <p className="text-gray-300 mb-4">To become an active Car Smart Care Provider, you must complete all onboarding steps below.</p>
              
              <div className="space-y-6 text-gray-300">
                <div>
                  <h3 className="font-semibold text-white mb-3">✅ Business & Legal Verification</h3>
                  <ul className="list-none space-y-2 ml-4">
                    <li>☐ Business legal name and address</li>
                    <li>☐ Proof of business registration</li>
                    <li>☐ Valid licenses (state/provincial/local)</li>
                    <li>☐ Proof of insurance (as applicable)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-3">✅ Professional Credentials</h3>
                  <ul className="list-none space-y-2 ml-4">
                    <li>☐ Certifications and specializations</li>
                    <li>☐ Years of experience and service offerings</li>
                    <li>☐ Primary service area(s)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-3">✅ Platform Setup</h3>
                  <ul className="list-none space-y-2 ml-4">
                    <li>☐ Create Car Smart People account</li>
                    <li>☐ Complete provider profile</li>
                    <li>☐ Upload logos, photos, or branding (optional)</li>
                    <li>☐ Enable communication tools</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-3">✅ Compliance Acknowledgments</h3>
                  <ul className="list-none space-y-2 ml-4">
                    <li>☐ Accept Provider Code of Ethics</li>
                    <li>☐ Accept Provider Guide & Service Standards</li>
                    <li>☐ Accept Data Processing Addendum</li>
                    <li>☐ Accept Terms & Privacy Policy</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-3">✅ Operational Readiness</h3>
                  <ul className="list-none space-y-2 ml-4">
                    <li>☐ Designate primary contact person</li>
                    <li>☐ Confirm response time expectations</li>
                    <li>☐ Understand dispute cooperation process</li>
                    <li>☐ Review member experience expectations</li>
                  </ul>
                </div>
              </div>
              
              <p className="text-cyan-400 font-semibold mt-4">Only providers who complete onboarding and verification are eligible to serve Car Smart Club Members.</p>
            </section>

            {/* Data Protection */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">🔐 DATA PROTECTION & CONFIDENTIALITY</h2>
              <p className="text-gray-300 mb-2">CCPs must:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-gray-300">
                <li>Use member data only to deliver requested services</li>
                <li>Restrict access to authorized staff</li>
                <li>Delete or anonymize data after service completion</li>
                <li>Report any suspected data breaches within 72 hours</li>
              </ul>
            </section>

            {/* Platform Tools */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">🤖 PLATFORM TOOLS & CHATBOT USE</h2>
              <p className="text-gray-300 mb-2">Car Smart platforms may include:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-gray-300">
                <li>Messaging tools</li>
                <li>Scheduling tools</li>
                <li>AI-assisted chatbots</li>
              </ul>
              <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4 mt-4">
                <p className="text-yellow-300 font-semibold mb-2">Important:</p>
                <p className="text-gray-300">Chatbots provide informational assistance only. CCPs are solely responsible for:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-gray-300 mt-2">
                  <li>Diagnoses</li>
                  <li>Repairs</li>
                  <li>Pricing decisions</li>
                  <li>Service outcomes</li>
                </ul>
              </div>
            </section>

            {/* Compliance */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">⚖️ COMPLIANCE, MONITORING & ENFORCEMENT</h2>
              <p className="text-gray-300 mb-2">Car Smart People LLC reserves the right to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-gray-300">
                <li>Monitor provider performance</li>
                <li>Review complaints and feedback</li>
                <li>Conduct audits or verification checks</li>
              </ul>
              <p className="text-gray-300 mt-4 mb-2">Non-compliance may result in:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-gray-300">
                <li>Warnings</li>
                <li>Temporary suspension</li>
                <li>Permanent removal from the platform</li>
              </ul>
            </section>

            {/* Updates */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">🔄 UPDATES TO THIS PAGE</h2>
              <p className="text-gray-300">This page may be updated periodically. Continued participation in the Car Smart Ecosystem constitutes acceptance of any revisions.</p>
            </section>

            {/* Contact */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">📞 PROVIDER SUPPORT & CONTACT</h2>
              <div className="text-gray-300 space-y-2">
                <p className="font-semibold text-white">Car Smart People LLC</p>
                <p>8 The Green, STE B</p>
                <p>Dover, DE 19901, USA</p>
                <p>📧 <a href="mailto:providers@carsmartpeople.com" className="text-cyan-400 hover:underline">providers@carsmartpeople.com</a></p>
              </div>
            </section>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  )
}


