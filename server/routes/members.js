const express = require('express');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/members/status
// @desc    Get member status
// @access  Private
router.get('/status', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({
      isMember: user.isMember,
      memberSince: user.memberSince,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/members/join
// @desc    Join as member
// @access  Private
router.post('/join', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user.isMember) {
      return res.status(400).json({ message: 'User is already a member' });
    }

    user.isMember = true;
    user.memberSince = new Date();
    await user.save();

    res.json({
      isMember: user.isMember,
      memberSince: user.memberSince,
      message: 'Successfully joined Car Smart Club!',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;





