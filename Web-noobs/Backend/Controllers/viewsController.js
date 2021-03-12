const Query = require("../Models/queryModel");
const User = require("../Models/userModel");

const catchAsync = require("../util/catchAsync");

exports.getOverview = catchAsync(async (req, res, next) => {
  const events = await (await Query.find()).reverse();
  res.status(200).render("overview", {
    title: "Upcoming events",
    events,
  });
});

exports.getLoginForm = catchAsync(async (req, res) => {
  res.status(200).render("login", {
    title: "Log into your account",
  });
});

exports.getSignupForm = catchAsync(async (req, res) => {
  res.status(200).render("signup", {
    title: "Register your account",
  });
});

exports.getMe = catchAsync(async (req, res) => {
  res.status(200).render("account", {
    title: "My account",
  });
});

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).render("account", {
    title: "My account",
    user: updatedUser,
  });
});

exports.manageQueries = catchAsync(async (req, res, next) => {
  const queries = await (await Query.find()).reverse();
  res.status(200).render("manage-queries", {
    title: "Manage-queries",
    queries,
  });
});
exports.moreQueries = catchAsync(async (req, res, next) => {
  const events = await (await Query.find()).reverse();
  res.status(200).render("more-queries", {
    title: "More Queries",
    events,
  });
});

exports.createQuery = catchAsync(async (req, res) => {
  res.status(200).render("createQuery", {
    title: "Post a query",
  });
});

exports.manageUser = catchAsync(async (req, res) => {
  const users = await (await User.find({ role: "user" })).sort();
  res.status(200).render("manageUsers", {
    title: "Manage-user",
    users,
  });
});

exports.deleteQueryAdmin = catchAsync(async (req, res) => {
  res.status(200).render("deleteQuery-Admin", {
    title: "Delete a Query",
  });
});

exports.deleteUserAdmin = catchAsync(async (req, res) => {
  res.status(200).render("deleteUser-Admin", {
    title: "Delete an User",
  });
});
