const express = require("express");
const router = express.Router();
const Celebrity = require("../models/celebrity"); // import the celebrity from the models folder

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

// GET - to display the form for Creating the Celebrity
router.get("/celebrities/new", (req, res, next) => {
    res.render("celebrities/new-celebrity")
  });

router.post("/celebrities/create", (req, res, next) => {
console.log("THE FORM ", req.body);
Celebrity
    .create(req.body)
    .then( newCelebrity => res.redirect("/celebrity"))
    .catch(err => console.log('error creating new celebrity'))
});

router.get("/celebrities", (req, res, next) => {
  Celebrity
    .find()
    .then(celebritiesFromDB => res.render("celebrities/celebrities", {celebrities: celebritiesFromDB}))
    .catch(err => console.log("Error getting the celerities from the DB: ", err))
})

module.exports = router;