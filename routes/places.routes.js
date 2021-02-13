const express = require('express')
const router = express.Router()
const passport = require("passport")

const User = require("../models/user.model")

router.get('/favoritos', (req, res, next) => {
    const username = req.user.username
    User
        .findOne({ username })
        .then(user => res.render('users/favourites', user))
        .catch(error => next(new Error(error)))
})


module.exports = router