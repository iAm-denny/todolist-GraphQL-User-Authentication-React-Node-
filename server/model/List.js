const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
    header: String,
    context: String,
    userId: String
})
module.exports = mongoose.model('list', listSchema)