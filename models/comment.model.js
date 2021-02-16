const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        place: {
            type: Schema.Types.ObjectId,
            ref: "Place"
        },
        text: String,
    },
    {
        timestamps: true
    }
)
commentSchema.stacit.getUserComments = function (id) {
    return mongoose.model('Comment').find({ user: id })
}

commentSchema.statics.getPlaceComments = function (id) {
    return mongoose.model('Comment').find({ place: id })
}


const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment