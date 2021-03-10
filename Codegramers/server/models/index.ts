import mongoose from 'mongoose';

mongoose.set('debug', true);

mongoose.Promise = Promise;

const DB_URI = process.env.DB_URI;

if (!DB_URI) throw 'No Databse URI specified!!';

mongoose
  .connect(DB_URI, {
    keepAlive: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log(`connected to mongo DB`))
  .catch(e => console.log(e));

module.exports.Student = require('./student');
