const express = require('express')
const FareController = require('../Controller/fare')
const fareRouter = express.Router()

fareRouter.post(
    '/create',
    function (request, response) {
        const data = request.body
        const result = new FareController().create(data)
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

fareRouter.get(
    '/read/:journey?',
    function (request, response) {
        const journey = request.params.journey
        const result = new FareController().read(journey)
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

fareRouter.put(
    '/update/:id',
    function (request, response) {
        const id = request.params.id
        const data = request.body
        const result = new FareController().update(id, data)
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

fareRouter.delete(
    '/delete/:id',
    function (request, response) {
        const id = request.params.id
        const result = new FareController().delete(id)
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

module.exports = fareRouter