const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creatе Schema for Article
const ArticleSchema = new Schema({
    htmlData: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Article = mongoose.model('articles', ArticleSchema)