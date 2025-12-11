const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get member status
router.get('/status', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({
      isMember: user.isMember,
      memberSince: user.memberSince,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Join as member
router.post('/join', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user.isMember) {
      user.isMember = true;
      user.memberSince = new Date();
      await user.save();
    }
    res.json({
      isMember: user.isMember,
      memberSince: user.memberSince,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;



