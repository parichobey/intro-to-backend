import express from "express";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";

const app = express();

app.use(express.json());

// Routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

// Health check root route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Backend API is running!"
    });
});

export default app;
