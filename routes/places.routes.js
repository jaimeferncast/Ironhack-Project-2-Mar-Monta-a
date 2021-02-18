const express = require('express')
const router = express.Router()

const { checkLoggedIn } = require('./../middleware')

const Place = require("../models/place.model")

router.post('/', (req, res, next) => {

})

// Place page
router.get('/:name', checkLoggedIn, (req, res, next) => {

    Place
        .findOne({ name: req.params.name })
        .then(response => res.render('places/place-page', { place: response, user: req.user }))
        .catch(error => next(new Error(error)))
})

module.exports = router