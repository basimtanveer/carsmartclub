const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['earned', 'redeemed', 'expired', 'bonus', 'referral', 'welcome'],
    required: true,
  },
  source: {
    type: String,
    enum: ['purchase', 'service', 'referral', 'review', 'welcome', 'promotion', 'redemption'],
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  purchaseAmount: {
    type: Number,
  },
  multiplier: {
    type: Number,
    default: 1,
  },
  expiresAt: {
    type: Date,
    default: function() {
      const date = new Date();
      date.setMonth(date.getMonth() + 36); // 36 months from now
      return date;
    },
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'redeemed', 'expired'],
    default: 'active',
  },
  relatedTransaction: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'relatedModel',
  },
  relatedModel: {
    type: String,
    enum: ['Purchase', 'Service', 'Referral', 'Review'],
  },
}, {
  timestamps: true,
});

// Index for efficient queries
pointSchema.index({ user: 1, status: 1, expiresAt: 1 });

module.exports = mongoose.model('Point', pointSchema);

