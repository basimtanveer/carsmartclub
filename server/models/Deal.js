const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Provider',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  originalPrice: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    type: Number,
  },
  isMemberExclusive: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
    enum: ['Maintenance', 'Tires', 'Detailing', 'Diagnostics', 'Repair', 'Other'],
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Deal', dealSchema);



