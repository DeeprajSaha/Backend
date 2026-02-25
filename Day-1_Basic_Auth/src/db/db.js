import mongoose from "mongoose";
import 'dotenv/config';

const URI = process.env.MONGO_URI;

async function connectDB() {
    try {
        await mongoose.connect(URI)
        console.log("Database is connected Successfully")
    } catch(error) {
        console.error("Database connection failed: ", error.message);
    }
}

export default connectDB;