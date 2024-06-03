const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        user_name: {
            type: String,
            required: true
        },
        user_email: {
            type: String,
            required: true,
            unique: true
        },
        user_password: {
            type: String,
            required: true
        },
        contact_number: {
            type: Number,
            required: true,
            unique: true
        }
    },
    {
        timestamps: true
    }
)

const userModel = mongoose.model('User', userSchema)
module.exports = userModel