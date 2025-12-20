import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Loader from '../components/Loader'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Garage({ user, login, logout }) {
  const router = useRouter()
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    vin: '',
    mileage: '',
    color: '',
    licensePlate: '',
    status: 'OK',
  })

  useEffect(() => {
    if (!user) {
      router.push('/signin')
      return
    }
    fetchVehicles()
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
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api'}/vehicles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setShowAddForm(false)
        setFormData({
          make: '',
          model: '',
          year: '',
          vin: '',
          mileage: '',
          color: '',
          licensePlate: '',
          status: 'OK',
        })
        fetchVehicles()
      }
    } catch (error) {
      console.error('Error adding vehicle:', error)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this vehicle?')) return
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api'}/vehicles/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      if (res.ok) {
        fetchVehicles()
      }
    } catch (error) {
      console.error('Error deleting vehicle:', error)
    }
  }

  if (loading) {
    return <Loader fullScreen={true} size="xl" />
  }

  return (
    <>
      <Head>
        <title>Smart Garage - Car Smart Club</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
        <Header user={user} logout={logout} />
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Your Smart Garage</h1>
            <p className="text-gray-300 text-lg">Manage all your vehicles in one place</p>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="mb-8 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
          >
            {showAddForm ? 'Cancel' : '+ Add Vehicle'}
          </button>

          {showAddForm && (
            <form onSubmit={handleSubmit} className="mb-8 bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
              <h2 className="text-2xl font-bold mb-4">Add New Vehicle</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Make"
                  value={formData.make}
                  onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                  className="px-4 py-2 bg-slate-700/60 border border-slate-600 rounded-lg focus:border-cyan-500 focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Model"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  className="px-4 py-2 bg-slate-700/60 border border-slate-600 rounded-lg focus:border-cyan-500 focus:outline-none"
                  required
                />
                <input
                  type="number"
                  placeholder="Year"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="px-4 py-2 bg-slate-700/60 border border-slate-600 rounded-lg focus:border-cyan-500 focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="VIN (optional)"
                  value={formData.vin}
                  onChange={(e) => setFormData({ ...formData, vin: e.target.value })}
                  className="px-4 py-2 bg-slate-700/60 border border-slate-600 rounded-lg focus:border-cyan-500 focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Mileage"
                  value={formData.mileage}
                  onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                  className="px-4 py-2 bg-slate-700/60 border border-slate-600 rounded-lg focus:border-cyan-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="px-4 py-2 bg-slate-700/60 border border-slate-600 rounded-lg focus:border-cyan-500 focus:outline-none"
                />
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="px-4 py-2 bg-slate-700/60 border border-slate-600 rounded-lg focus:border-cyan-500 focus:outline-none"
                >
                  <option value="OK">OK</option>
                  <option value="Attention">Attention</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
              <button type="submit" className="mt-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 px-6 py-2 rounded-xl font-semibold">
                Add Vehicle
              </button>
            </form>
          )}

          {vehicles.length === 0 ? (
            <div className="text-center py-12 bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-slate-700/50">
              <p className="text-gray-400 text-lg">No vehicles added yet. Add your first vehicle to get started!</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((vehicle) => (
                <div key={vehicle._id} className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{vehicle.make} {vehicle.model} {vehicle.year}</h3>
                      <p className="text-gray-400">Mileage: {vehicle.mileage?.toLocaleString() || 'N/A'}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      vehicle.status === 'OK' ? 'bg-green-500/20 text-green-400' :
                      vehicle.status === 'Attention' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {vehicle.status}
                    </span>
                  </div>
                  {vehicle.vin && <p className="text-sm text-gray-400 mb-2">VIN: {vehicle.vin}</p>}
                  {vehicle.color && <p className="text-sm text-gray-400 mb-4">Color: {vehicle.color}</p>}
                  <div className="flex gap-2">
                    <Link href={`/diagnostics?vehicle=${vehicle._id}`} className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 py-2 rounded-xl font-semibold text-center transition-all">
                      Run Diagnostics
                    </Link>
                    <button
                      onClick={() => handleDelete(vehicle._id)}
                      className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl font-semibold transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  )
}



