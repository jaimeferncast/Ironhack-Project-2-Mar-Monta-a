const express = require('express')
const router = express.Router()
const axios = require('axios')

const User = require("../models/user.model")
const Place = require("../models/place.model")

// Search place by clicking in the map
router.post('/', (req, res, next) => {
    axios.get(`https://api.stormglass.io/v2/weather/point?lat=${req.body.lat}&lng=${req.body.lng}&params=${req.body.params}`, {
        headers: { 'Authorization': process.env.APIKEY }
    })
        .then(response => {

            let weather = response.data.hours
            res.json({ weather })
        })
        .catch(error => next(new Error(error)))
})

// Add place to my places
router.put('/', (req, res, next) => {

    Place
        .findOne({ name: req.body.name })
        .then(response => {
            if (response) {
                const favourites = req.user.favourites
                favourites.push(response._id)
                return User.findOneAndUpdate({ _id: req.user._id }, { favourites }, { new: true })
            } else {
                return Place
                    .create({
                        name: req.body.name,
                        coordinates: req.body.coordinates,
                        weather: req.body.weather
                    })
                    .then(response => {
                        const favourites = req.user.favourites
                        favourites.push(response._id)
                        return User.findOneAndUpdate({ _id: req.user._id }, { favourites }, { new: true })
                    })
            }
        })
        .then(() => res.sendStatus(203))
        .catch(error => next(new Error(error)))
})

// Place query from weather-user.js to display its weather info in my places
router.post('/user-places', (req, res, next) => {

    let promiseArr = req.body.placeName.map(elm => Place.findOne({ name: elm }).select('weather name'))

    Promise.all(promiseArr)
        .then(places => res.json({ places }))
        .catch(error => next(new Error(error)))
})

// Search place by name with the search input
router.get('/:location', (req, res, next) => {

    axios.post(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${req.params.location}&inputtype=textquery&fields=formatted_address,name,geometry&key=${process.env.MAPSKEY}`)
        .then(response => {
            res.json(response.data.candidates[0])
        })
        .catch(error => next(new Error(error)))
})

module.exports = router