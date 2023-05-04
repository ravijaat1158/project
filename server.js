import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./db/connectDb.js";
import Router from "./routes/getDataRoutes.js";
const app = express();
const PORT = process.env.PORT || 8080;

import path from "path";
import { fileURLToPath } from "url";

// config middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// console.log(path.join(__dirname));
app.use(express.static(path.join(__dirname, "./client/build")));

// Database connection
connectDB();

app.use("/api/v1", Router);

app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server Listening on Port ${PORT}`);
});
