const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false,
  },
  phone: {
    type: String,
    trim: true,
  },
  zipCode: {
    type: String,
    trim: true,
  },
  ageRange: {
    type: String,
    enum: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
  },
  preferences: [{
    type: String,
  }],
  isMember: {
    type: Boolean,
    default: false,
  },
  memberSince: {
    type: Date,
  },
  plan: {
    type: String,
    enum: ['Free', 'Smart', 'Premium', 'Family'],
    default: 'Free',
  },
  loyaltyTier: {
    type: String,
    enum: ['Silver', 'Gold', 'Platinum'],
    default: 'Silver',
  },
  totalPoints: {
    type: Number,
    default: 0,
  },
  availablePoints: {
    type: Number,
    default: 0,
  },
  referralCode: {
    type: String,
    unique: true,
    sparse: true,
  },
  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  lastActivity: {
    type: Date,
    default: Date.now,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  welcomeEmailSent: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);


