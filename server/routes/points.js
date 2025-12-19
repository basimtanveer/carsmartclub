const express = require('express');
const Point = require('../models/Point');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

// @route   GET /api/points
// @desc    Get user's points history
// @access  Private
router.get('/', async (req, res) => {
  try {
    const { status, type } = req.query;
    let query = { user: req.user._id };

    if (status) {
      query.status = status;
    }
    if (type) {
      query.type = type;
    }

    const points = await Point.find(query).sort({ createdAt: -1 }).limit(100);
    
    // Calculate totals
    const totals = await Point.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: '$status',
          total: { $sum: '$amount' },
        },
      },
    ]);

    res.json({
      points,
      totals: totals.reduce((acc, curr) => {
        acc[curr._id] = curr.total;
        return acc;
      }, {}),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/points/balance
// @desc    Get user's current points balance
// @access  Private
router.get('/balance', async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    // Calculate available points (not expired, not redeemed)
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

    res.json({
      totalPoints: user.totalPoints || 0,
      availablePoints: availablePoints[0]?.total || 0,
      pointsValue: (availablePoints[0]?.total || 0) / 50, // 50 points = $1
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/points/earn
// @desc    Earn points (internal use, called by other routes)
// @access  Private
router.post('/earn', async (req, res) => {
  try {
    const { amount, source, description, purchaseAmount, multiplier = 1 } = req.body;

    const pointsToAward = Math.floor((purchaseAmount || amount) * multiplier);

    const point = await Point.create({
      user: req.user._id,
      amount: pointsToAward,
      type: 'earned',
      source: source || 'purchase',
      description: description || `Earned ${pointsToAward} points`,
      purchaseAmount: purchaseAmount || amount,
      multiplier,
    });

    // Update user's total points
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { totalPoints: pointsToAward, availablePoints: pointsToAward },
      lastActivity: new Date(),
    });

    res.json(point);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;


