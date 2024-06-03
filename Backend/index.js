const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const hotelRouter = require('./Routers/hotel')
const busRouter = require('./Routers/bus')
const fareRouter = require('./Routers/fare')
const bookingRouter = require('./Routers/booking')
const userRouter = require('./Routers/user')
const adminRouter = require('./Routers/admin')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('public'))
app.use(cookieParser())
app.use('/hotel', hotelRouter)
app.use('/bus', busRouter)
app.use('/fare', fareRouter)
app.use('/booking', bookingRouter)
app.use('/user', userRouter)
app.use('/admin', adminRouter)

mongoose.connect(process.env.MONGODB_URL)
    .then(
        function () {
            console.log('Database Has Been Connected Successfully')
            app.listen(
                process.env.PORT,
                async function (error) {
                    if (error) { console.error('Server Not Started') }
                    else { console.log('Server Has Been Started') }
                })
        }
    ).catch(
        function (error) {
            console.error(error)
        }
    )