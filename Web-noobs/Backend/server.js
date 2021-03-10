//Requirements

const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

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
