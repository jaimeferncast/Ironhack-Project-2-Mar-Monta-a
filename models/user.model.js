const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        username: { type: String, unique: true },
        email: { type: String, unique: true },
        name: String,
        password: String,
        avatar: String,
        role: {
            type: String,
            enum: ['USER', 'ADMIN'],
            default: 'USER'
        },
        favourites: [{
            type: Schema.Types.ObjectId,
            ref: 'Place'
        }]
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema)

module.exports = User