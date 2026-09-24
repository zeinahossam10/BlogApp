import express from "express";

import postRouter from "./routes/post_router.js";
import authRouter from "./routes/auth_router.js";
import commentRouter from "./routes/comment_router.js";
import likeRouter from "./routes/like_router.js";

import { errorHandler } from "./middleware/error_handler.js";

const app = express();

app.use(express.json());

app.use("/posts", postRouter);
app.use("/auth", authRouter);
app.use("/",commentRouter)
app.use("/", likeRouter);
// Error handler MUST be last
app.use(errorHandler);

export default app;