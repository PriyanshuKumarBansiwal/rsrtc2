const mongoose = require('mongoose')

const fareSchema = new mongoose.Schema(
    {
        journey: {
            type: String,
            required: true
        },
        fare: {
            type: Number,
            required: true
        },
        ladies_fare: {
            type: Number,
            required: true
        },
        child_fare: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const fareModel = mongoose.model('Fare', fareSchema)

module.exports = fareModel