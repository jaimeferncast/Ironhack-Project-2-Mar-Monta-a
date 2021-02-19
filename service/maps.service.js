const axios = require('axios')
class MapsService {
    constructor() {
        this.api = axios.create({
            baseURL: 'https://maps.googleapis.com/maps/api'
        })
    }
    searchPlace = location => this.api.post(`/place/findplacefromtext/json?input=${location}&inputtype=textquery&fields=formatted_address,name,geometry&key=${process.env.MAPSKEY}`)
}
module.exports = MapsService