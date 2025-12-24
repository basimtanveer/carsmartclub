const express = require('express');
const Deal = require('../models/Deal');
const Provider = require('../models/Provider');

const router = express.Router();

// @route   GET /api/deals
// @desc    Get all active deals
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, memberExclusive } = req.query;
    let query = { isActive: true };

    if (category) {
      query.category = category;
    }

    if (memberExclusive === 'true') {
      query.isMemberExclusive = true;
    }

    // Filter out expired deals
    query.$or = [
      { validUntil: { $gte: new Date() } },
      { validUntil: null },
    ];

    const deals = await Deal.find(query)
      .populate('provider', 'name rating reviewCount address')
      .sort({ createdAt: -1 });

    res.json(deals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/deals/:id
// @desc    Get a single deal
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id)
      .populate('provider', 'name email phone address services rating reviewCount website');

    if (!deal) {
      return res.status(404).json({ message: 'Deal not found' });
    }

    res.json(deal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;





