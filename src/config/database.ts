import mongoose from "mongoose";
import config from "./config";

export async function connectDB() {
    try {
        await mongoose.connect(config.dbUrl)
        console.log("Db Connected")
    } catch (error: any) {
        console.log(`Error Connecting to MongoDB, Error: ${error.message}`)
        
    }
}
