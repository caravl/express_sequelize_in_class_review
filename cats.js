//

const router = require('express').Router(); // any routes that arrive
const { Cat } = require('../models');

module.exports = router;

// find a specific cat
router.get('/cat/:catId', (req, res, next) => {
  Cat.findById(req.params,catId) // findById is a method
  .then((cat) => {
    res.json(cat);
  })
  .catch(next); // specific to error handling, best practice for Sequelize to include .catch to know about an error when it happens
})

// get all our cats
router.get('/', (req, res, next) => {
  Cat.findAll({}) // findAll is a method
  .then((cats) => {
    res.status(200).json(cats);
  })
  .catch(next);
})

// post a new cat
router.post('/cat', (req, res, next) => {
  Cat.create(req.body)
    .then((newCat) => {
      res.status(201).json(newCat)
    })
    .catch(next);
})

