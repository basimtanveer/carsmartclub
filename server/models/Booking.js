const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Provider',
    required: [true, 'Please provide a provider'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a user'],
  },
  service: {
    type: String,
    required: [true, 'Please provide a service'],
    trim: true,
  },
  date: {
    type: Date,
    required: [true, 'Please provide a booking date'],
  },
  time: {
    type: String,
    required: [true, 'Please provide a booking time'],
  },
  notes: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending',
  },
  providerNotified: {
    type: Boolean,
    default: false,
  },
  userNotified: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Booking', bookingSchema);

