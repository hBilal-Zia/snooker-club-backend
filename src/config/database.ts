import mongoose from "mongoose";
import config from "./config";

export async function connectDB() {
    try {
        await mongoose.connect(config.dbUrl);
        console.log("Db Connected");
    } catch (error: any) {
        console.error(`Error Connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
}
