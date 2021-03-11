const Query = require("../Models/queryModel");
const factory = require("./handleFactory");

exports.setUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllQueries = factory.getAll(Query);
exports.createQuery = factory.createOne(Query);
exports.getQuery = factory.getOne(Query);
exports.updateQuery = factory.updateOne(Query);
exports.deleteQuery = factory.deleteOne(Query);
