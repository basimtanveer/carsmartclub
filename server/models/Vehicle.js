const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  make: {
    type: String,
    required: [true, 'Please add a make'],
    trim: true,
  },
  model: {
    type: String,
    required: [true, 'Please add a model'],
    trim: true,
  },
  year: {
    type: Number,
    required: [true, 'Please add a year'],
  },
  vin: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
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
  color: {
    type: String,
    trim: true,
  },
  licensePlate: {
    type: String,
    trim: true,
  },
  notes: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Vehicle', vehicleSchema);

