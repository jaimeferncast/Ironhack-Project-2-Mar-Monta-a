const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        username: { type: String, unique: true },
        email: { type: String, unique: true },
        name: String,
        password: String,
        avatar: {
            type: String,
            default: 'https://media-exp1.licdn.com/dms/image/C4D03AQFFOE2nvmuHmg/profile-displayphoto-shrink_800_800/0/1558437077574?e=1617840000&v=beta&t=ecXm2Pr-iU7Q7y1FyaxMci0Gi7xUydAlgdk8HW9ky6o',
        },
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