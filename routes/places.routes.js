const express = require('express')
const router = express.Router()

const { checkLoggedIn } = require('./../middleware')

const Place = require("../models/place.model")
const Comment = require("../models/comment.model")

// List of places added by the users
router.get('/', checkLoggedIn, (req, res, next) => {
    Place.find().then(places => res.render('places/all-places', { places, user: req.user })).catch(error => next(new Error(error)))
})

// Place page
router.get('/:name', checkLoggedIn, (req, res, next) => {

    Place
        .findOne({ name: req.params.name })
        .then(place => {
            if (place.comments[0]) {
                return Place.findById(place._id).populate('comments')
                    .then(place => {
                        let commentsArr = place.comments.map(elm => Comment.findById(elm._id).populate('user place'))
                        return Promise.all(commentsArr)
                    })
                    .then(comments => {
                        console.log(comments[0].place, 'fin de place', comments)
                        res.render('places/place-page', { place: comments[0].place, user: req.user, comments })
                    })
            } else {
                return res.render('places/place-page', { place, user: req.user })
            }
        })
        .catch(error => next(new Error(error)))
})

// New comment
router.post('/:id/nuevo-comentario', (req, res, next) => {

    const _id = req.params.id
    let comments
    let place

    Place.findOne({ _id })
        .then(response => {
            comments = response.comments
            return Comment.create({ user: req.user._id, place: _id, text: req.body.comment })
        })
        .then(comment => {
            comments.push(comment._id)
            return Place.findOneAndUpdate({ _id }, { comments }, { new: true }).populate('comments')
        })
        .then(response => {
            place = response
            let commentsArr = response.comments.map(elm => Comment.findById(elm._id).populate('user'))
            return Promise.all(commentsArr)
        })
        .then(comments => res.render('places/place-page', { place, user: req.user, comments }))
        .catch(error => next(new Error(error)))
})

module.exports = router