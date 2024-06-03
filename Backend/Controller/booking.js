const bookingModel = require("../Models/booking")
const busModel = require("../Models/bus")
const fareModel = require("../Models/fare")

class BookingController {
    create(data) {
        return new Promise(
            async function (resolve, reject) {
                try {
                    let male_fare
                    let female_fare
                    let child_fare
                    const bus = await busModel.findById(data.bus_id)
                    const fare = await fareModel.findOne({ journey: data.departure + ' To ' + data.destination })
                    const reverseFare = await fareModel.findOne({ journey: data.destination + ' To ' + data.departure })
                    if (!bus) {
                        reject({
                            status: 0,
                            message: 'Bus Not Available'
                        })
                        return
                    }
                    if (fare) {
                        male_fare = fare.fare * parseInt(data.male)
                        female_fare = fare.ladies_fare * parseInt(data.female)
                        child_fare = fare.child_fare * parseInt(data.child)
                    } else if (reverseFare) {
                        male_fare = reverseFare.fare * parseInt(data.male)
                        female_fare = reverseFare.ladies_fare * parseInt(data.female)
                        child_fare = reverseFare.child_fare * parseInt(data.child)
                    } else {
                        reject({
                            status: 0,
                            message: 'Fare Not Available'
                        })
                    }
                    const userSeat = parseInt(data.male) + parseInt(data.female) + parseInt(data.child)
                    const remainingSeats = bus.bus_seats - bus.booked_seats
                    if (userSeat <= remainingSeats) {
                        const total_fare = parseInt(male_fare) + parseInt(female_fare) + parseInt(child_fare)
                        const array = []
                        for (let i = bus.booked_seats + 1; i <= bus.booked_seats + userSeat; i++) {
                            const string = i.toString()
                            array.push(string)
                        }
                        const booking = await new bookingModel({
                            booker: data.booker,
                            male: data.male,
                            female: data.female,
                            child: data.child,
                            seat_number: array,
                            payment_status: false,
                            total_fare: total_fare,
                            departure: data.departure,
                            destination: data.destination,
                            bus_id: bus._id,
                            user_id: data.user_id,
                            departure_date: data.userDate
                        })
                        await booking.save()
                            .then(
                                async function (success) {
                                    const updatedBus = await busModel.updateOne(
                                        { _id: bus._id },
                                        {
                                            $set: {
                                                booked_seats: bus.booked_seats + parseInt(array.length)
                                            }
                                        }
                                    )
                                    if (updatedBus.modifiedCount === 1) {
                                        resolve({
                                            success,
                                            status: 1,
                                            message: 'Booking Created Successfully'
                                        })
                                    } else {
                                        reject({
                                            error,
                                            status: 0,
                                            message: 'Unable To Create Booking'
                                        })
                                    }
                                }
                            ).catch(
                                function (error) {
                                    console.log(error)
                                    reject({
                                        error,
                                        status: 0,
                                        message: 'Unable To Create Booking'
                                    })
                                }
                            )
                    } else {
                        console.error('Insufficient Seats')
                        reject({
                            status: 0,
                            message: 'Insufficient Seats'
                        })
                    }
                } catch (error) {
                    console.error(error)
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
                    let booking
                    if (id) {
                        booking = await bookingModel.findById(id).populate(['bus_id'])
                            .then(
                                function (success) {
                                    resolve({
                                        success,
                                        status: 1,
                                        message: 'Booking Fetched'
                                    })
                                }
                            ).catch(
                                function (error) {
                                    console.log(error)
                                    reject({
                                        error,
                                        status: 0,
                                        message: 'Unable To Fetch Booking'
                                    })
                                }
                            )
                    } else {
                        booking = await bookingModel.find().populate('bus_id')
                            .then(
                                function (success) {
                                    resolve({
                                        success,
                                        status: 1,
                                        message: 'Bookings Fetched'
                                    })
                                }
                            ).catch(
                                function (error) {
                                    console.log(error)
                                    reject({
                                        error,
                                        status: 0,
                                        message: 'Unable To Fetch Bookings'
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

    updatePayment(id, status) {
        return new Promise(
            async function (resolve, reject) {
                try {
                    const existingBooking = await bookingModel.findById(id)
                    if (!existingBooking) {
                        reject({
                            status: 0,
                            message: 'Booking Does Not Exist'
                        })
                        return
                    }
                    const updatedBooking = await bookingModel.updateOne(
                        { _id: existingBooking._id },
                        {
                            $set: {
                                payment_status: status
                            }
                        }
                    )
                    if (updatedBooking.modifiedCount === 1) {
                        resolve({
                            updatedBooking,
                            status: 1,
                            message: 'Payment Status Updated Successfully'
                        })
                    } else {
                        reject({
                            status: 0,
                            message: 'Unable To Update Payment Status'
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

    userTicket(id) {
        return new Promise(
            async function (resolve, reject) {
                try {
                    const existingBooking = await bookingModel.find({ user_id: id }).populate(['bus_id', 'user_id'])
                    if (!existingBooking) {
                        reject({
                            status: 0,
                            message: 'Booking Does Not Exist'
                        })
                        return
                    }
                    resolve({
                        success: existingBooking,
                        status: 1,
                        message: 'Bookings Found'
                    })
                } catch (error) {
                    console.error(error)
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

module.exports = BookingController