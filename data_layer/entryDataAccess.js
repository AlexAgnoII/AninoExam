const Entry = require("../models/Entry");
const mongoose = require("mongoose");

module.exports.updateEntry = (score_to_add, user_id, board_id) => {
  return Entry.findOneAndUpdate(
    { user_id: user_id, board_id: board_id },
    { $inc: { score: score_to_add }, $set: { scored_at: Date.now() } }
  );
};

module.exports.createEntry = (score, user_id, board_id) => {
  const entry = new Entry({
    board_id: board_id,
    score: score,
    scored_at: Date.now(),
    user_id: user_id
  });

  return entry.save();
};
