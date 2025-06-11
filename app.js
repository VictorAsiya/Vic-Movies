
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

// ✅ CORS Configuration
const allowedOrigins = [
  'http://localhost:5173',
  'https://vic-movies.vercel.app',
  'https://vic-movies-git-frontend-victor-asiyas-projects.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// ✅ Handle preflight OPTIONS requests
app.options('*', cors());

// ✅ Middleware
app.use(express.json());
app.use(morgan("dev"));

// ✅ Connect DB
connectDB();

// ✅ Test route
app.get("/", (req, res) => {
  res.json("Welcome to movie app web service...");
});

// ✅ Routes
app.use("/api", baseRouter);

module.exports = app;

