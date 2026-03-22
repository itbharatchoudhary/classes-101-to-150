import mongoose from "mongoose";

/**
 * Establish MongoDB database connection
 * @returns {Promise<void>}
 */
const connectDB = async () => {
  try {
    // Validate MongoDB URI before connecting
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    // Connect to MongoDB with modern options
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Log successful database connection
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    // Log error without exposing sensitive details
    console.error("Database connection failed");

    // Exit process for critical failure
    process.exit(1);
  }
};

export default connectDB;