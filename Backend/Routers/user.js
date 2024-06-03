const express = require('express')
const UserController = require('../Controller/user')
const userAuth = require('../Middleware/user')
const userRouter = express.Router()

userRouter.post(
    '/create',
    function (request, response) {
        const data = request.body
        const result = new UserController().create(data)
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

userRouter.post(
    '/login',
    function (request, response) {
        const data = request.body
        const result = new UserController().login(data)
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

userRouter.get(
    '/read/:id?',
    userAuth,
    function (request, response) {
        const id = request.params.id
        const result = new UserController().read(id)
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

module.exports = userRouter