import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully!");
    } catch (error) {
        console.log(`Database connection error: ${error.message}!`);
        process.exit(1);
    }
}

export default dbConnect;
