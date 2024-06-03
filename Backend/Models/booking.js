const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema(
    {
        booker: {
            type: String,
            required: true
        },
        male: {
            type: Number,
        },
        female: {
            type: Number,
        },
        child: {
            type: Number,
        },
        seat_number: [{
            type: String,
            required: true
        }],
        payment_status: {
            type: Boolean,
            required: true,
            default: false
        },
        total_fare: {
            type: Number,
            required: true,
        },
        bus_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bus',
            required: true
        },
        departure: {
            type: String,
            required: true
        },
        destination: {
            type: String,
            required: true
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        departure_date: {
            type: Date,
            required: true,
        }
    },
    { timestamps: true }
)

const bookingModel = mongoose.model('Booking', bookingSchema)
module.exports = bookingModel