import mongoose from "mongoose";

const connectDB = async (retries = 3, delayMs = 3000) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            console.log(`⏳ Connecting to MongoDB Atlas (Attempt ${attempt}/${retries})...`);
            const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
                serverSelectionTimeoutMS: 10000,
            });
            console.log(`\n✅ MongoDB connected successfully! DB HOST: ${connectionInstance.connection.host}`);
            return connectionInstance;
        } catch (error) {
            console.log(`⚠️ Attempt ${attempt} failed: ${error.message}`);
            if (attempt === retries) {
                console.error("❌ MongoDB connection failed after all retries.");
                process.exit(1);
            }
            console.log(`🔄 Retrying in ${delayMs / 1000} seconds...`);
            await new Promise((resolve) => setTimeout(resolve, delayMs));
        }
    }
};

export default connectDB;
