require("dotenv").config();
const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(
    process.env.DB_CONNECTION_LOCAL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    },
    () => {
      console.log("Connected to DB!");
    }
  );
};
