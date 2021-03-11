//Express App
const express = require("express");
const app = express();

//Requiremnets
const path = require("path");
const AppError = require("./util/appError");
const globalErrorHandler = require("./Controllers/errorController");
const userRouter = require("./Routes/userRoutes");
const queryRouter = require("./Routes/queryRoutes");
const viewRouter = require("./Routes/viewRoutes");

//Middlewares
app.use(express.json());
app.use("/", viewRouter);
app.use("/api/v1/queries", queryRouter);
app.use("/api/v1/users", userRouter);

app.enable("trust proxy");
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");
//serving static files
app.set("views", path.join(__dirname, "Views"));
// Handling Unhandled routes

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server`,
  });
});

app.use(globalErrorHandler);

module.exports = app;
