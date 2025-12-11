const express = require('express');
const router = express.Router();
const Diagnostic = require('../models/Diagnostic');
const Vehicle = require('../models/Vehicle');
const auth = require('../middleware/auth');

// Get all diagnostics for a user
router.get('/', auth, async (req, res) => {
  try {
    const diagnostics = await Diagnostic.find({ userId: req.userId })
      .populate('vehicleId')
      .sort({ createdAt: -1 });
    res.json(diagnostics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single diagnostic
router.get('/:id', auth, async (req, res) => {
  try {
    const diagnostic = await Diagnostic.findOne({ _id: req.params.id, userId: req.userId })
      .populate('vehicleId');
    if (!diagnostic) {
      return res.status(404).json({ error: 'Diagnostic not found' });
    }
    res.json(diagnostic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new diagnostic
router.post('/', auth, async (req, res) => {
  try {
    const { vehicleId, vin, results, issues } = req.body;

    const diagnostic = new Diagnostic({
      vehicleId,
      userId: req.userId,
      vin,
      results,
      issues,
      status: 'completed',
    });

    await diagnostic.save();

    // Update vehicle status if vehicleId is provided
    if (vehicleId) {
      const vehicle = await Vehicle.findById(vehicleId);
      if (vehicle) {
        const hasCritical = issues?.some(issue => issue.severity === 'critical');
        const hasHigh = issues?.some(issue => issue.severity === 'high');
        
        if (hasCritical) {
          vehicle.status = 'Critical';
        } else if (hasHigh) {
          vehicle.status = 'Attention';
        } else {
          vehicle.status = 'OK';
        }
        
        vehicle.lastDiagnostic = new Date();
        vehicle.diagnosticResults = results;
        await vehicle.save();
      }
    }

    res.status(201).json(diagnostic);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;



