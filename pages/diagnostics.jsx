import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Diagnostics({ user, login, logout }) {
  const router = useRouter()
  const [vehicles, setVehicles] = useState([])
  const [diagnostics, setDiagnostics] = useState([])
  const [vin, setVin] = useState('')
  const [selectedVehicle, setSelectedVehicle] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)

  useEffect(() => {
    if (!user) {
      router.push('/signin')
      return
    }
    fetchVehicles()
    fetchDiagnostics()
  }, [user])

  const fetchVehicles = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api'}/vehicles`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      const data = await res.json()
      setVehicles(data)
    } catch (error) {
      console.error('Error fetching vehicles:', error)
    }
  }

  const fetchDiagnostics = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api'}/diagnostics`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      const data = await res.json()
      setDiagnostics(data)
    } catch (error) {
      console.error('Error fetching diagnostics:', error)
    }
  }

  const handleRunDiagnostics = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResults(null)

    try {
      const token = localStorage.getItem('token')
      const vehicleId = selectedVehicle || null
      const vinToUse = vin || (vehicleId ? vehicles.find(v => v._id === vehicleId)?.vin : null)

      // Simulate diagnostic process
      await new Promise(resolve => setTimeout(resolve, 2000))

      const mockResults = {
        engine: { status: 'OK', message: 'Engine running smoothly' },
        transmission: { status: 'OK', message: 'Transmission functioning normally' },
        brakes: { status: 'Attention', message: 'Brake pads at 30% - consider replacement soon' },
        battery: { status: 'OK', message: 'Battery voltage normal' },
        tires: { status: 'OK', message: 'Tire pressure within normal range' },
      }

      const recommendations = []
      if (mockResults.brakes.status === 'Attention') {
        recommendations.push('Schedule brake pad replacement')
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api'}/diagnostics`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          vin: vinToUse,
          vehicleId: vehicleId,
          results: mockResults,
          summary: 'Diagnostic completed successfully',
          recommendations: recommendations,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        setResults(data)
        fetchDiagnostics()
        setVin('')
        setSelectedVehicle('')
      }
    } catch (error) {
      console.error('Error running diagnostics:', error)
      alert('Error running diagnostics. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Diagnostics - Car Smart Club</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
        {/* Header */}
        <Header user={user} logout={logout} />

        {/* Main Content */}
        <main className="max-w-7xl  mt-8 mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">🔧 Diagnostic Tools</h1>
            <p className="text-gray-300 text-lg">Run diagnostics on your vehicle to identify any issues</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Diagnostic Form */}
            <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50">
              <h2 className="text-2xl font-bold mb-6">Run Diagnostics</h2>
              <form onSubmit={handleRunDiagnostics} className="space-y-4">
                {vehicles.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Vehicle</label>
                    <select
                      value={selectedVehicle}
                      onChange={(e) => setSelectedVehicle(e.target.value)}
                      className="w-full px-4 py-2 bg-slate-700/60 border border-slate-600 rounded-lg focus:border-cyan-500 focus:outline-none"
                    >
                      <option value="">Or enter VIN manually</option>
                      {vehicles.map((vehicle) => (
                        <option key={vehicle._id} value={vehicle._id}>
                          {vehicle.make} {vehicle.model} {vehicle.year}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium mb-2">Or Enter VIN</label>
                  <input
                    type="text"
                    value={vin}
                    onChange={(e) => setVin(e.target.value)}
                    placeholder="Enter VIN"
                    className="w-full px-4 py-2 bg-slate-700/60 border border-slate-600 rounded-lg focus:border-cyan-500 focus:outline-none"
                    disabled={!!selectedVehicle}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading || (!vin && !selectedVehicle)}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 py-3 rounded-xl font-semibold transition-all disabled:opacity-50"
                >
                  {loading ? 'Running Diagnostics...' : 'Run Diagnostics'}
                </button>
              </form>

              {results && (
                <div className="mt-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                  <h3 className="font-bold text-green-400 mb-2">Diagnostic Complete!</h3>
                  <p className="text-sm">{results.summary}</p>
                </div>
              )}
            </div>

            {/* Results Display */}
            {results && (
              <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50">
                <h2 className="text-2xl font-bold mb-6">Diagnostic Results</h2>
                <div className="space-y-4">
                  {Object.entries(results.results || {}).map(([key, value]) => (
                    <div key={key} className="p-4 bg-slate-700/60 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold capitalize">{key}</span>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          value.status === 'OK' ? 'bg-green-500/20 text-green-400' :
                          value.status === 'Attention' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {value.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">{value.message}</p>
                    </div>
                  ))}
                  {results.recommendations && results.recommendations.length > 0 && (
                    <div className="mt-4 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
                      <h3 className="font-bold text-yellow-400 mb-2">Recommendations</h3>
                      <ul className="list-disc list-inside text-sm">
                        {results.recommendations.map((rec, idx) => (
                          <li key={idx}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Diagnostic History */}
            <div className="lg:col-span-2 bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50">
              <h2 className="text-2xl font-bold mb-6">Diagnostic History</h2>
              {diagnostics.length === 0 ? (
                <p className="text-gray-400">No diagnostic history yet.</p>
              ) : (
                <div className="space-y-4">
                  {diagnostics.map((diagnostic) => (
                    <div key={diagnostic._id} className="p-4 bg-slate-700/60 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">
                          {diagnostic.vehicle ? `${diagnostic.vehicle.make} ${diagnostic.vehicle.model}` : 'VIN: ' + diagnostic.vin}
                        </span>
                        <span className="text-sm text-gray-400">
                          {new Date(diagnostic.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">{diagnostic.summary}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}

