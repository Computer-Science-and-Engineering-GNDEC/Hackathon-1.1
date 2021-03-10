const express = require("express");
const app = express();

//Requiremnets

const AppError = require("./util/appError");
const globalErrorHandler = require("./Controllers/errorController");
const userRouter = require("./Routes/userRoutes");
const queryRouter = require("./Routes/userRoutes");
const viewRouter = require("./Routes/userRoutes");

//Middlewares
app.use("/", viewRouter);
app.use("/api/v1/queries", queryRouter);
app.use("/api/v1/users", userRouter);
// Handling Unhandled routes

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server`,
  });
});

app.use(globalErrorHandler);

module.exports = app;
