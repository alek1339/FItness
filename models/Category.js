const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creatе Schema for category
const categorySchema = new Schema({
    text: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    route: {
        type: String,
        required: true
    },
    subCat: {
        type: Array,
        required: false
    },
    creator: {
        type: String,
        required: true
    },
    articles: {
        type: Array,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = category = mongoose.model('categories', categorySchema)