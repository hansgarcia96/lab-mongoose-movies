const express = require("express");
const router = express.Router();
const Celebrity = require("../models/celebrity"); // import the celebrity from the models folder

// GET - HOMEPAGE
router.get("/", (req, res, next) => {
  res.render("index");
});

// GET - NEW CELEBRITY FORM
router.get("/celebrities/new", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

// POST - NEW CELEBRITY
router.post("/celebrities/create", (req, res, next) => {
  console.log("THE FORM ", req.body);
  Celebrity.create(req.body)
    .then(newCelebrity => res.redirect("/celebrities"))
    .catch(err => console.log("error creating new celebrity"));
});

// GET - ALL ADDED CELEBRITIES
router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then(celebritiesFromDB =>
      res.render("celebrities/celebrities", { celebrities: celebritiesFromDB })
    )
    .catch(err =>
      console.log("Error getting the celerities from the DB: ", err)
    );
});

// GET - CELEBRITY DETAILS
router.get("/celebrities/celebrity-details/:id", (req, res, next) => {
  const theID = req.params.id;

  Celebrity.findById(theID)
    .then(result => {
      res.render("celebrities/celebrity-details", { singleCelebrity: result });
    })
    .catch(err => {
      next(err);
    });
});

// POST - DELETE THE CELEBRITY
router.post("/celebrities/:id/destroy", (req, res, next) => {
  const id = req.params.id;

  Celebrity
    .findByIdAndDelete(id)
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch(err => {
      next(err);
    });
});

// GET - RECEIVE THE CELEBRITY TO EDIT
router.get("/celebrities/edit/:id", (req, res, next) => {
  Celebrity
    .findById(req.params.id)
    .then((result) => {
      res.render("celebrities/edit-celebrity", {theCelebrity: result})
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router;
