const express = require('express')
const router = express.Router()
const passport = require("passport")

const User = require("../models/user.model")

router.get('/favoritos', (req, res) => res.render('users/favourites', req.user))

router.get('/editar', (req, res) => res.render('users/edit-profile', req))

router.post('/editar', (req, res) => {

    const { username, name, email, avatar } = req.body

    User
        .findOneAndUpdate({ _id: req.user._id }, { username, name, email, avatar }, { new: true })
        .then(() => res.redirect('/mi-perfil/favoritos'))
        .catch(err => console.log(err))
})

module.exports = router