import mongoose from "mongoose";
import { config } from "./config.js";
 
 const connectDB = async ()=>{
    const mongoUrl = config.MONGO_URI;

    await mongoose.connect(mongoUrl);
    console.log("MongoDB connected");
}

export default connectDB;

