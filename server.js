const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./server/config/database')

// Load environment variables
dotenv.config()

const dev = process.env.NODE_ENV !== 'production'
const hostname = '0.0.0.0' // Listen on all interfaces for production
// Use port 3001 to avoid conflict with other website on port 3000
const port = parseInt(process.env.PORT || '3001', 10)

// Create Next.js app
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(async () => {
  // Connect to MongoDB before starting server
  try {
    await connectDB()
    console.log('✅ Database connection established')
  } catch (error) {
    console.error('❌ Failed to connect to database:', error.message)
    // In production, you might want to retry or exit gracefully
    if (process.env.NODE_ENV === 'production') {
      console.error('❌ Server will not start without database connection')
      process.exit(1)
    }
  }
  // Create Express server
  const expressApp = express()

  // Middleware
  expressApp.use(cors())
  expressApp.use(express.json())
  expressApp.use(express.urlencoded({ extended: true }))

  // Root API endpoint
  expressApp.get('/api', (req, res) => {
    res.json({ 
      message: 'Car Smart Club API',
      version: '1.0.0',
      endpoints: {
        health: '/api/health',
        auth: '/api/auth',
        vehicles: '/api/vehicles',
        providers: '/api/providers',
        deals: '/api/deals',
        points: '/api/points',
        rewards: '/api/rewards',
        referrals: '/api/referrals',
        evaluations: '/api/evaluations',
        plans: '/api/plans',
        bookings: '/api/bookings'
      }
    })
  })

  // Health check
  expressApp.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Car Smart Club API is running' })
  })

  // API Routes - mount Express routes BEFORE Next.js handler
  try {
    expressApp.use('/api/auth', require('./server/routes/auth'))
    expressApp.use('/api/vehicles', require('./server/routes/vehicles'))
    expressApp.use('/api/diagnostics', require('./server/routes/diagnostics'))
    expressApp.use('/api/providers', require('./server/routes/providers'))
    expressApp.use('/api/deals', require('./server/routes/deals'))
    expressApp.use('/api/members', require('./server/routes/members'))
    expressApp.use('/api/points', require('./server/routes/points'))
    expressApp.use('/api/rewards', require('./server/routes/rewards'))
    expressApp.use('/api/referrals', require('./server/routes/referrals'))
    expressApp.use('/api/evaluations', require('./server/routes/evaluations'))
    expressApp.use('/api/plans', require('./server/routes/plans'))
    expressApp.use('/api/bookings', require('./server/routes/bookings'))
    console.log('✅ All API routes loaded successfully')
  } catch (error) {
    console.error('❌ Error loading API routes:', error)
  }

  // Handle all other requests with Next.js (must be last)
  expressApp.all('*', (req, res) => {
    return handle(req, res)
  })

  // Start server - listen on all interfaces (0.0.0.0) for production
  expressApp.listen(port, '0.0.0.0', (err) => {
    if (err) {
      console.error('❌ Error starting server:', err)
      process.exit(1)
    }
    console.log(`🚀 Ready on http://0.0.0.0:${port}`)
    console.log(`📡 API available at http://0.0.0.0:${port}/api`)
    console.log(`💚 Health check: http://0.0.0.0:${port}/api/health`)
    console.log(`🌐 Accessible at http://localhost:${port} or http://127.0.0.1:${port}`)
  })
}).catch((err) => {
  console.error('❌ Error preparing Next.js app:', err)
  process.exit(1)
})



