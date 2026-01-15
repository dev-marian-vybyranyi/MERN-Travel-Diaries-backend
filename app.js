import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routing/user-routes.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use("/user", userRouter);

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
