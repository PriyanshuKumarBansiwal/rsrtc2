const userModel = require("../Models/user")
const { encryptPassword, decryptPassword, userTokenGenerator } = require("../helper")

class UserController {
    create(data) {
        return new Promise(
            async function (resolve, reject) {
                try {
                    const existingEmailUser = await userModel.findOne({ user_email: data.user_email })
                    const existingNumberUser = await userModel.findOne({ contact_number: data.contact_number })
                    if (existingEmailUser) {
                        reject({
                            status: 0,
                            message: 'User Already Exists With This Email'
                        })
                        return
                    }
                    if (existingNumberUser) {
                        reject({
                            status: 0,
                            message: 'User Already Exists With This Contact Number'
                        })
                        return
                    }
                    const user = new userModel({
                        user_name: data.user_name,
                        user_email: data.user_email,
                        user_password: encryptPassword(data.user_password),
                        contact_number: data.contact_number
                    })
                    await user.save()
                        .then(
                            function (success) {
                                resolve({
                                    success,
                                    status: 1,
                                    message: 'Account Created Successfully'
                                })
                            }
                        ).catch(
                            function (error) {
                                console.log(error)
                                reject({
                                    error,
                                    status: 0,
                                    message: 'Unable To Create Account'
                                })
                            }
                        )
                } catch (error) {
                    console.log(error)
                    reject({
                        error,
                        status: 0,
                        message: 'Internal Server Error'
                    })
                }
            }
        )
    }

    login(data) {
        return new Promise(
            async function (resolve, reject) {
                try {
                    const existingUser = await userModel.findOne({ user_email: data.user_email })
                    if (existingUser) {
                        if (decryptPassword(existingUser.user_password) === data.user_password) {
                            const token = userTokenGenerator(existingUser.toObject())
                            resolve({
                                success: existingUser,
                                token: token,
                                status: 1,
                                message: 'Account Has Been Logged In Successfully'
                            })
                        } else {
                            reject({
                                status: 0,
                                message: 'Wrong Password'
                            })
                        }
                    } else {
                        reject({
                            status: 0,
                            message: 'User With This Email Does Not Exist'
                        })
                    }
                } catch (error) {
                    console.log(error)
                    reject({
                        error,
                        status: 0,
                        message: 'Internal Server Error'
                    })
                }
            }
        )
    }

    read(id) {
        return new Promise(
            async function (resolve, reject) {
                try {
                    let user
                    if (id) {
                        user = await userModel.findById(id)
                            .then(
                                function (success) {
                                    resolve({
                                        success,
                                        status: 1,
                                        message: 'User Fetched Successfully'
                                    })
                                }
                            ).catch(
                                function (error) {
                                    console.log(error)
                                    reject({
                                        error,
                                        status: 0,
                                        message: 'Unable To Fetch User'
                                    })
                                }
                            )
                    } else {
                        user = await userModel.find()
                            .then(
                                function (success) {
                                    resolve({
                                        success,
                                        status: 1,
                                        message: 'Users Fetched Successfully'
                                    })
                                }
                            ).catch(
                                function (error) {
                                    console.log(error)
                                    reject({
                                        error,
                                        status: 0,
                                        message: 'Unable To Fetch Users'
                                    })
                                }
                            )
                    }
                } catch (error) {
                    console.log(error)
                    reject({
                        error,
                        status: 0,
                        message: 'Internal Server Error'
                    })
                }
            }
        )
    }
}

module.exports = UserController