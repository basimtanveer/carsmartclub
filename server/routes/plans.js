const express = require('express');
const Plan = require('../models/Plan');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/plans
// @desc    Get all plans
// @access  Public
router.get('/', async (req, res) => {
  try {
    const plans = await Plan.find({ isActive: true }).sort({ price: 1 });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/plans/:name
// @desc    Get a specific plan
// @access  Public
router.get('/:name', async (req, res) => {
  try {
    const plan = await Plan.findOne({ name: req.params.name, isActive: true });
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/plans/upgrade
// @desc    Upgrade user's plan
// @access  Private
router.post('/upgrade', protect, async (req, res) => {
  try {
    const { planName } = req.body;

    const plan = await Plan.findOne({ name: planName, isActive: true });
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    const user = await User.findById(req.user._id);
    
    // Check if user already has this plan or higher
    const planHierarchy = { 'Free': 0, 'Smart': 1, 'Premium': 2, 'Family': 3 };
    if (planHierarchy[user.plan] >= planHierarchy[planName]) {
      return res.status(400).json({ message: 'You already have this plan or higher' });
    }

    // Update user's plan
    user.plan = planName;
    await user.save();

    res.json({
      success: true,
      plan: planName,
      message: `Successfully upgraded to ${planName} plan`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

