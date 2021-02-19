const axios = require('axios')
class StormglassService {
    constructor() {
        this.api = axios.create({
            baseURL: 'https://api.stormglass.io/v2'
        })
    }
    getWeather = data => this.api.get(`/weather/point?lat=${data.lat}&lng=${data.lng}&params=${data.params}`, {
        headers: { 'Authorization': process.env.APIKEY }
    })
}

module.exports = StormglassService