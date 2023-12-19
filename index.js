const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const dataRoute = require("./src/routes/DataRoute");
const userRoute = require("./src/routes/UserRoute");
const categoryRoute = require("./src/routes/CategoryRoute");
const morgan = require("morgan");
const errorHandler = require("./src/utils/ErrorHandler");

require("dotenv").config();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(morgan("dev"));
const PORT = process.env.PORT || 3127;
app.use(bodyParser.json());
app.use(cookieParser());
mongoose.set("strictQuery", false);

// Connect to the MongoDB database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error Connecting MongoDB", error);
    process.exit(1);
  }
};

// Define the CRUD routes
app.get("/", (req, res) => {
  res.send("Welcome to the API Homepage!");
});
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
// Create a new data model
app.use("/api/v1.0/data", dataRoute);
app.use("/api/v1.0/user", userRoute);
app.use("/api/v1.0/category", categoryRoute);
app.all("*", (req, res) => {
  res.status(400).json({
    error: `${req.originalUrl} [${req.method}] is not found in this server`,
  });
});

app.use(errorHandler);

//Connect to the database before listening
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
});
