const express = require("express");
const router = express.Router();
const boardDataAccess = require("../data_layer/boardDataAccess");
const entryDataAccess = require("../data_layer/entryDataAccess");

//GET /leaderboard/:_id?per_page=x&page=y`
router.get("/:_id", async (req, res) => {
  const board_id = req.params._id;
  const per_page = req.query.per_page || 10; //default 10
  const page = req.query.page || 1; //default 1

  const board = await boardDataAccess.getLeaderBoard(board_id, per_page, page);
  const leaderBoard = boardDataAccess.fixLeaderBoardFormat(board[0]);

  res.send(leaderBoard);
});

//`PUT /leaderboard/:_id/user/:user_id/add_score`
router.put("/:_id/user/:user_id/add_score", async (req, res) => {
  const user_id = req.params.user_id;
  const board_id = req.params._id;
  const score_to_add = req.body.score_to_add;

  let freshEntry = await entryDataAccess.updateEntry(
    score_to_add,
    user_id,
    board_id
  );

  //if no such entry exists, create new.
  if (!freshEntry) {
    freshEntry = await entryDataAccess.createEntry(
      score_to_add,
      user_id,
      board_id
    );
  }

  res.json({
    entry: {
      _id: freshEntry._id,
      board_id: freshEntry.board_id,
      score: freshEntry.score,
      scored_at: freshEntry.scored_at,
      user_id: freshEntry.user_id
    }
  });
});

module.exports = router;
