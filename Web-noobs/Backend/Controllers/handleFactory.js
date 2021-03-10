const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Email = require("../utils/email");
const User = require("../Models/userModels");

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError("No doc found with this ID", 404));
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError("No document found with this ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const url = `${req.protocol}://${req.get("host")}/more-events`;
    const message = "";
    const users = await User.find();
    const doc = await Model.create(req.body);
    // eslint-disable-next-line no-plusplus
    res.status(201).json({
      status: "success",
      data: {
        events: doc,
      },
    });
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      // eslint-disable-next-line no-await-in-loop
      await new Email(user, url, message).sendNotice();
    }
  });

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);
    if (!doc) {
      return next(new AppError("No document found with this ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
  });
