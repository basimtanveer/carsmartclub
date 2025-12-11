const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');
const auth = require('../middleware/auth');

// Get all vehicles for a user
router.get('/', auth, async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ userId: req.userId });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single vehicle
router.get('/:id', auth, async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({ _id: req.params.id, userId: req.userId });
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new vehicle
router.post('/', auth, async (req, res) => {
  try {
    const vehicle = new Vehicle({
      ...req.body,
      userId: req.userId,
    });
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a vehicle
router.put('/:id', auth, async (req, res) => {
  try {
    const vehicle = await Vehicle.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    res.json(vehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a vehicle
router.delete('/:id', auth, async (req, res) => {
  try {
    const vehicle = await Vehicle.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    res.json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;



