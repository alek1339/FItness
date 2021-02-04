const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creatе Schema for page
const pageSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = page = mongoose.model('pages', pageSchema)