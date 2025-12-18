const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Clean MongoDB URI (remove extra spaces)
    const mongoUri = (process.env.MONGODB_URI || 'mongodb://localhost:27017/carsmartclub').trim();
    
    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('Please check your MONGODB_URI in .env file');
    process.exit(1);
  }
};

module.exports = connectDB;

