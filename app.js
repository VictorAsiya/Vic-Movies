
// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./config/db');
// const baseRouter = require('./routes');
// const morgan = require('morgan');
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(morgan("dev"))

// // Connect DB
// connectDB();

// app.get("/", (req,res) => {
//     res.json("Welcome to movie app web service...")
// })

// // Routes
// app.use("/api",baseRouter);

// module.exports = app;



require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const baseRouter = require('./routes');
const morgan = require('morgan');

const app = express();

// ✅ Proper CORS setup for Vercel frontend
const allowedOrigins = [
  'http://localhost:5173', // for local development
  'https://vic-movies.vercel.app' // your live frontend on Vercel
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Connect DB
connectDB();

// Default route
app.get("/", (req, res) => {
  res.json("Welcome to movie app web service...");
});

// Routes
app.use("/api", baseRouter);

module.exports = app;
