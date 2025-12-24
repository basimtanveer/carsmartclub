const express = require('express');
const Booking = require('../models/Booking');
const Provider = require('../models/Provider');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const { checkDBConnection } = require('../middleware/db');
const { sendTransactionalEmail } = require('../services/emailService');
const { getProviderBookingTemplate } = require('../services/emailTemplates');

const router = express.Router();

// @route   POST /api/bookings
// @desc    Create a new booking
// @access  Private
router.post('/', protect, checkDBConnection, async (req, res) => {
  try {
    const { providerId, service, date, time, notes } = req.body;

    // Validation
    if (!providerId || !service || !date || !time) {
      return res.status(400).json({ 
        message: 'Please provide provider, service, date, and time' 
      });
    }

    // Check if provider exists
    const provider = await Provider.findById(providerId);
    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    // Get user
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create booking
    const booking = await Booking.create({
      provider: providerId,
      user: req.user._id,
      service,
      date: new Date(date),
      time,
      notes: notes || '',
      status: 'pending',
    });

    // Populate booking details for response
    await booking.populate('provider', 'name email phone address');
    await booking.populate('user', 'name email phone');

    // Send email notification to provider (async, don't wait for it)
    if (provider.email) {
      const bookingEmailHtml = getProviderBookingTemplate(
        provider.name,
        user.name,
        user.email,
        user.phone || '',
        service,
        date,
        time,
        notes || '',
        booking._id.toString()
      );
      
      sendTransactionalEmail(
        provider.email,
        `New Booking Request from ${user.name} - ${service}`,
        bookingEmailHtml
      ).catch(err => console.error('Failed to send booking notification email to provider:', err));
      
      // Mark provider as notified
      booking.providerNotified = true;
      await booking.save({ validateBeforeSave: false });
    }

    res.status(201).json({
      success: true,
      booking,
      message: 'Booking request submitted successfully. The provider will contact you soon.',
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }

    res.status(500).json({ message: error.message || 'Internal server error' });
  }
});

// @route   GET /api/bookings
// @desc    Get user's bookings
// @access  Private
router.get('/', protect, checkDBConnection, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('provider', 'name email phone address services rating')
      .sort({ date: -1, createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/bookings/:id
// @desc    Get a single booking
// @access  Private
router.get('/:id', protect, checkDBConnection, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('provider', 'name email phone address services rating')
      .populate('user', 'name email phone');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user owns this booking
    if (booking.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/bookings/:id/status
// @desc    Update booking status
// @access  Private
router.put('/:id/status', protect, checkDBConnection, async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const booking = await Booking.findById(req.params.id)
      .populate('provider', 'name email phone')
      .populate('user', 'name email phone');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user owns this booking
    if (booking.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    booking.status = status;
    await booking.save();

    res.json({
      success: true,
      booking,
      message: `Booking ${status} successfully`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

