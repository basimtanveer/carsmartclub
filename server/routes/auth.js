const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Point = require('../models/Point');
const Referral = require('../models/Referral');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your-secret-key-change-in-production', {
    expiresIn: '30d',
  });
};

// Generate unique referral code
const generateReferralCode = async () => {
  let code;
  let exists = true;
  while (exists) {
    code = `CSC-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    exists = await User.findOne({ referralCode: code });
  }
  return code;
};

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, zipCode, ageRange, preferences, referralCode } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Generate referral code for new user
    const newReferralCode = await generateReferralCode();

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      phone,
      zipCode,
      ageRange,
      preferences,
      referralCode: newReferralCode,
      availablePoints: 250, // Welcome bonus
      totalPoints: 250,
    });

    // Award welcome bonus points
    await Point.create({
      user: user._id,
      amount: 250,
      type: 'earned',
      source: 'welcome',
      description: 'Welcome bonus - Join Free & Earn 250 Points',
      multiplier: 1,
    });

    // Handle referral if provided
    if (referralCode) {
      const referrer = await User.findOne({ referralCode });
      if (referrer && referrer._id.toString() !== user._id.toString()) {
        await Referral.create({
          referrer: referrer._id,
          referred: user._id,
          referralCode,
          status: 'pending',
        });

        user.referredBy = referrer._id;
        await user.save();
      }
    }

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isMember: user.isMember,
        plan: user.plan,
        totalPoints: user.totalPoints,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
      // Update last activity
      user.lastActivity = new Date();
      await user.save();

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isMember: user.isMember,
        plan: user.plan,
        loyaltyTier: user.loyaltyTier,
        totalPoints: user.totalPoints,
        availablePoints: user.availablePoints,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    // Calculate available points
    const Point = require('../models/Point');
    const availablePoints = await Point.aggregate([
      {
        $match: {
          user: user._id,
          status: 'active',
          expiresAt: { $gt: new Date() },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
        },
      },
    ]);

    const userData = user.toObject();
    userData.availablePoints = availablePoints[0]?.total || 0;
    
    res.json(userData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;


