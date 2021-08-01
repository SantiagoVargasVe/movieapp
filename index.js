require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const CronJob = require("cron").CronJob;
const { updateDBMovies } = require("./utils/upcoming");

const app = express();
const port = process.env.PORT || 8080;
const router = express.Router();
app.use("/api", router);
require("./routes/movie_api")(router);
mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to database");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

const job = new CronJob(
  "59 23 * * */1",
  function () {
    updateDBMovies();
  },
  null,
  false,
  "America/Bogota"
);
job.start();
