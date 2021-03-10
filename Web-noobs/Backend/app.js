const express = require("express");
const app = express();

//Requiremnets

const AppError = require("./util/appError");
const globalErrorHandler = require("./Controllers/errorController");
// Handling Unhandled routes

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server`,
  });
});

app.use(globalErrorHandler);

module.exports = app;
