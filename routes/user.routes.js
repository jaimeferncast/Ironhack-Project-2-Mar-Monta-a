const express = require('express')
const router = express.Router()
const passport = require("passport")

const { checkLoggedIn } = require('./../middleware')

const User = require("../models/user.model")

router.get('/mis-lugares', checkLoggedIn, (req, res) => res.render('users/my-places', req.user))

router.get('/editar', (req, res) => res.render('users/edit-profile', req))

router.post('/editar', (req, res) => {

    const { username, name, email, avatar } = req.body

    User
        .findOneAndUpdate({ _id: req.user._id }, { username, name, email, avatar }, { new: true })
        .then(() => res.redirect('/area-personal/mis-lugares'))
        .catch(err => console.log(err))
})

module.exports = router