const { adminTokenVerification } = require("../helper")

function adminAuth(request, response, next) {
    const token = request.headers.authorization
    if (adminTokenVerification(token)) { next() }
    else { response.send('You Are Unauthorized') }
}

module.exports = adminAuth;