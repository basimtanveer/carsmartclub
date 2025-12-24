const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Clean MongoDB URI (remove extra spaces)
    const mongoUri = (process.env.MONGODB_URI || '').trim();
    
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    // Configure connection options with proper timeouts for production
    const options = {
      serverSelectionTimeoutMS: 30000, // 30 seconds - time to wait for server selection
      connectTimeoutMS: 30000, // 30 seconds - time to wait for initial connection
      socketTimeoutMS: 45000, // 45 seconds - time to wait for socket operations
      maxPoolSize: 10, // Maintain up to 10 socket connections
      minPoolSize: 5, // Maintain at least 5 socket connections
      maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
      retryWrites: true,
      retryReads: true,
    };

    // Note: useNewUrlParser and useUnifiedTopology are deprecated in mongoose 6+
    // They're no longer needed but won't cause issues if included
    
    const conn = await mongoose.connect(mongoUri, options);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error(`❌ MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected. Attempting to reconnect...');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnected');
    });

    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('Please check your MONGODB_URI in .env file');
    console.error('For MongoDB Atlas, ensure your IP is whitelisted');
    console.error('For local MongoDB, ensure the service is running');
    
    // In production, don't exit immediately - let the process manager handle it
    if (process.env.NODE_ENV === 'production') {
      // Log error but don't exit - allows for graceful shutdown or retry
      throw error;
    } else {
      process.exit(1);
    }
  }
};

module.exports = connectDB;






