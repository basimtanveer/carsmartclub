const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
  referrer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  referred: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  referralCode: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'rewarded'],
    default: 'pending',
  },
  referrerReward: {
    points: {
      type: Number,
      default: 200,
    },
    status: {
      type: String,
      enum: ['pending', 'awarded'],
      default: 'pending',
    },
  },
  referredReward: {
    points: {
      type: Number,
      default: 100,
    },
    status: {
      type: String,
      enum: ['pending', 'awarded'],
      default: 'pending',
    },
  },
  completedAt: {
    type: Date,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Referral', referralSchema);


