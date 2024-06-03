const mongoose = require('mongoose')

const hotelSchema = new mongoose.Schema(
    {
        hotel_name: {
            type: String,
            required: true
        },
        hotel_location: {
            type: String,
            required: true
        },
        hotel_rating: {
            type: Number,
            required: true
        },
        delivery_time: {
            type: String,
            required: true
        },
        hotel_category: [{
            type: String,
            required: true
        }],
        hotel_image: {
            type: String,
            required: true
        },
        minimum_order_price: {
            type: Number,
            default: null
        },
        hotel_discount: {
            type: Number,
            default: null
        },
        discount_percentage: {
            type: Number,
            default: null
        },
        maximum_order_price: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true
    }
)

const hotelModel = mongoose.model('Hotel', hotelSchema)
module.exports = hotelModel