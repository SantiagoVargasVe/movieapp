const User = require("../models/user_model");

exports.create = function (req, res) {
  User.create(req.body, function (err, result) {
    if (!err) {
      return res.json(result);
    } else {
      return res.send(err);
    }
  });
};
