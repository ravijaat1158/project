import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./db/connectDb.js";
import Router from "./routes/getDataRoutes.js";
const app = express();
const PORT = process.env.PORT || 8080;

// config middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
dotenv.config();

// Database connection
connectDB();

app.use("/api/v1", Router);

app.listen(PORT, () => {
  console.log(`Server Listening on Port ${PORT}`);
});
