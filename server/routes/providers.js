const express = require('express');
const router = express.Router();
const Provider = require('../models/Provider');

// Get all providers
router.get('/', async (req, res) => {
  try {
    const { service, location, verified } = req.query;
    let query = {};

    if (service) {
      query.services = { $in: [new RegExp(service, 'i')] };
    }
    if (verified === 'true') {
      query.isVerified = true;
    }

    const providers = await Provider.find(query).sort({ rating: -1 });
    res.json(providers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single provider
router.get('/:id', async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id);
    if (!provider) {
      return res.status(404).json({ error: 'Provider not found' });
    }
    res.json(provider);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new provider (admin only in production)
router.post('/', async (req, res) => {
  try {
    const provider = new Provider(req.body);
    await provider.save();
    res.status(201).json(provider);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;



