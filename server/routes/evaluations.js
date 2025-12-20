const express = require('express');
const Evaluation = require('../models/Evaluation');
const Vehicle = require('../models/Vehicle');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

// @route   GET /api/evaluations
// @desc    Get user's evaluations
// @access  Private
router.get('/', async (req, res) => {
  try {
    const evaluations = await Evaluation.find({ user: req.user._id })
      .populate('vehicle', 'make model year')
      .sort({ createdAt: -1 });
    res.json(evaluations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/evaluations/:id
// @desc    Get a single evaluation
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const evaluation = await Evaluation.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate('vehicle');

    if (!evaluation) {
      return res.status(404).json({ message: 'Evaluation not found' });
    }

    res.json(evaluation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/evaluations
// @desc    Create a new evaluation
// @access  Private
router.post('/', async (req, res) => {
  try {
    const evaluationData = {
      ...req.body,
      user: req.user._id,
    };

    // If vehicle ID provided, populate vehicle data
    if (req.body.vehicleId) {
      const vehicle = await Vehicle.findOne({
        _id: req.body.vehicleId,
        user: req.user._id,
      });
      if (vehicle) {
        evaluationData.vehicle = vehicle._id;
        evaluationData.vin = vehicle.vin || evaluationData.vin;
        evaluationData.year = vehicle.year || evaluationData.year;
        evaluationData.make = vehicle.make || evaluationData.make;
        evaluationData.model = vehicle.model || evaluationData.model;
        evaluationData.mileage = vehicle.mileage || evaluationData.mileage;
      }
    }

    const evaluation = await Evaluation.create(evaluationData);
    res.status(201).json(evaluation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/evaluations/:id/calculate
// @desc    Calculate market value and recommendations
// @access  Private
router.post('/:id/calculate', async (req, res) => {
  try {
    const evaluation = await Evaluation.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!evaluation) {
      return res.status(404).json({ message: 'Evaluation not found' });
    }

    // Simulate API calls to KBB, Edmunds, etc.
    // In production, these would be real API calls
    const baseValue = 15000; // This would come from actual API
    const conditionMultiplier = {
      'Excellent': 1.0,
      'Good': 0.9,
      'Fair': 0.75,
      'Needs Work': 0.6,
    };

    const multiplier = conditionMultiplier[evaluation.condition] || 0.8;
    const adjustedValue = baseValue * multiplier;

    // Calculate market value ranges
    const marketValue = {
      min: Math.floor(adjustedValue * 0.85),
      max: Math.floor(adjustedValue * 1.15),
    };

    const tradeInEstimate = {
      min: Math.floor(adjustedValue * 0.7),
      max: Math.floor(adjustedValue * 0.85),
    };

    const privateSaleEstimate = {
      min: Math.floor(adjustedValue * 0.9),
      max: Math.floor(adjustedValue * 1.1),
    };

    const dealerRetailValue = {
      min: Math.floor(adjustedValue * 1.1),
      max: Math.floor(adjustedValue * 1.3),
    };

    // Calculate Car Smart Score
    const carSmartScore = Math.floor(
      (evaluation.condition === 'Excellent' ? 90 :
       evaluation.condition === 'Good' ? 75 :
       evaluation.condition === 'Fair' ? 60 : 45) +
      (evaluation.mileage < 50000 ? 10 : evaluation.mileage < 100000 ? 5 : 0)
    );

    // Determine recommended action
    let recommendedAction = evaluation.purpose || 'Keep';
    if (!evaluation.purpose) {
      // Logic to determine best action based on value, condition, etc.
      if (evaluation.mileage > 150000) {
        recommendedAction = 'Sell';
      } else if (evaluation.condition === 'Needs Work') {
        recommendedAction = 'Trade';
      }
    }

    // Update evaluation with calculated values
    evaluation.marketValue = marketValue;
    evaluation.tradeInEstimate = tradeInEstimate;
    evaluation.privateSaleEstimate = privateSaleEstimate;
    evaluation.dealerRetailValue = dealerRetailValue;
    evaluation.carSmartScore = carSmartScore;
    evaluation.recommendedAction = recommendedAction;
    evaluation.ownershipCost = Math.floor(adjustedValue * 0.15); // Estimated annual cost
    evaluation.bestTimeToSell = 'Within 6 months'; // Could be calculated based on market trends

    await evaluation.save();

    res.json(evaluation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/evaluations/:id/generate-report
// @desc    Generate PDF report
// @access  Private
router.post('/:id/generate-report', async (req, res) => {
  try {
    const evaluation = await Evaluation.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate('vehicle');

    if (!evaluation) {
      return res.status(404).json({ message: 'Evaluation not found' });
    }

    // In production, generate actual PDF using library like pdfkit or puppeteer
    // For now, mark as generated
    evaluation.reportGenerated = true;
    evaluation.reportUrl = `/reports/${evaluation._id}.pdf`; // Would be actual URL
    await evaluation.save();

    res.json({
      success: true,
      reportUrl: evaluation.reportUrl,
      message: 'Report generated successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;



