const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./server/config/database')

// Load environment variables
dotenv.config()

// Connect to MongoDB
connectDB()

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
// Always use port 3000 for the unified server (frontend + API)
const port = 3000

// Create Next.js app
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
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
        plans: '/api/plans'
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
    console.log('✅ All API routes loaded successfully')
  } catch (error) {
    console.error('❌ Error loading API routes:', error)
  }

  // Handle all other requests with Next.js (must be last)
  expressApp.all('*', (req, res) => {
    return handle(req, res)
  })

  // Start server
  expressApp.listen(port, hostname, (err) => {
    if (err) {
      console.error('❌ Error starting server:', err)
      process.exit(1)
    }
    console.log(`🚀 Ready on http://${hostname}:${port}`)
    console.log(`📡 API available at http://${hostname}:${port}/api`)
    console.log(`💚 Health check: http://${hostname}:${port}/api/health`)
  })
}).catch((err) => {
  console.error('❌ Error preparing Next.js app:', err)
  process.exit(1)
})
