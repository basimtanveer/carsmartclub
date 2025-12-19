const express = require('express');
const Reward = require('../models/Reward');
const Point = require('../models/Point');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/rewards
// @desc    Get all available rewards
// @access  Public (but user context helps)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let query = { isActive: true };

    if (category) {
      query.category = category;
    }

    const rewards = await Reward.find(query).populate('provider', 'name rating').sort({ pointsRequired: 1 });
    res.json(rewards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/rewards/:id
// @desc    Get a single reward
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const reward = await Reward.findById(req.params.id).populate('provider');
    if (!reward) {
      return res.status(404).json({ message: 'Reward not found' });
    }
    res.json(reward);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/rewards/:id/redeem
// @desc    Redeem a reward
// @access  Private
router.post('/:id/redeem', protect, async (req, res) => {
  try {
    const reward = await Reward.findById(req.params.id);
    if (!reward || !reward.isActive) {
      return res.status(404).json({ message: 'Reward not available' });
    }

    // Check redemption limit
    if (reward.redemptionLimit && reward.redemptionCount >= reward.redemptionLimit) {
      return res.status(400).json({ message: 'Reward redemption limit reached' });
    }

    // Check user's available points
    const availablePoints = await Point.aggregate([
      {
        $match: {
          user: req.user._id,
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

    const userPoints = availablePoints[0]?.total || 0;

    if (userPoints < reward.pointsRequired) {
      return res.status(400).json({ 
        message: 'Insufficient points',
        required: reward.pointsRequired,
        available: userPoints,
      });
    }

    // Redeem points
    const pointsToRedeem = reward.pointsRequired;
    const point = await Point.create({
      user: req.user._id,
      amount: -pointsToRedeem,
      type: 'redeemed',
      source: 'redemption',
      description: `Redeemed ${reward.name}`,
      status: 'redeemed',
    });

    // Update user's available points
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { availablePoints: -pointsToRedeem },
      lastActivity: new Date(),
    });

    // Update reward redemption count
    await Reward.findByIdAndUpdate(req.params.id, {
      $inc: { redemptionCount: 1 },
    });

    res.json({
      success: true,
      reward,
      pointsRedeemed: pointsToRedeem,
      remainingPoints: userPoints - pointsToRedeem,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;


