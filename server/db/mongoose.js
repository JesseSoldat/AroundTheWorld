const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const connectToDb = io =>
  mongoose
    .connect(
      process.env.MONGO_URI,
      { useNewUrlParser: true }
    )
    .then(() => {
      // console.log("DB connected");
    })
    .catch(err => {
      console.log("DB error: ", err);
    });

module.exports = connectToDb;
