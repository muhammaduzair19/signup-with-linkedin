import mongoose from "mongoose";
import { MONGODB_URI } from "../config/config.js";


const connectDB = async () => {
    
    try {
        const conn = await mongoose.connect(MONGODB_URI)
        console.log('\n MONGODB CONNECTED !! 🎉🎉🎉, DB HOST ON: ', conn.connection.host);
    } catch (error) {
        console.log('MONGODB CONNECTION FAILED', error);
        process.exit(1);
    }
}

export default connectDB;