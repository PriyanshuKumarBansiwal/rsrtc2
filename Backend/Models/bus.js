const mongoose = require('mongoose')

const busSchema = new mongoose.Schema(
    {
        bus_number: {
            type: String,
            required: true
        },
        bus_route: {
            type: String,
            required: true
        },
        bus_depot: {
            type: String,
            required: true
        },
        bus_image: {
            type: String,
            required: true
        },
        bus_departure: {
            type: String,
            required: true
        },
        display: {
            type: Boolean,
            required: true,
            default: true
        },
        departure_time: {
            type: String,
            required: true
        },
        bus_destination: {
            type: String,
            required: true
        },
        destination_time: {
            type: String,
            required: true
        },
        bus_stops: [{
            type: String,
            required: false
        }],
        bus_seats: {
            type: Number,
            default: 45,
        },
        journey_completed: {
            type: Boolean,
            default: false,
        },
        bus_times: [{
            type: String,
            required: true
        }],
        check_in: [{
            type: Boolean,
            required: true
        }],
        time: {
            type: Number,
            required: true
        },
        booked_seats: {
            type: Number,
            required: true,
            default:0,
            max: 45
        }
    },
    {
        timestamps: true
    }
)

const busModel = mongoose.model('Bus', busSchema)
module.exports = busModel