const express = require('express')
const router = express.Router()
const axios = require('axios')

const User = require("../models/user.model")
const Place = require("../models/place.model")

// Búsqueda de lugar haciendo click en el mapa
router.post('/', (req, res) => {
    axios.get(`https://api.stormglass.io/v2/weather/point?lat=${req.body.lat}&lng=${req.body.lng}&params=${req.body.params}`, {
        headers: { 'Authorization': process.env.APIKEY }
    })
        .then(response => {

            let weather = response.data.hours
            res.json({ weather })
        })
        .catch(err => console.log(err))
})

// Agregar lugar a favoritos
router.put('/', (req, res) => {

    Place
        .create({
            name: req.body.name,
            coordinates: req.body.coordinates,
            weather: req.body.weather
        })
        .then(response => {

            const favourites = req.user.favourites
            favourites.push(response._id)

            User
                .findOneAndUpdate({ _id: req.user._id }, { favourites }, { new: true })
                .then((data) => res.json(data))
        })
        .catch(err => console.log(err))
})

// Búsqueda de lugar por input
router.get('/:location', (req, res) => {

    axios.post(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${req.params.location}&inputtype=textquery&fields=formatted_address,name,geometry&key=${process.env.MAPSKEY}`)
        .then(response => {
            res.json(response.data.candidates[0])
        })
        .catch(err => console.log(err))
})

module.exports = router