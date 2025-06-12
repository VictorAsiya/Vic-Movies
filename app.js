// ORIGINAL
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

const prodOrigin = [process.env.APP_URL]
const allowedOrigins = process.env.NODE_ENV = 'production'
app.use(cors({
    origin:(origin, callback)=>{
        if(alloweOrigins.includes(origin)){
            console.log(origin, allowedOrigins)
            callback(null, true);
        }else{
            callback(new Error('not allowed by CORS'))
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'UPDATE', 'DELETE'],
}))

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

module.exports = app



// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./config/db');
// const baseRouter = require('./routes');
// const morgan = require('morgan');
// const app = express();

// // ✅ CORS setup
// const corsOptions = {
//   origin: "https://vic-movies.vercel.app",
//   credentials: true,
// };

// app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));

// // Middleware
// app.use(express.json());
// app.use(morgan("dev"));

// // Connect DB
// connectDB();

// app.get("/", (req, res) => {
//   res.json("Welcome to movie app web service...");
// });

// // Routes
// app.use("/api", baseRouter);

// module.exports = app;





// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");
// const baseRouter = require("./routes");
// const morgan = require("morgan");

// const app = express();

// // ✅ Safer CORS Configuration using a function
// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://vic-movies.vercel.app",
//   "https://vic-movies-git-frontend-victor-asiyas-projects.vercel.app",
// ];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("CORS not allowed"));
//     }
//   },
//   credentials: true,
// };

// app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));

// // ✅ Middleware
// app.use(express.json());
// app.use(morgan("dev"));

// // ✅ Connect DB
// connectDB();

// // ✅ Test Route
// app.get("/", (req, res) => {
//   res.json("Welcome to movie app web service...");
// });

// // ✅ Routes
// app.use("/api", baseRouter);

// module.exports = app;
