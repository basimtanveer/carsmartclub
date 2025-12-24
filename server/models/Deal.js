const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a deal title'],
    trim: true,
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Provider',
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  originalPrice: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    required: true,
  },
  discountPercent: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    enum: ['Maintenance', 'Tires', 'Detailing', 'Diagnostics', 'Repair', 'Other'],
    default: 'Other',
  },
  isMemberExclusive: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  validUntil: {
    type: Date,
  },
  terms: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Deal', dealSchema);





