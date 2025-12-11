const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  vin: {
    type: String,
    unique: true,
    sparse: true,
  },
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  mileage: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['OK', 'Attention', 'Critical'],
    default: 'OK',
  },
  lastDiagnostic: {
    type: Date,
  },
  diagnosticResults: {
    type: mongoose.Schema.Types.Mixed,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Vehicle', vehicleSchema);



