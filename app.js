import express from "express";
const app = express();
const PORT = 3000;

app.use("/", (req, res, next) => {
  res.send("Welcome to Travel Diaries");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
