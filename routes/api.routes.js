const express = require('express')
const router = express.Router()
const axios = require('axios')

const Place = require("../models/place.model")

//TODO api endpoints en ingles
router.post('/places', (req, res) => {
    axios.get(`https://api.stormglass.io/v2/weather/point?lat=${req.body.lat}&lng=${req.body.lng}&params=${req.body.params}`, {
        headers: { 'Authorization': process.env.APIKEY }
    })
        .then(response => {

            Place
                .create({
                    coordinates: {
                        lat: req.body.lat,
                        lng: req.body.lng
                    },
                    hours: response.data.hours
                })
                .then(response => {
                    let resArray = response.hours
                    res.json({ resArray })
                })
        })
        .catch(err => console.log(err))
})

router.get('/places', (req, res) => {

    Place
        .find()
        .then(response => res.json({ response }))
})

module.exports = router

// "/" GET all Elm
//     POST crea
//     PUT actualiza varios
// "/:id" GET da uno
//         PUT/PPATCH ACTUALIZA
