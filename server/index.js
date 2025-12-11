const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/carsmartclub';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

// Routes
const authRoutes = require('./routes/auth');
const vehiclesRoutes = require('./routes/vehicles');
const diagnosticsRoutes = require('./routes/diagnostics');
const providersRoutes = require('./routes/providers');
const dealsRoutes = require('./routes/deals');
const membersRoutes = require('./routes/members');

app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehiclesRoutes);
app.use('/api/diagnostics', diagnosticsRoutes);
app.use('/api/providers', providersRoutes);
app.use('/api/deals', dealsRoutes);
app.use('/api/members', membersRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Car Smart Club API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

module.exports = app;



