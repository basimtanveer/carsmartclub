const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema({
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
  year: {
    type: Number,
  },
  make: {
    type: String,
    trim: true,
  },
  model: {
    type: String,
    trim: true,
  },
  trim: {
    type: String,
    trim: true,
  },
  mileage: {
    type: Number,
  },
  zipCode: {
    type: String,
    trim: true,
  },
  condition: {
    type: String,
    enum: ['Excellent', 'Good', 'Fair', 'Needs Work'],
  },
  photos: [{
    type: String,
  }],
  purpose: {
    type: String,
    enum: ['Keep', 'Sell', 'Trade'],
  },
  marketValue: {
    min: Number,
    max: Number,
  },
  tradeInEstimate: {
    min: Number,
    max: Number,
  },
  privateSaleEstimate: {
    min: Number,
    max: Number,
  },
  dealerRetailValue: {
    min: Number,
    max: Number,
  },
  carSmartPeopleOffer: {
    amount: Number,
  },
  carSmartScore: {
    type: Number,
    min: 0,
    max: 100,
  },
  recommendedAction: {
    type: String,
    enum: ['Keep', 'Sell', 'Trade'],
  },
  ownershipCost: {
    type: Number,
  },
  bestTimeToSell: {
    type: String,
  },
  maintenancePlan: {
    upcomingServices: [{
      service: String,
      dueDate: Date,
      estimatedCost: Number,
    }],
  },
  reportGenerated: {
    type: Boolean,
    default: false,
  },
  reportUrl: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Evaluation', evaluationSchema);

