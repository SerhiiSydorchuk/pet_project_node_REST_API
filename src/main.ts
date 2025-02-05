import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { config } from "./configs/config";
import { ApiError } from "./errors/api.errror";
import { authRouter } from "./routers/auth.router";
import { postsRouter } from "./routers/posts.router";
import { userRouter } from "./routers/user.router";

const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/posts", postsRouter);

app.use(express.urlencoded({ extended: true }));
app.use(
  "*",
  (error: ApiError, req: Request, res: Response, next: NextFunction) => {
    const status = error.status ?? 500;
    const message = error.message ?? "Something went wrong";

    res.status(status).json({ status, message });
  },
);

app.listen(config.port, async () => {
  await mongoose.connect(config.mongooseUri);
  console.log(`Server has been started on PORT ${config.port}`);
});
