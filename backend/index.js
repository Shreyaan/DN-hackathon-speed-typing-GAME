// Deployed Version: https://typing-game-ashen.vercel.app/

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { connectToDB } = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const scoreRoutes = require("./routes/scoreboardRoutes");

const port = process.env.PORT;

const app = express();
connectToDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV === "development") {
  const logger = require("morgan");
  app.use(logger("dev"));
}

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/score", scoreRoutes);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
