const express = require('express')
const HotelController = require('../Controller/hotel')
const hotelRouter = express.Router()
const fileUpload = require('express-fileupload')

hotelRouter.post(
    '/create',
    fileUpload({ createParentPath: true }),
    function (request, response) {
        const data = request.body
        const files = request.files
        const result = new HotelController().create(data, files)
        result.then(
            function (success) {
                response.send(success)
            }
        ).catch(
            function (error) {
                response.send(error)
            }
        )
    }
)

module.exports = hotelRouter