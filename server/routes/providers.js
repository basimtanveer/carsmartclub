const express = require('express');
const Provider = require('../models/Provider');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/providers
// @desc    Get all providers
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { city, service, verified } = req.query;
    let query = {};

    if (city) {
      query['address.city'] = new RegExp(city, 'i');
    }

    if (service) {
      query.services = { $in: [new RegExp(service, 'i')] };
    }

    if (verified === 'true') {
      query.isVerified = true;
    }

    const providers = await Provider.find(query).sort({ rating: -1, reviewCount: -1 });
    res.json(providers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/providers/:id
// @desc    Get a single provider
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id);

    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    res.json(provider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/providers
// @desc    Create a new provider (Admin only - add admin check in production)
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const provider = await Provider.create(req.body);
    res.status(201).json(provider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;


