const { updateDBMovies } = require("../utils/upcoming");
module.exports = function (router) {
  router.get("/upcoming", async (req, res) => {
    const response = await updateDBMovies();
    res.send("Largo" + response);
  });
};
