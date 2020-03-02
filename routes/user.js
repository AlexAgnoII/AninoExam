const express = require("express");
const router = express.Router();
const userDataAccess = require("../data_layer/userDataAccess");

// -POST/user
router.post("/", async (req, res) => {
  const name = req.body.name;

  //name doesnt exist, stop further process.
  if (!name) res.status(400).send("Invalid name parameter");

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

  if (!user) res.status(404).send("The user with the given _id was not found.");

  res.json({
    user: {
      _id: user._id,
      name: user.name
    }
  });
});

module.exports = router;
