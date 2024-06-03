const { userTokenVerification } = require("../helper")

function userAuth(request, response, next) {
    const token = request.headers.authorization
    if (userTokenVerification(token)) { next() }
    else { response.send('You Are Unauthorized') }
}

module.exports = userAuth;