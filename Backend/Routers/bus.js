const express = require('express')
const BusController = require('../Controller/bus')
const busRouter = express.Router()
const fileUpload = require('express-fileupload')

busRouter.post(
    '/create',
    fileUpload({ createParentPath: true }),
    function (request, response) {
        const data = request.body
        const files = request.files
        const result = new BusController().create(data, files)
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

busRouter.get(
    '/read/:id?',
    function (request, response) {
        const id = request.params.id
        const query = request.query
        const result = new BusController().read(id, query)
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

busRouter.post(
    '/filter',
    function (request, response) {
        const data = request.body
        const result = new BusController().filter(data)
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

busRouter.post(
    '/enquiry/:bus_number',
    function (request, response) {
        const bus_number = request.params.bus_number
        const result = new BusController().enquiry(bus_number)
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

busRouter.delete(
    '/delete/:id',
    function (request, response) {
        const id = request.params.id
        const result = new BusController().delete(id)
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

busRouter.put(
    '/update/:id',
    fileUpload({ createParentPath: true }),
    function (request, response) {
        const id = request.params.id
        const data = request.body
        const files = request.files
        const result = new BusController().update(id, data, files)
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

busRouter.patch(
    '/display/:id/:status',
    function (request, response) {
        const id = request.params.id
        const status = request.params.status
        const result = new BusController().display(id, status)
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

busRouter.patch(
    '/journey/:id/:status',
    function (request, response) {
        const id = request.params.id
        const status = request.params.status
        const result = new BusController().journey(id, status)
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

busRouter.patch(
    '/reverse-route/:id/:route',
    function (request, response) {
        const id = request.params.id
        const route = request.params.route
        const bus_stops = request.body
        const result = new BusController().reverseRoute(id, route, bus_stops)
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

module.exports = busRouter