import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './db/connectDb.js';
import dataModel from './models/dataModel.js';

const app = express();
const PORT = process.env.PORT || 8080; 

// config middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
dotenv.config();

// Database connection
connectDB();

app.get('/', (req, res) => { res.send("Homepage")});

app.listen(PORT, () => {
    console.log(`Server Listening on Port ${PORT}`);
})