// lib/mongodb.js
import mongoose from 'mongoose';

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.db;
  }
  
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
    return mongoose.connection.db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error(`Error connecting to MongoDB: ${error.message}`);
  }
  
};

export default connectToDatabase;
