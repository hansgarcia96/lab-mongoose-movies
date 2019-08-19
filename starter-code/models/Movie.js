const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  name: String,
  director: String,
  image: String
  // cast:
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
