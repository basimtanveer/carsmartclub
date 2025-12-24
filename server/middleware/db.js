const mongoose = require('mongoose');

// Middleware to check database connection state
const checkDBConnection = (req, res, next) => {
  // Check if mongoose is connected
  if (mongoose.connection.readyState !== 1) {
    // readyState: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    return res.status(503).json({ 
      message: 'Database connection unavailable. Please try again later.',
      error: 'Service temporarily unavailable'
    });
  }
  next();
};

module.exports = { checkDBConnection };

