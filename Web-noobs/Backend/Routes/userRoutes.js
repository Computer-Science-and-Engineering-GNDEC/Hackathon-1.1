const express = require("express");

const Router = express.Router();

const authController = require("../Controllers/authController");

Router.post("/signup", authController.signup);
Router.get("/verifyEmail/:token", authController.verifyEmail);
Router.post("/login", authController.login);
Router.get("/logout", authController.logout);

module.exports = Router;
