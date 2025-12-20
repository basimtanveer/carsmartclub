import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import { API_BASE_URL } from '../lib/api'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Evaluation({ user, login, logout }) {
  const router = useRouter()
  const { purpose: urlPurpose } = router.query
  const [step, setStep] = useState(1)
  const [purpose, setPurpose] = useState(urlPurpose || '')
  const [vehicles, setVehicles] = useState([])
  const [evaluation, setEvaluation] = useState({
    vehicleId: '',
    vin: '',
    year: '',
    make: '',
    model: '',
    trim: '',
    mileage: '',
    zipCode: '',
    condition: 'Good',
    photos: [],
    purpose: '',
  })
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [evaluationId, setEvaluationId] = useState(null)

  useEffect(() => {
    if (urlPurpose) {
      setPurpose(urlPurpose)
      setEvaluation({ ...evaluation, purpose: urlPurpose })
    }
  }, [urlPurpose])

  useEffect(() => {
    if (user) {
      fetchVehicles()
      if (user.zipCode) {
        setEvaluation({ ...evaluation, zipCode: user.zipCode })
      }
    }
  }, [user])

  const fetchVehicles = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${API_BASE_URL}/vehicles`, {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        setVehicles(data)
      }
    } catch (error) {
      console.error('Error fetching vehicles:', error)
    }
  }

  const handleVehicleSelect = (vehicleId) => {
    const vehicle = vehicles.find(v => v._id === vehicleId)
    if (vehicle) {
      setEvaluation({
        ...evaluation,
        vehicleId: vehicle._id,
        vin: vehicle.vin || '',
        year: vehicle.year || '',
        make: vehicle.make || '',
        model: vehicle.model || '',
        mileage: vehicle.mileage || '',
      })
    }
  }

  const handleStep1Submit = async (e) => {
    e.preventDefault()
    if (!evaluation.make || !evaluation.model || !evaluation.year || !evaluation.mileage || !evaluation.condition) {
      alert('Please fill in all required fields')
      return
    }

    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${API_BASE_URL}/evaluations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...evaluation,
          purpose: purpose || evaluation.purpose,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        setEvaluationId(data._id)
        setStep(2)
      }
    } catch (error) {
      console.error('Error creating evaluation:', error)
      alert('Error creating evaluation. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCalculate = async () => {
    if (!evaluationId) return

    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${API_BASE_URL}/evaluations/${evaluationId}/calculate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (res.ok) {
        const data = await res.json()
        setResults(data)
        setStep(3)
      }
    } catch (error) {
      console.error('Error calculating evaluation:', error)
      alert('Error calculating evaluation. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateReport = async () => {
    if (!evaluationId) return

    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${API_BASE_URL}/evaluations/${evaluationId}/generate-report`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (res.ok) {
        const data = await res.json()
        alert('Report generated successfully!')
        // In production, would download or show PDF
      }
    } catch (error) {
      console.error('Error generating report:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Car Smart Evaluation - Car Smart Club</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
        {/* Header */}
        <Header user={user} logout={logout} />

        {/* Main Content */}
        <main className="max-w-4xl mx-auto mt-8 px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">A Smart Way to Decide: Keep, Sell, or Trade</h1>
            <p className="text-gray-300 text-lg">
              The Car Smart Evaluation lives inside your dashboard — guiding you to make data-driven choices about your vehicle in just 3 minutes.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex-1 flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= s ? 'bg-cyan-500' : 'bg-slate-700'
                }`}>
                  {step > s ? '✓' : s}
                </div>
                {s < 4 && <div className={`flex-1 h-1 mx-2 ${step > s ? 'bg-cyan-500' : 'bg-slate-700'}`} />}
              </div>
            ))}
          </div>

          {/* STEP 1: Vehicle Information */}
          {step === 1 && (
            <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50">
              <h2 className="text-2xl font-bold mb-6">STEP 1 – Vehicle Information</h2>
              <form onSubmit={handleStep1Submit} className="space-y-6">
                {!purpose && (
                  <div>
                    <label className="block text-sm font-medium mb-2">What would you like to do?</label>
                    <div className="grid grid-cols-3 gap-4">
                      {['Keep', 'Sell', 'Trade'].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            setPurpose(opt)
                            setEvaluation({ ...evaluation, purpose: opt })
                          }}
                          className={`py-3 rounded-xl font-semibold transition-all ${
                            purpose === opt
                              ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                              : 'bg-slate-700/60 hover:bg-slate-700'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {vehicles.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Select from your garage</label>
                    <select
                      onChange={(e) => handleVehicleSelect(e.target.value)}
                      className="w-full px-4 py-2 bg-slate-700/60 border border-slate-600 rounded-lg focus:border-cyan-500 focus:outline-none"
                    >
                      <option value="">Or enter manually</option>
                      {vehicles.map((vehicle) => (
                        <option key={vehicle._id} value={vehicle._id}>
                          {vehicle.make} {vehicle.model} {vehicle.year}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Year *</label>
                    <input
                      type="number"
                      value={evaluation.year}
                      onChange={(e) => setEvaluation({ ...evaluation, year: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-700/60 border border-slate-600 rounded-lg focus:border-cyan-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Make *</label>
                    <input
                      type="text"
                      value={evaluation.make}
                      onChange={(e) => setEvaluation({ ...evaluation, make: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-700/60 border border-slate-600 rounded-lg focus:border-cyan-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Model *</label>
                    <input
                      type="text"
                      value={evaluation.model}
                      onChange={(e) => setEvaluation({ ...evaluation, model: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-700/60 border border-slate-600 rounded-lg focus:border-cyan-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Trim (optional)</label>
                    <input
                      type="text"
                      value={evaluation.trim}
                      onChange={(e) => setEvaluation({ ...evaluation, trim: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-700/60 border border-slate-600 rounded-lg focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">VIN (optional)</label>
                    <input
                      type="text"
                      value={evaluation.vin}
                      onChange={(e) => setEvaluation({ ...evaluation, vin: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-700/60 border border-slate-600 rounded-lg focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Mileage *</label>
                    <input
                      type="number"
                      value={evaluation.mileage}
                      onChange={(e) => setEvaluation({ ...evaluation, mileage: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-700/60 border border-slate-600 rounded-lg focus:border-cyan-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">ZIP Code *</label>
                    <input
                      type="text"
                      value={evaluation.zipCode}
                      onChange={(e) => setEvaluation({ ...evaluation, zipCode: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-700/60 border border-slate-600 rounded-lg focus:border-cyan-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Condition *</label>
                    <select
                      value={evaluation.condition}
                      onChange={(e) => setEvaluation({ ...evaluation, condition: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-700/60 border border-slate-600 rounded-lg focus:border-cyan-500 focus:outline-none"
                      required
                    >
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                      <option value="Needs Work">Needs Work</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 py-3 rounded-xl font-semibold transition-all disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Next: Get My Market Value'}
                </button>
              </form>
            </div>
          )}

          {/* STEP 2: Smart Valuation Summary */}
          {step === 2 && (
            <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50">
              <h2 className="text-2xl font-bold mb-6">STEP 2 – Smart Valuation Summary</h2>
              <button
                onClick={handleCalculate}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 py-3 rounded-xl font-semibold transition-all disabled:opacity-50 mb-6"
              >
                {loading ? 'Calculating...' : 'Calculate Market Value'}
              </button>
            </div>
          )}

          {/* STEP 3: Results */}
          {step === 3 && results && (
            <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50">
              <h2 className="text-2xl font-bold mb-6">STEP 3 – Your Valuation Results</h2>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">💰 Market Value Range</h3>
                <p className="text-3xl font-bold text-green-400">
                  ${results.marketValue?.min?.toLocaleString()} – ${results.marketValue?.max?.toLocaleString()}
                </p>
                <p className="text-sm text-gray-400 mt-1">📍 Based on local listings near {evaluation.zipCode}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-700/60 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Trade-In Estimate</h4>
                  <p className="text-xl text-cyan-400">
                    ${results.tradeInEstimate?.min?.toLocaleString()} – ${results.tradeInEstimate?.max?.toLocaleString()}
                  </p>
                </div>
                <div className="bg-slate-700/60 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Private Sale Estimate</h4>
                  <p className="text-xl text-cyan-400">
                    ${results.privateSaleEstimate?.min?.toLocaleString()} – ${results.privateSaleEstimate?.max?.toLocaleString()}
                  </p>
                </div>
                <div className="bg-slate-700/60 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Dealer Retail Value</h4>
                  <p className="text-xl text-cyan-400">
                    ${results.dealerRetailValue?.min?.toLocaleString()} – ${results.dealerRetailValue?.max?.toLocaleString()}
                  </p>
                </div>
                <div className="bg-slate-700/60 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Car Smart Score™</h4>
                  <p className="text-3xl font-bold text-yellow-400">{results.carSmartScore}/100</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Recommended Action: {results.recommendedAction}</h3>
                <div className="flex flex-wrap gap-3">
                  {results.recommendedAction === 'Sell' && (
                    <button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 px-6 py-2 rounded-xl font-semibold">
                      🏷 Sell My Car
                    </button>
                  )}
                  {results.recommendedAction === 'Trade' && (
                    <button className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-xl font-semibold">
                      🔁 Trade It In
                    </button>
                  )}
                  {results.recommendedAction === 'Keep' && (
                    <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-6 py-2 rounded-xl font-semibold">
                      🔧 Keep My Car
                    </button>
                  )}
                </div>
              </div>

              <button
                onClick={() => setStep(4)}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 py-3 rounded-xl font-semibold transition-all"
              >
                Continue to Smart Report Summary
              </button>
            </div>
          )}

          {/* STEP 4: Report Summary */}
          {step === 4 && results && (
            <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50">
              <h2 className="text-2xl font-bold mb-6">STEP 4 – Your Car Smart Score™</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Market Range</h3>
                  <p className="text-lg">${results.marketValue?.min?.toLocaleString()} – ${results.marketValue?.max?.toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Recommended Action</h3>
                  <p className="text-lg">{results.recommendedAction}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Ownership Cost</h3>
                  <p className="text-lg">${results.ownershipCost?.toLocaleString()} annually</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Best Time to Sell</h3>
                  <p className="text-lg">{results.bestTimeToSell || 'Within 6 months'}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  onClick={handleGenerateReport}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 py-3 rounded-xl font-semibold transition-all disabled:opacity-50"
                >
                  📄 Download PDF Report
                </button>
                <button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 py-3 rounded-xl font-semibold transition-all">
                  ✉️ Email My Report
                </button>
                <button
                  onClick={() => {
                    setStep(1)
                    setResults(null)
                    setEvaluationId(null)
                  }}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 py-3 rounded-xl font-semibold transition-all"
                >
                  🔄 Restart Evaluation
                </button>
              </div>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  )
}

