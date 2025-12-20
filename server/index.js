const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/vehicles', require('./routes/vehicles'));
app.use('/api/diagnostics', require('./routes/diagnostics'));
app.use('/api/providers', require('./routes/providers'));
app.use('/api/deals', require('./routes/deals'));
app.use('/api/members', require('./routes/members'));
app.use('/api/points', require('./routes/points'));
app.use('/api/rewards', require('./routes/rewards'));
app.use('/api/referrals', require('./routes/referrals'));
app.use('/api/evaluations', require('./routes/evaluations'));
app.use('/api/plans', require('./routes/plans'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Car Smart Club API is running' });
});

// Root route for backend (informational)
app.get('/', (req, res) => {
  res.json({ 
    message: 'Car Smart Club API Server',
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
    },
    frontend: 'http://localhost:3000'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
  console.log(`💚 Health check: http://localhost:${PORT}/api/health`);
});



