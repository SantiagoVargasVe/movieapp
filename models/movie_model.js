const mongoose = require("mongoose");
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

movieSchema.statics = {
  get: function (query, callback) {
    this.findOne(query).exec(callback);
  },

  getAll: function (query, callback) {
    this.find({}), sort("release_date").exec(callback);
  },
  removeAll: function (query, callback) {
    this.remove(query).exec(callback);
  },
  create: function (data, callback) {
    const movie = new this(data);
    movie.save(callback);
  },
  updateById: function (id, updateData, callback) {
    this.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      { new: true },
      callback
    );
  },
};

const Movie = (module.exports = mongoose.model("Movie", movieSchema));
