const mongoose = require('mongoose');

const diagnosticSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
  },
  vin: {
    type: String,
    trim: true,
  },
  results: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    default: {},
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'error'],
    default: 'pending',
  },
  summary: {
    type: String,
    trim: true,
  },
  recommendations: [{
    type: String,
    trim: true,
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Diagnostic', diagnosticSchema);





