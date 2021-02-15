const mongoose = require('mongoose')
const Schema = mongoose.Schema

const placeSchema = new Schema(
    {
        name: String,
        description: String,
        location: {
            lat: String,
            lng: String
        },
        images: [String],
        comments: [String]
    },
    {
        timestamps: true
    }
)

const Place = mongoose.model('Place', placeSchema)

module.exports = Place