import mongoose from "mongoose";
import 'dotenv/config';

const URI = process.env.MONGO_URI;

async function connectDB() {
    await mongoose.connect(URI)
    console.log("Database is connected Successfully")
}

export default connectDB;