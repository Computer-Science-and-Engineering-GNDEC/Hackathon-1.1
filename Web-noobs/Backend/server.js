//Requirements

const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! ....Shutting down");
  process.exit(1);
});

//Database Connection
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    family: 4,
    serverSelectionTimeoutMS: 30000,
  })
  .then(() => console.log("DB connection successful"));

//Server

const port = process.env.PORT || 1111;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! ....Shutting down");
  server.close(() => {
    process.exit(1);
  });
});
process.on("SIGTERM", () => {
  console.log("SIGTERM recieved.Shutting down gracefully");
  server.close(() => {
    console.log("Process Terminated!");
  });
});
