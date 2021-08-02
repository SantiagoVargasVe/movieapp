const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const movieSchema = new Schema(
  {
    _id: Number,
    title: String,
    poster_path: String,
    release_date: { type: Date },
  },
  { _id: false }
);

const userSchema = new Schema({
  movies_suscription: [movieSchema],
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, required: false, default: Date.now },
});

userSchema.statics = {
  addMovie: async function (id, movies) {
    let actUser = await this.findOne({ _id: id });
    actUser.movies_suscription.push(...movies);
    actUser.save();
  },

  removeMovie: async function (userId, movieId) {
    let actUser = await this.findOne({ _id: userId });
    actUser.movies_suscription.id(movieId).remove();
    actUser.save();
  },
  get: async function (query) {
    await this.findOne(query);
  },
  getAll: async function (query) {
    await this.find(query);
  },
  updateById: async function (id, updateData) {
    await this.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      { new: true },
      callback
    );
  },
  removeById: async function (removeData) {
    this.findOneAndRemove(removeData, callback);
  },
  create: async function (user) {
    let { name, lastname, password } = user;
    let salt = bcrypt.genSaltSync(10);
    let hashed_password = bcrypt.hashSync(password, salt);
    user = new this({ name, lastname, password: hashed_password });
    user.save();
  },
};

const User = (module.exports = mongoose.model("User", userSchema));
