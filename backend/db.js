import mongoose from 'mongoose';


const mongoURI = process.env.ATLAS_URI || 'mongodb+srv://shansalia367:5lPjImoutJCBSk6z@cluster0.7tqty.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Default to local MongoDB if no URI is provided

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Establish connection to MongoDB
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed', error);
    process.exit(1);  // Exit the process if unable to connect
  }
};

// Export the connectDB function
export default connectDB;
