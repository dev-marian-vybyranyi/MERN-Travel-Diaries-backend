import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = 3000;
dotenv.config();

mongoose.set("strictQuery", false);
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.5whbtes.mongodb.net/travel-diaries?retryWrites=true&w=majority`
  )
  .then(() =>
    app.listen(PORT, () =>
      console.log(
        `Connection Succesfull  & Listening to localhost Port ${PORT}`
      )
    )
  )
  .catch((err) => console.log(err));
