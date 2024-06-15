const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create the book schema here
const BookSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
      },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    genre: String,
    cover: String,
    createdAt: {
        type: String,
        default: Date.now()
    }

});



module.exports = mongoose.model('Book', BookSchema)