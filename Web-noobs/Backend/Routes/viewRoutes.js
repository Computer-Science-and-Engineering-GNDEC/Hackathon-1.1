const express = require("express");
const viewsController = require("../Controllers/viewsController");
const authController = require("../Controllers/authController");

const router = express.Router();

router.use(authController.isLoggedIn);

router.get("/", authController.isLoggedIn, viewsController.getOverview);
router.get("/login", authController.isLoggedIn, viewsController.getLoginForm);
router.get("/signup", authController.isLoggedIn, viewsController.getSignupForm);

router.post(
  "/submit-user-data",
  authController.protect,
  viewsController.updateUserData
);
router.get("/me", authController.protect, viewsController.getMe);

router.get("/more-events", viewsController.moreQueries);

router.get(
  "/deleteEvent-admin",
  authController.isLoggedIn,
  viewsController.deleteQueryAdmin
);
router.get(
  "/deleteUser-admin",
  authController.isLoggedIn,
  viewsController.deleteUserAdmin
);

router.get(
  "/manage-users",
  authController.isLoggedIn,
  viewsController.manageUser
);

module.exports = router;
