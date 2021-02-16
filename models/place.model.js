const mongoose = require('mongoose')
const Schema = mongoose.Schema

const placeSchema = new Schema(
    {
        name: String,
        description: String,
        coordinates: {
            lat: String,
            lng: String
        },
        images: [String],
        hours: Array
    },
    {
        timestamps: true
    }
)

const Place = mongoose.model('Place', placeSchema)

module.exports = Place