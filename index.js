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
    origin: "https://e-pedika.vercel.app",
    credentials: true,
  })
);
app.use(morgan("dev"));
const port = process.env.PORT || 3127;
app.use(bodyParser.json());
app.use(cookieParser());
mongoose.set("strictQuery", false);

// Connect to the MongoDB database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
    console.error("Error Connecting MongoDB", error);
  });

// Define the CRUD routes
app.get("/", (req, res) => {
  res.send("Welcome to the API Homepage!");
});
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
// Create a new data model
app.use("/api/data", dataRoute);
app.use("/api/user", userRoute);
app.use("/api/category", categoryRoute);
app.all("*", (req, res) => {
  res.status(400).json({
    error: `${req.originalUrl} [${req.method}] is not found in this server`,
  });
});

app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
