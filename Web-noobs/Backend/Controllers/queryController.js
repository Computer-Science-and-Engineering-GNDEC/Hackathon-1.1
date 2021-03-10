const Query = require("../Models/queryModel");
const factory = require("./handlerFactory");

exports.getAllQueries = factory.getAll(Query);
exports.createQuery = factory.createOne(Query);
exports.getQuery = factory.getOne(Query);
exports.updateQuery = factory.updateOne(Query);
exports.deleteQuery = factory.deleteOne(Query);
