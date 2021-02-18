const express = require('express')
const router = express.Router()

const { checkLoggedIn } = require('./../middleware')

const User = require("../models/user.model")

// Personal dashboard with my favourite places listed
router.get('/mis-lugares', checkLoggedIn, (req, res, next) => {

    User
        .findById(req.user._id)
        .populate('favourites')
        .then(user => res.render('users/my-places', { user }))
        .catch(error => next(new Error(error)))
})

// Edit profile page
router.get('/editar', checkLoggedIn, (req, res) => res.render('users/edit-profile', req))

// Profile changes post to DB
router.post('/editar', checkLoggedIn, (req, res, next) => {

    const { username, name, email, avatar } = req.body

    User
        .findOneAndUpdate({ _id: req.user._id }, { username, name, email, avatar }, { new: true })
        .then(() => res.redirect('/area-personal/mis-lugares'))
        .catch(error => next(new Error(error)))
})

// Delete a place from my places
router.get('/eliminar-lugar/:_id', checkLoggedIn, (req, res, next) => {

    const favourites = req.user.favourites
    favourites.forEach((elm, i, array) => {
        elm == req.params._id && array.splice(i, 1)
    })

    User
        .findOneAndUpdate({ _id: req.user._id }, { favourites }, { new: true })
        .populate('favourites')
        .then(user => res.render('users/my-places', { user }))
        .catch(error => next(new Error(error)))
})

// Add place to my places from the place page
router.get('/agregar-lugar/:_id', checkLoggedIn, (req, res, next) => {

    const favourites = req.user.favourites
    favourites.push(req.params._id)

    User
        .findOneAndUpdate({ _id: req.user._id }, { favourites }, { new: true })
        .populate('favourites')
        .then(user => res.render('users/my-places', { user }))
        .catch(error => next(new Error(error)))
})

module.exports = router