const express = require('express')
const router = express.Router()
const passport = require("passport")

const { checkLoggedIn } = require('./../middleware')

const User = require("../models/user.model")
const Place = require("../models/place.model")

router.get('/mis-lugares', checkLoggedIn, (req, res, next) => {

    User
        .findById(req.user._id)
        .populate('favourites')
        .then(user => res.render('users/my-places', { user }))
        .catch(error => next(new Error(error)))
})

router.get('/editar', (req, res) => res.render('users/edit-profile', req))

router.post('/editar', (req, res, next) => {

    const { username, name, email, avatar } = req.body

    User
        .findOneAndUpdate({ _id: req.user._id }, { username, name, email, avatar }, { new: true })
        .then(() => res.redirect('/area-personal/mis-lugares'))
        .catch(error => next(new Error(error)))
})

module.exports = router