const express = require('express');
const Diagnostic = require('../models/Diagnostic');
const Vehicle = require('../models/Vehicle');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(protect);

// @route   GET /api/diagnostics
// @desc    Get all diagnostics for user
// @access  Private
router.get('/', async (req, res) => {
  try {
    const diagnostics = await Diagnostic.find({ user: req.user._id })
      .populate('vehicle', 'make model year')
      .sort({ createdAt: -1 });
    res.json(diagnostics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/diagnostics/:id
// @desc    Get a single diagnostic
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const diagnostic = await Diagnostic.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate('vehicle', 'make model year vin');

    if (!diagnostic) {
      return res.status(404).json({ message: 'Diagnostic not found' });
    }

    res.json(diagnostic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/diagnostics
// @desc    Create a new diagnostic
// @access  Private
router.post('/', async (req, res) => {
  try {
    const { vin, vehicleId, results, summary, recommendations } = req.body;

    // Find vehicle if vehicleId provided
    let vehicle = null;
    if (vehicleId) {
      vehicle = await Vehicle.findOne({ _id: vehicleId, user: req.user._id });
      if (!vehicle) {
        return res.status(404).json({ message: 'Vehicle not found' });
      }
    }

    const diagnosticData = {
      user: req.user._id,
      vehicle: vehicle ? vehicle._id : null,
      vin: vin || (vehicle ? vehicle.vin : null),
      results: results || {},
      status: 'completed',
      summary: summary || 'Diagnostic completed',
      recommendations: recommendations || [],
    };

    const diagnostic = await Diagnostic.create(diagnosticData);
    res.status(201).json(diagnostic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;



