import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    // For WebContainer environment, we'll use MongoDB memory server or local connection
    console.log('Mongo URI:', process.env.MONGODB_URI);

    const mongoUri = process.env.MONGODB_URI ;
    
    const conn = await mongoose.connect(mongoUri);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    
    // If MongoDB connection fails, we'll continue without it for now
    console.log('⚠️  Continuing without database connection...');
    console.log('💡 To fix this, ensure MongoDB is running or update MONGODB_URI in .env');
    
    // Don't throw the error - let the server continue running
    return null;
  }
};

export default connectDB;