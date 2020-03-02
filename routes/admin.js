const express = require("express");
const router = express.Router();
const boardDataAccess = require("../data_layer/boardDataAccess");

// POST /admin/leaderboard
router.post("/leaderboard", async (req, res) => {
  const name = req.body.name;
  const newBoard = await boardDataAccess.createLeaderBoard(name);

  res.json({
    board: {
      _id: newBoard._id,
      name: newBoard.name
    }
  });
});

module.exports = router;
