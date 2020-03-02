const express = require("express");
const router = express.Router();
const userDataAccess = require("../data_layer/userDataAccess");

// -POST/user
router.post("/", async (req, res) => {
  const name = req.body.name;
  const userCreated = await userDataAccess.createUser(name);

  res.json({
    user: {
      _id: userCreated._id,
      name: userCreated.name
    }
  });
});

//GET/user/:id
router.get("/:_id", async (req, res) => {
  const _id = req.params._id;
  const user = await userDataAccess.getUser(_id);

  res.json({
    user: {
      _id: user._id,
      name: user.name
    }
  });
});

module.exports = router;
