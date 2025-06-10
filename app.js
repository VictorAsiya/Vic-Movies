
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const baseRouter = require('./routes');
const morgan = require('morgan');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"))

// Connect DB
connectDB();

app.get("/", (req,res) => {
    res.json("Welcome to movie app web service...")
})

// Routes
app.use("/api",baseRouter);

module.exports = app;
