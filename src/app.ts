import express from "express";
import postRouter from "./routes/post_router.js";
const app = express();
app.use(express.json());
app.use("/api/posts", postRouter);

export default app;