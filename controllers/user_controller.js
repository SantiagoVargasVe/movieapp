const User = require("../models/user_model");

exports.create = async function (req, res) {
  let { response, success } = await User.create(req.body);
  if (success) {
    res.json(response);
  } else {
    res.json({ error: response });
  }
};
