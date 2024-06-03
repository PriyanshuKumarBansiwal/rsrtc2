const express = require('express')
const BookingController = require('../Controller/booking')
const adminAuth = require('../Middleware/admin')
const userAuth = require('../Middleware/user')
const bookingRouter = express.Router()

bookingRouter.post(
    '/create',
    function (request, response) {
        const data = request.body
        const result = new BookingController().create(data)
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

bookingRouter.get(
    '/read/:id?',
    adminAuth,
    function (request, response) {
        const id = request.params.id
        const result = new BookingController().read(id)
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

bookingRouter.get(
    '/user-ticket/:id',
    userAuth,
    function (request, response) {
        const id = request.params.id
        const result = new BookingController().userTicket(id)
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

bookingRouter.patch(
    '/payment/:id/:status',
    adminAuth,
    function (request, response) {
        const id = request.params.id
        const status = request.params.status
        const result = new BookingController().updatePayment(id, status)
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

module.exports = bookingRouter