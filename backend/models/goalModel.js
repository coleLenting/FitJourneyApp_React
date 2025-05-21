const mongoose = require('mongoose')

const Schema = mongoose.Schema


const goalSchema = new Schema({
    goalName: {
        type: String,
        required: true
    },

    goalDescription: {
        type: String,
        required: true
    },

    goalTimeframe: {
        type: Number,
        required: true
    }
}, {timestamps: true })

module.exports = mongoose.model('Goal', goalSchema)