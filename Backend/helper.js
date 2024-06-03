const Cryptr = require('cryptr')
const cryptr = new Cryptr('rsrtcUserPasswords')
const jwt = require('jsonwebtoken')
const userSecretKey = 'rsrtcUser'
const adminSecretKey = 'rsrtcAdmin'

function encryptPassword(password) {
    return cryptr.encrypt(password)
}

function decryptPassword(password) {
    return cryptr.decrypt(password)
}

function userTokenGenerator(user) {
    return jwt.sign(user, userSecretKey, { expiresIn: '1h'})
}

function userTokenVerification(token) {
    try {
        if (!token) { return null }
        return jwt.verify(token, userSecretKey)
    } catch (error) { return null }
}

function adminTokenGenerator(admin) {
    return jwt.sign(admin, adminSecretKey, { expiresIn: '1h' })
}

function adminTokenVerification(token) {
    try {
        if (!token) { return null }
        return jwt.verify(token, adminSecretKey)
    } catch (error) { return null }
}

module.exports = { userTokenGenerator, userTokenVerification, adminTokenGenerator, adminTokenVerification, encryptPassword, decryptPassword }