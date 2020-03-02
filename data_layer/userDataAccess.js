const User = require("../models/User");

module.exports.createUser = name => {
  const user = new User({
    name: name
  });

  return user.save();
};

module.exports.getUser = _id => {
  return User.findById(_id);
};
