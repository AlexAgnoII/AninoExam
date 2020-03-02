const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boardSchema = new Schema({
  name: {
    type: String
  }
});

module.exports = mongoose.model("board", boardSchema, "board");
