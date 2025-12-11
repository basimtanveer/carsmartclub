const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: function() {
      return this.provider === 'local';
    },
  },
  name: {
    type: String,
    required: true,
  },
  isMember: {
    type: Boolean,
    default: false,
  },
  memberSince: {
    type: Date,
  },
  provider: {
    type: String,
    enum: ['local', 'google', 'facebook'],
    default: 'local',
  },
  vehicles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
  }],
}, {
  timestamps: true,
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);



