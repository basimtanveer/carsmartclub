const express = require('express');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const { sendTransactionalEmail } = require('../services/emailService');
const { getMembershipActivationTemplate } = require('../services/emailTemplates');

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

    // Send membership activation email (async, don't wait for it)
    const membershipEmailHtml = getMembershipActivationTemplate(user.name, user.plan);
    sendTransactionalEmail(
      user.email,
      'Your Car Smart Club Membership is Now Active! ✅',
      membershipEmailHtml
    ).catch(err => console.error('Failed to send membership activation email:', err));

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






