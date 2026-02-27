import mongoose from 'mongoose';
import 'dotenv/config'


const connectDB = async () => {
    try {

        const uri = process.env.MONGO_URI;

        if (!uri) {
            throw new Error("MONGO_URI is missing from .env file!")
        }

        await mongoose.connect(uri)
        console.log("Database is Connected Successfully");
    } catch (error) {
        console.error("Database conncetion failed: ",error.message);
    }
}

export default connectDB;