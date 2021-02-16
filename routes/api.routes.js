const express = require('express')
const router = express.Router()
const axios = require('axios')

const User = require("../models/user.model")
const Place = require("../models/place.model")

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

router.put('/', (req, res) => {

    console.log(req.body)

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
                .findByIdAndUpdate({ _id: req.user._id }, { favourites }, { new: true })
        })
        .catch(err => console.log(err))
})
// Busqueda de lugar
router.get('/search-place', (req, res) => {
    axios.post(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${req.query.direction}&inputtype=textquery&fields=formatted_address,name,geometry&key=${process.env.MAPSKEY}`)
        .then(response => {
            res.send(response.data.candidates)

        })
        .catch(err => console.log(err))
})


module.exports = router

// "/" GET all Elm
//     POST crea
//     PUT actualiza varios
// "/:id" GET da uno
//         PUT/PPATCH ACTUALIZA


