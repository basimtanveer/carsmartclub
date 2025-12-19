const express = require('express');
const Referral = require('../models/Referral');
const User = require('../models/User');
const Point = require('../models/Point');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

// @route   GET /api/referrals/my-code
// @desc    Get user's referral code
// @access  Private
router.get('/my-code', async (req, res) => {
  try {
    let user = await User.findById(req.user._id);
    
    // Generate referral code if doesn't exist
    if (!user.referralCode) {
      const code = `CSC-${user._id.toString().slice(-6).toUpperCase()}`;
      user.referralCode = code;
      await user.save();
    }

    res.json({
      referralCode: user.referralCode,
      referralLink: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/join?ref=${user.referralCode}`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/referrals/stats
// @desc    Get referral statistics
// @access  Private
router.get('/stats', async (req, res) => {
  try {
    const referrals = await Referral.find({ referrer: req.user._id });
    
    const stats = {
      total: referrals.length,
      completed: referrals.filter(r => r.status === 'completed').length,
      pending: referrals.filter(r => r.status === 'pending').length,
      totalRewards: referrals
        .filter(r => r.referrerReward.status === 'awarded')
        .reduce((sum, r) => sum + r.referrerReward.points, 0),
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/referrals/verify
// @desc    Verify and process referral (called during registration)
// @access  Public (but should be called server-side)
router.post('/verify', async (req, res) => {
  try {
    const { referralCode, userId } = req.body;

    if (!referralCode || !userId) {
      return res.status(400).json({ message: 'Referral code and user ID required' });
    }

    const referrer = await User.findOne({ referralCode });
    if (!referrer) {
      return res.status(404).json({ message: 'Invalid referral code' });
    }

    if (referrer._id.toString() === userId) {
      return res.status(400).json({ message: 'Cannot refer yourself' });
    }

    // Check if referral already exists
    const existingReferral = await Referral.findOne({
      referrer: referrer._id,
      referred: userId,
    });

    if (existingReferral) {
      return res.status(400).json({ message: 'Referral already processed' });
    }

    // Create referral record
    const referral = await Referral.create({
      referrer: referrer._id,
      referred: userId,
      referralCode,
      status: 'pending',
    });

    // Update referred user
    await User.findByIdAndUpdate(userId, {
      referredBy: referrer._id,
    });

    res.json({ success: true, referral });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/referrals/complete
// @desc    Complete referral (when referred user becomes paid member)
// @access  Private
router.post('/complete', async (req, res) => {
  try {
    const { referralId } = req.body;

    const referral = await Referral.findById(referralId);
    if (!referral) {
      return res.status(404).json({ message: 'Referral not found' });
    }

    if (referral.status === 'completed') {
      return res.status(400).json({ message: 'Referral already completed' });
    }

    // Award points to referrer
    if (referral.referrerReward.status === 'pending') {
      await Point.create({
        user: referral.referrer,
        amount: referral.referrerReward.points,
        type: 'earned',
        source: 'referral',
        description: 'Referral bonus',
        multiplier: 1,
      });

      await User.findByIdAndUpdate(referral.referrer, {
        $inc: { totalPoints: referral.referrerReward.points, availablePoints: referral.referrerReward.points },
      });

      referral.referrerReward.status = 'awarded';
    }

    // Award points to referred user
    if (referral.referredReward.status === 'pending') {
      await Point.create({
        user: referral.referred,
        amount: referral.referredReward.points,
        type: 'earned',
        source: 'referral',
        description: 'Welcome bonus for being referred',
        multiplier: 1,
      });

      await User.findByIdAndUpdate(referral.referred, {
        $inc: { totalPoints: referral.referredReward.points, availablePoints: referral.referredReward.points },
      });

      referral.referredReward.status = 'awarded';
    }

    referral.status = 'completed';
    referral.completedAt = new Date();
    await referral.save();

    res.json({ success: true, referral });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;


