import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
const app = express();

dotenv.config();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());

const url = process.env.CONNECTION_URL.replace(
  "<password>",
  process.env.PASSWORD
);

const port = process.env.PORT || 8000;

mongoose.connect(url).catch((err) => console.log(`ERROR TO CONNECT - ${err}`));

app.listen(port, (req, res) => {
  console.log(`Connection to ${port}`);
});
