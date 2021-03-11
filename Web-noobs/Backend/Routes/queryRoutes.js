const express = require("express");
const authController = require("../Controllers/authController");
const queryController = require("../Controllers/queryController");

const Router = express.Router({ mergeParams: true });

Router.use(authController.protect);

Router.route("/")
  .get(queryController.getAllQueries)
  .post(
    authController.protect,
    authController.restrictTo("user"),
    queryController.setUserIds,
    queryController.createQuery
  );

Router.route("/:id")
  .get(queryController.getQuery)
  .delete(
    authController.protect,
    authController.restrictTo("user", "admin"),
    queryController.deleteQuery
  )
  .patch(
    authController.protect,
    authController.restrictTo("user", "admin"),
    queryController.updateQuery
  );

module.exports = Router;
