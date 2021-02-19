const mongoose = require('mongoose')
const Schema = mongoose.Schema

const placeSchema = new Schema(
    {
        name: { type: String, unique: true },
        coordinates: {
            lat: String,
            lng: String
        },
        comments: [{
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }],
        images: [String],
        weather: Array
    },
    {
        timestamps: true
    }
)

const Place = mongoose.model('Place', placeSchema)

module.exports = Place