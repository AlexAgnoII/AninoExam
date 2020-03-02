const Board = require("../models/Board");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

module.exports.getLeaderBoard = (_id, per_page, page) => {
  if (mongoose.Types.ObjectId.isValid(_id)) {
    return Board.aggregate([
      {
        $match: {
          _id: ObjectId(_id)
        }
      },
      {
        $lookup: {
          from: "entry",
          localField: "_id",
          foreignField: "board_id",
          as: "entries"
        }
      },
      {
        $unwind: {
          path: "$entries",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "user",
          localField: "entries.user_id",
          foreignField: "_id",
          as: "entries.user"
        }
      },
      {
        $sort: {
          "entries.score": -1
        }
      },
      {
        $skip: per_page * (page - 1)
      },
      {
        $limit: Number(per_page)
      },
      {
        $group: {
          _id: "$_id",
          name: {
            $first: "$name"
          },
          entries: {
            $push: "$entries"
          }
        }
      }
    ]);
  } else {
    return null;
  }
};

module.exports.getLeaderBoardById = board_id => {
  if (mongoose.Types.ObjectId.isValid(board_id)) {
    return Board.findOne({ _id: board_id });
  }
  return null;
};

module.exports.createLeaderBoard = name => {
  const board = new Board({
    name: name
  });

  return board.save();
};

module.exports.fixLeaderBoardFormat = board => {
  let newBoard = {
    _id: board._id,
    name: board.name,
    entries: []
  };

  let entries = board.entries;
  let ctr = 0;

  for (let i in entries) {
    let entry = {
      score: entries[i].score,
      user_id: entries[i].user_id,
      scored_at: entries[i].scored_at,
      rank: ctr,
      name: entries[i].user[0].name
    };

    newBoard.entries.push(entry);
    ctr++;
  }

  return { board: newBoard };
};
