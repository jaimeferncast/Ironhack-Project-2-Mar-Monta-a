const express = require('express')
const router = express.Router()
const axios = require('axios')

router.post('/latlng', (req, res) => {
    axios.get(`https://api.stormglass.io/v2/weather/point?lat=${req.body.lat}&lng=${req.body.lng}&params=${req.body.params}`, {
        headers: { 'Authorization': process.env.APIKEY }
    })
        .then(response => {
            let resArray = response.data.hours
            res.json({ resArray })
        })
        .catch(err => console.log(err))
})

module.exports = router