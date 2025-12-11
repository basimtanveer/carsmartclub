const express = require('express');
const router = express.Router();
const Deal = require('../models/Deal');

// Get all active deals
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

    const deals = await Deal.find(query)
      .populate('providerId')
      .sort({ createdAt: -1 });
    res.json(deals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single deal
router.get('/:id', async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id).populate('providerId');
    if (!deal) {
      return res.status(404).json({ error: 'Deal not found' });
    }
    res.json(deal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;



