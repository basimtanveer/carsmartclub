const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    enum: ['Essential Maintenance', 'Car Wash & Detailing', 'Exclusive Discounts', 'Premium Upgrades', 'Other'],
    required: true,
  },
  pointsRequired: {
    type: Number,
    required: true,
  },
  cashValue: {
    type: Number,
    required: true,
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Provider',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String,
  },
  terms: {
    type: String,
    trim: true,
  },
  expirationDate: {
    type: Date,
  },
  redemptionLimit: {
    type: Number,
  },
  redemptionCount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Reward', rewardSchema);

