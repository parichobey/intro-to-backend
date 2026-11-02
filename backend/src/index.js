import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";

dotenv.config({
    path: "./.env"
});

const startServer = async () => {
    try {
        console.log("MONGODB_URI:", process.env.MONGODB_URI);
        await connectDB();

        app.on("error", (error) => {
            console.log("App error: ", error);
            throw error;
        });

        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => {
            console.log(`\n🚀 Server is running at port : ${PORT}`);
            console.log(`👉 Local URL: http://localhost:${PORT}`);
        });
    } catch (err) {
        console.log("MONGO db connection failed !!! ", err);
    }
};

startServer();
