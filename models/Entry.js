const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const entrySchema = new Schema({
  board_id: { type: Schema.Types.ObjectId, index: true },
  score: Number,
  scored_at: Date,
  user_id: { type: Schema.Types.ObjectId, index: true }
});

module.exports = mongoose.model("entry", entrySchema, "entry");
