import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import postRouter from "./routing/post-routes";
import userRouter from "./routing/user-routes";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/posts", postRouter);

mongoose
  .connect(
    `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.5whbtes.mongodb.net/?appName=Cluster0`
  )
  .then(() =>
    app.listen(3000, () =>
      console.log("Connection Succesfull  & Listening to localhost Port 3000")
    )
  )
  .catch((err) => console.log(err));
