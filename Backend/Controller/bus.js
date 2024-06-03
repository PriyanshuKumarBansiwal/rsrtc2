const busModel = require("../Models/bus")
const fs = require('fs')

class BusController {
    create(data, files) {
        return new Promise(
            async function (resolve, reject) {
                try {
                    const existingBus = await busModel.findOne({ bus_number: data.bus_number })
                    if (existingBus) {
                        reject({
                            status: 0,
                            message: 'Bus With This Number Already Exists'
                        })
                        return
                    }
                    const image = files.bus_image
                    const time = new Date().getTime()
                    const imageName = time + image.name
                    const destination = './public/Bus/' + imageName
                    image.mv(
                        destination,
                        function (error) {
                            if (error) {
                                console.log(error)
                                reject({
                                    error,
                                    status: 0,
                                    message: 'Unable To Upload Image'
                                })
                            } else {
                                const bus = new busModel({
                                    bus_number: data.bus_number,
                                    bus_image: image.name,
                                    bus_depot: data.bus_depot,
                                    bus_departure: data.bus_departure,
                                    check_in: JSON.parse(data.check_in),
                                    departure_time: data.departure_time,
                                    bus_destination: data.bus_destination,
                                    destination_time: data.destination_time,
                                    time: time,
                                    bus_stops: JSON.parse(data.bus_stops),
                                    bus_route: data.bus_route,
                                    bus_seats: data.bus_seats,
                                    journey_completed: false,
                                    bus_times: JSON.parse(data.bus_times),
                                    display: true
                                })
                                bus.save()
                                    .then(
                                        function (success) {
                                            resolve({
                                                success,
                                                status: 1,
                                                message: 'Bus Saved Successfully'
                                            })
                                        }
                                    ).catch(
                                        function (error) {
                                            console.log(error)
                                            reject({
                                                error,
                                                status: 0,
                                                message: 'Unable To Save Bus'
                                            })
                                        }
                                    )
                            }
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

    read(id, query) {
        return new Promise(
            async function (resolve, reject) {
                try {
                    let bus
                    if (id) {
                        bus = await busModel.findById(id)
                            .then(
                                function (success) {
                                    resolve(
                                        {
                                            success,
                                            status: 1,
                                            message: 'Bus Fetched'
                                        }
                                    )
                                }
                            ).catch(
                                function (error) {
                                    console.log(error)
                                    reject({
                                        error,
                                        status: 0,
                                        message: 'Bus Not Available'
                                    })
                                }
                            )
                    } else {
                        bus = await busModel.find()
                            .then(
                                function (success) {
                                    resolve(
                                        {
                                            success,
                                            status: 1,
                                            message: 'Buses Fetched'
                                        }
                                    )
                                }
                            ).catch(
                                function (error) {
                                    console.log(error)
                                    reject({
                                        error,
                                        status: 0,
                                        message: 'Buses Not Available'
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

    filter(userData) {
        return new Promise(
            async function (resolve, reject) {
                try {
                    const array = []
                    const bus = await busModel.find()
                    for (let data of bus) {
                        const bus_stops = data.bus_stops
                        const bus_times = data.bus_times
                        const check_in = data.check_in
                        if (data.journey_completed === false && data.booked_seats < 45) {
                            for (let data2 of bus_stops) {
                                const busTime = bus_times[bus_stops.indexOf(userData.userDeparture)]
                                const timeArray = busTime?.split(':')
                                if (timeArray) {
                                    const busHour = timeArray[0]
                                    const busMinutes = timeArray[1]
                                    if (parseInt(userData.userHour) < parseInt(busHour) || (parseInt(userData.userHour) === parseInt(busHour) && parseInt(userData.userMinutes) <= parseInt(busMinutes))) {
                                        if (data2 === userData.userDeparture) {
                                            for (let data4 of bus_stops) {
                                                if (data4 === userData.userDestination) {
                                                    if (bus_stops.indexOf(userData.userDestination) > bus_stops.indexOf(userData.userDeparture) && check_in[bus_stops.indexOf(userData.userDeparture)] === false) {
                                                        array.push(data)
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (array.length > 0) {
                        resolve({
                            success: array,
                            status: 1,
                            message: 'Buses Available'
                        })
                    } else {
                        reject({
                            status: 0,
                            message: 'Buses Not Available'
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

    enquiry(bus_number) {
        return new Promise(
            async function (resolve, reject) {
                try {
                    await busModel.findOne({ bus_number: bus_number })
                        .then(
                            function (success) {
                                resolve({
                                    success,
                                    status: 1,
                                    message: 'Bus Available'
                                })
                            }
                        ).catch(
                            function (error) {
                                console.log(error)
                                reject({
                                    error,
                                    status: 0,
                                    message: 'Bus Not Available'
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

    delete(id) {
        return new Promise(
            async function (resolve, reject) {
                try {
                    const existingBus = await busModel.findById(id)
                    if (!existingBus) {
                        reject({
                            status: 0,
                            message: 'Bus Not Available'
                        })
                        return
                    }
                    const image = existingBus.bus_image
                    const time = existingBus.time
                    const imageName = time + image
                    const destination = './public/Bus/' + imageName
                    fs.unlink(destination, async function (error) {
                        if (error) {
                            console.log(error)
                            reject({
                                error,
                                status: 0,
                                message: 'Unable To Delete Image'
                            })
                        } else {
                            await busModel.deleteOne({ _id: existingBus._id })
                                .then(
                                    function (success) {
                                        resolve({
                                            success,
                                            status: 1,
                                            message: 'Bus Deleted Successfully'
                                        })
                                    }
                                ).catch(
                                    function (error) {
                                        console.log(error)
                                        reject({
                                            error,
                                            status: 0,
                                            message: 'Unable To Delete Bus'
                                        })
                                    }
                                )
                        }
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

    update(id, data, files) {
        return new Promise(
            async function (resolve, reject) {
                try {
                    const existingBus = await busModel.findById(id)
                    if (!existingBus) {
                        reject({
                            status: 0,
                            message: 'Bus Not Available'
                        })
                        return
                    }
                    if (files && files.bus_image) {
                        const oldImage = existingBus.bus_image
                        const oldTime = existingBus.time
                        const oldImageName = oldTime + oldImage
                        const oldDestination = './public/Bus/' + oldImageName
                        fs.unlink(oldDestination,
                            async function (error) {
                                if (error) {
                                    console.log(error)
                                    reject({
                                        error,
                                        status: 0,
                                        message: 'Unable To Delete Old Image'
                                    })
                                } else {
                                    const image = files.bus_image
                                    const time = new Date().getTime()
                                    const imageName = time + image.name
                                    const destination = './public/Bus/' + imageName
                                    image.mv(destination,
                                        async function (error) {
                                            if (error) {
                                                console.log(error)
                                                reject({
                                                    error,
                                                    status: 0,
                                                    message: 'Unable To Update Image'
                                                })
                                            } else {
                                                const updatedBus = await busModel.updateOne(
                                                    { _id: existingBus._id },
                                                    {
                                                        $set: {
                                                            bus_number: data.bus_number,
                                                            bus_image: image.name,
                                                            bus_depot: data.bus_depot,
                                                            bus_departure: data.bus_departure,
                                                            check_in: JSON.parse(data.check_in),
                                                            departure_time: data.departure_time,
                                                            bus_destination: data.bus_destination,
                                                            destination_time: data.destination_time,
                                                            time: time,
                                                            bus_stops: JSON.parse(data.bus_stops),
                                                            bus_route: data.bus_route,
                                                            bus_seats: data.bus_seats,
                                                            bus_times: JSON.parse(data.bus_times)
                                                        }
                                                    }
                                                )
                                                if (updatedBus.modifiedCount === 1) {
                                                    resolve({
                                                        updatedBus,
                                                        status: 1,
                                                        message: 'Bus Updated Successfully'
                                                    })
                                                } else {
                                                    reject({
                                                        status: 0,
                                                        message: 'Unable To Update Bus'
                                                    })
                                                }
                                            }
                                        }
                                    )
                                }
                            }
                        )
                    } else {
                        const updatedBus = await busModel.updateOne(
                            { _id: existingBus._id },
                            {
                                $set: {
                                    bus_number: data.bus_number,
                                    bus_depot: data.bus_depot,
                                    bus_departure: data.bus_departure,
                                    check_in: JSON.parse(data.check_in),
                                    departure_time: data.departure_time,
                                    bus_destination: data.bus_destination,
                                    destination_time: data.destination_time,
                                    bus_stops: JSON.parse(data.bus_stops),
                                    bus_route: data.bus_route,
                                    bus_seats: data.bus_seats,
                                    bus_times: JSON.parse(data.bus_times)
                                }
                            }
                        )
                        if (updatedBus.modifiedCount === 1) {
                            resolve({
                                updatedBus,
                                status: 1,
                                message: 'Bus Updated Successfully'
                            })
                        } else {
                            reject({
                                status: 0,
                                message: 'Unable To Update Bus'
                            })
                        }
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

    display(id, status) {
        return new Promise(
            async function (resolve, reject) {
                try {
                    const existingBus = await busModel.findById(id)
                    if (!existingBus) {
                        reject({
                            status: 0,
                            message: 'Bus Not Available'
                        })
                        return
                    }
                    const updatedBus = await busModel.updateOne(
                        { _id: existingBus._id },
                        {
                            $set: {
                                display: status
                            }
                        }
                    )
                    if (updatedBus.modifiedCount === 1) {
                        resolve({
                            updatedBus,
                            status: 1,
                            message: 'Display Status Updated Successfully'
                        })
                    } else {
                        reject({
                            status: 0,
                            message: 'Unable To Update Display Status'
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

    journey(id, status) {
        return new Promise(
            async function (resolve, reject) {
                try {
                    const existingBus = await busModel.findById(id)
                    if (!existingBus) {
                        reject({
                            status: 0,
                            message: 'Bus Not Available'
                        })
                        return
                    }
                    const updatedBus = await busModel.updateOne(
                        { _id: existingBus._id },
                        {
                            $set: {
                                journey_completed: status
                            }
                        }
                    )
                    if (updatedBus.modifiedCount === 1) {
                        resolve({
                            updatedBus,
                            status: 1,
                            message: 'Journey Status Updated Successfully'
                        })
                    } else {
                        reject({
                            status: 0,
                            message: 'Unable To Update Journey Status'
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

    reverseRoute(id, route, bus_stops) {
        return new Promise(
            async function (resolve, reject) {
                try {
                    const existingBus = await busModel.findById(id)
                    if (!existingBus) {
                        reject({
                            status: 0,
                            message: 'Bus Not Available'
                        })
                        return
                    }
                    const routeArray = route.split(' ')
                    const reverseRoute = routeArray[2] + ' ' + routeArray[1] + ' ' + routeArray[0]
                    const reverseRouteArray = []
                    for (let index = bus_stops.length - 1; index >= 0; index--) {
                        reverseRouteArray.push(bus_stops[index])
                    }
                    const updatedBus = await busModel.updateOne(
                        { _id: existingBus._id },
                        {
                            $set: {
                                bus_route: reverseRoute,
                                bus_stops: reverseRouteArray
                            }
                        }
                    )
                    if (updatedBus.modifiedCount === 1) {
                        resolve({
                            updatedBus,
                            status: 1,
                            message: 'Route Has Been Reversed Successfully'
                        })
                    } else {
                        reject({
                            status: 0,
                            message: 'Unable To Reverse Route'
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

module.exports = BusController