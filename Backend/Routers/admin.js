const express = require('express')
const AdminController = require('../Controller/admin')
const adminRouter = express.Router()

// adminRouter.post(
//     '/create',
//     function (request, response) {
//         const data = request.body
//         const result = new AdminController().create(data)
//         result.then(
//             function (success) {
//                 response.send(success)
//             }
//         ).catch(
//             function (error) {
//                 response.send(error)
//             }
//         )
//     }
// )

adminRouter.post(
    '/login',
    function (request, response) {
        const data = request.body
        const result = new AdminController().login(data)
        result.then(
            function (success) {
                response.send(success)
            }
        ).catch(
            function (error) {
                console.log(error)
                response.send(error)
            }
        )
    }
)

module.exports = adminRouter