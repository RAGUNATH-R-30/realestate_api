const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const userRouter = require("./routes/userRoutes");
const propertyRouter = require('./routes/propertyRoutes')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/property",propertyRouter)
module.exports = app;
