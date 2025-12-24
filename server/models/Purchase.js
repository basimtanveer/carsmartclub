const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Provider',
  },
  amount: {
    type: Number,
    required: true,
  },
  preTaxAmount: {
    type: Number,
    required: true,
  },
  pointsEarned: {
    type: Number,
    default: 0,
  },
  pointsRedeemed: {
    type: Number,
    default: 0,
  },
  type: {
    type: String,
    enum: ['service', 'product', 'accessory'],
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  invoiceUrl: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'verified', 'completed', 'cancelled'],
    default: 'pending',
  },
  verifiedAt: {
    type: Date,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Purchase', purchaseSchema);





