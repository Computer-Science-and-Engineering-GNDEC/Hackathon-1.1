const express = require("express");
const authController = require("../Controllers/authController");

const Router = express.Router();

const queryController = require("../Controllers/queryController");
// eslint-disable-next-line no-unused-vars
const { router } = require("../app");

//.route('/weekly-events/:year').get(eventController.getWeeklyEvents);

Router.route("/").get(queryController.getAllQueries).post(
  // authController.protect,
  // authController.restrictTo("admin"),
  queryController.createQuery
);

Router.route("/:id")
  .get(queryController.getQuery)
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    queryController.deleteQuery
  )
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    queryController.updateQuery
  );

module.exports = Router;
