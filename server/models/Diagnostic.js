const mongoose = require('mongoose');

const diagnosticSchema = new mongoose.Schema({
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  vin: {
    type: String,
  },
  results: {
    type: mongoose.Schema.Types.Mixed,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
  issues: [{
    code: String,
    description: String,
    severity: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
    },
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Diagnostic', diagnosticSchema);



