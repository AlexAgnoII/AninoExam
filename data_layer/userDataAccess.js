const User = require("../models/User");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

module.exports.createUser = name => {
  const user = new User({
    name: name
  });

  return user.save();
};

module.exports.getUser = _id => {
  if (mongoose.Types.ObjectId.isValid(_id)) return User.findById(ObjectId(_id));
  return null;
};
