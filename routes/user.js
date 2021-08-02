const UserController = require("../controllers/user_controller");
module.exports = function (router) {
  router.post("/user", UserController.create);
};
