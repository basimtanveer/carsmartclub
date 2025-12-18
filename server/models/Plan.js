const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ['Free', 'Smart', 'Premium', 'Family'],
  },
  price: {
    type: Number,
    required: true,
  },
  billingCycle: {
    type: String,
    enum: ['monthly', 'yearly'],
    default: 'monthly',
  },
  features: [{
    name: String,
    description: String,
  }],
  pointsMultiplier: {
    type: Number,
    default: 1,
  },
  maxVehicles: {
    type: Number,
    default: 1,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Plan', planSchema);

