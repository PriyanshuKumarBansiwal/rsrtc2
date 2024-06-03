const fareModel = require("../Models/fare")

class FareController {
    create(data) {
        return new Promise(
            async function (resolve, reject) {
                try {
                    const journey = data.journey
                    const journeyArray = journey.split(' ')
                    const reverseArray = journeyArray[2] + ' ' + journeyArray[1] + ' ' + journeyArray[0]
                    const existingFare = await fareModel.findOne({ journey: data.journey })
                    const existingReverseFare = await fareModel.findOne({ journey: reverseArray })
                    if (existingFare || existingReverseFare) {
                        reject({
                            status: 0,
                            message: 'The Fare Of This Journey Is Already Available'
                        })
                        return
                    }
                    const fare = await new fareModel({
                        journey: data.journey,
                        fare: data.fare,
                        ladies_fare: data.ladies_fare,
                        child_fare: data.child_fare
                    })
                    await fare.save()
                        .then(
                            function (success) {
                                resolve({
                                    success,
                                    status: 1,
                                    message: 'Fare Added Successfully'
                                })
                            }
                        ).catch(
                            function (error) {
                                console.log(error)
                                reject({
                                    error,
                                    status: 0,
                                    message: 'Unable To Add Fare'
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

    read(journey) {
        return new Promise(
            async function (resolve, reject) {
                try {
                    if (journey) {
                        const journeyArray = journey.split(' ')
                        const reversePath = journeyArray[2] + ' ' + journeyArray[1] + ' ' + journeyArray[0]
                        const normalPath = await fareModel.findOne({ journey: journey })
                        const reverseJourney = await fareModel.findOne({ journey: reversePath })
                        if (normalPath) {
                            resolve({
                                success: normalPath,
                                status: 1,
                                message: 'Fare Found'
                            })
                        } else if (reverseJourney) {
                            resolve({
                                success: reverseJourney,
                                status: 1,
                                message: 'Fare Found'
                            })
                        } else {
                            reject({
                                status: 0,
                                message: 'Fare Not Found'
                            })
                        }
                    } else {
                        await fareModel.find()
                            .then(
                                function (success) {
                                    resolve({
                                        success,
                                        status: 1,
                                        message: 'Fares Found'
                                    })
                                }
                            ).catch(
                                function (error) {
                                    console.log(error)
                                    reject({
                                        error,
                                        status: 0,
                                        message: 'Fares Not Available'
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

    update(id, data) {
        return new Promise(
            async function (resolve, reject) {
                try {
                    const existingFare = await fareModel.findOne({ _id: id })
                    if (!existingFare) {
                        reject({
                            status: 0,
                            message: 'Fare Not Available'
                        })
                        return
                    }

                    const updatedFare = await fareModel.updateOne(
                        { _id: existingFare._id },
                        {
                            $set: {
                                journey: data.journey,
                                fare: data.fare,
                                ladies_fare: data.ladies_fare,
                                child_fare: data.child_fare
                            }
                        }
                    )
                    if (updatedFare.modifiedCount === 1) {
                        resolve({
                            updatedFare,
                            status: 1,
                            message: 'Fare Has Been Updated Successfully'
                        })
                    } else {
                        reject({
                            status: 0,
                            message: 'Unable To Update The Fare'
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

    delete(id) {
        return new Promise(
            async function (resolve, reject) {
                try {
                    const existingFare = await fareModel.findById(id)
                    if (!existingFare) {
                        reject({
                            status: 0,
                            message: 'Fare Not Available'
                        })
                        return
                    }
                    await fareModel.deleteOne({ _id: existingFare._id })
                        .then(
                            function (success) {
                                resolve({
                                    success,
                                    status: 1,
                                    message: 'Fare Has Been Deleted Successfully'
                                })
                            }
                        ).catch(
                            function (error) {
                                console.log(error)
                                reject({
                                    error,
                                    status: 0,
                                    message: 'Unable To Delete The Fare'
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
}

module.exports = FareController