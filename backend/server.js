const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const errorHandler = require("./middleware/error.js");
const connectDB = require("./config/db.js");
// For Heroku
const cors = require("cors");
const path = require("path");

// Load env variables
dotenv.config({ path: "./config/config.env" });

// Connect to database (MongoDB)
connectDB();

// Route files
const additions = require("./routes/addition.js");
const subtractions = require("./routes/subtraction.js");
const multiplications = require("./routes/multiplication.js");
const divisions = require("./routes/division.js");

const app = express();

app.use(cors());

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// Mount routers (append route to additions)
app.use("/api/v1/additions", additions);
app.use("/api/v1/subtractions", subtractions);
app.use("/api/v1/multiplications", multiplications);
app.use("/api/v1/divisions", divisions);

app.use(errorHandler);

app.use(express.static(path.join(__dirname, "../build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build"));
});

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
