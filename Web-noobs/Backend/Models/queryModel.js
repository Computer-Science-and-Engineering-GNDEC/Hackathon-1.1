const mongoose = require("mongoose");
const validator = require("validator");

const querySchema = new mongoose.Schema({
  query: {
    type: String,
    required: [true, "Please type in your query here!!"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Review must belong to a user"],
  },
  title: {
    type: String,
    required: [true, "Please give a title to the query"],
  },
  branch: {
    type: String,
    lowercase: true,
    required: [
      true,
      "Please mention the Department to which your query is related!! ",
    ],
  },

  tags: {
    type: Array,
    required: [true, "Please Choose atleast 2 tags for your query!!"],
  },
});

const Query = mongoose.model("Query", querySchema);
module.exports = Query;
