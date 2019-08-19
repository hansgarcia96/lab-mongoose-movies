const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

// GET - NEW MOVIE FORM
router.get("/movies/new", (req, res, next) => {
  res.render("movies/new-movie");
});

// POST - NEW MOVIE
router.post("/movies/create", (req, res, next) => {
  console.log("THE FORM ", req.body);
  Movie.create(req.body)
    .then(newMovie => res.redirect("/movies"))
    .catch(err => console.log("error creating new movie"));
});

// GET - ALL ADDED MOVIES
router.get("/movies", (req, res, next) => {
  Movie.find()
    .then(moviesFromDB => res.render("movies/movies", { movies: moviesFromDB }))
    .catch(err => console.log("Error getting the movies from the DB: ", err));
});

// GET - MOVIE DETAILS
router.get("/movies/movie-details/:id", (req, res, next) => {
  const theID = req.params.id;

  Movie.findById(theID)
    .then(result => {
      res.render("movies/movie-details", { singleMovie: result });
    })
    .catch(err => {
      next(err);
    });
});

// POST - DELETE THE MOVIE
router.post("/movies/:id/destroy", (req, res, next) => {
  const id = req.params.id;

  Movie.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/movies");
    })
    .catch(err => {
      next(err);
    });
});

// GET - RECEIVE THE MOVIE TO EDIT
router.get("/movies/edit/:id", (req, res, next) => {
  Movie.findById(req.params.id)
    .then(result => {
      res.render("movies/edit-movie", { theMovie: result });
    })
    .catch(err => {
      next(err);
    });
});

// POST - CELEBRITY TO EDIT
router.post("/movies/edit/:id", (req, res, next) => {
  const id = req.params.id;

  Movie.findByIdAndUpdate(id, {
    name: req.body.name,
    director: req.body.director,
    image: req.body.image
  })
    .then(result => {
      res.redirect("/movies/movie-details/" + id);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
