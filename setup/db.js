require("dotenv").config();
const mongoose = require("mongoose");

module.exports = () => {
  const dbConnection = process.env.DB_CONNECTION_LOCAL;
  mongoose.connect(
    dbConnection,
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
