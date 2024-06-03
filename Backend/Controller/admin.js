const adminModel = require("../Models/admin")
const { encryptPassword, decryptPassword, adminTokenGenerator } = require("../helper")

class AdminController {
    create(data) {
        return new Promise(
            async function (resolve, reject) {
                try {
                    const existingAdmin = await adminModel.findOne({ admin_email: data.admin_email })
                    if (existingAdmin) {
                        reject({
                            status: 0,
                            message: 'Admin With This Email Already Exists'
                        })
                        return
                    }
                    const admin = new adminModel({
                        admin_name: data.admin_name,
                        admin_password: encryptPassword(data.admin_password),
                        admin_email: data.admin_email
                    })
                    await admin.save()
                        .then(
                            function (success) {
                                resolve({
                                    success,
                                    status: 1,
                                    message: 'Admin Account Created Successfully'
                                })
                            }
                        ).catch(
                            function (error) {
                                console.log(error)
                                reject({
                                    error,
                                    status: 0,
                                    message: 'Unable To Create Admin Account'
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
                    const existingAdmin = await adminModel.findOne({ admin_email: data.admin_email })
                    if (!existingAdmin) {
                        reject({
                            status: 0,
                            message: 'Account With This Email Does Not Exist'
                        })
                        return
                    }
                    if (data.admin_password === decryptPassword(existingAdmin.admin_password) && data.admin_name === existingAdmin.admin_name) {
                        const token = adminTokenGenerator(existingAdmin.toObject())
                        resolve({
                            success: existingAdmin,
                            token,
                            status: 1,
                            message: 'Account Logged In Successfully'
                        })
                    } else {
                        reject({
                            status: 0,
                            message: 'Wrong Password'
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
}

module.exports = AdminController