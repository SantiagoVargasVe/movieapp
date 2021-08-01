const { MovieDb } = require("moviedb-promise");
const { create } = require("../models/movie_model");
const moment = require("moment");
const moviedb = new MovieDb(process.env.MOVIE_API_KEY);
const Movie = require("../models/movie_model");
const updateDBMovies = async () => {
  const allMovies = await getAllUpComing();
  let added = 0;
  allMovies.forEach(async (movie) => {
    let newMovie = {
      _id: movie.id,
      title: movie.original_title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
    };
    let movieDate = moment(movie.release_date);
    let today = moment();
    let notExist = await isNew(movie.id);
    if (
      checkDaysUntil({ movieDate, today }) &&
      movie.original_language === "en" &&
      notExist
    ) {
      createMovie(newMovie);
      console.log("Creo una nueva");
      added += 1;
    }
  });
  return "Se crearon las peliculas";
};

getAllUpComing = async () => {
  let allMovies = [];
  const response = await moviedb.upcomingMovies();
  let numPages = response.total_pages;
  for (let i = 1; i <= numPages; i++) {
    const actMovies = await moviedb.upcomingMovies({ page: i });
    allMovies.push(...actMovies.results);
  }
  return allMovies;
};

const isNew = async (id) => {
  let response = await Movie.findById(id);
  return response == null;
};

const checkDaysUntil = ({ movieDate, today }) => {
  return movieDate.diff(today, "days") > 0;
};

const createMovie = (newMovie) => {
  Movie.create(newMovie, function (err, result) {
    if (!err) {
      //   console.log("All good");
    } else {
      //console.log("Tenemos error");
    }
  });
};

module.exports = {
  updateDBMovies,
};
