const hotelModel = require("../Models/hotel")

class HotelController {
    create(data, files) {
        return new Promise(
            async function (resolve, reject) {
                try {
                    const image = files.hotel_image
                    const time = new Date().getTime()
                    const imageName = time + image.name
                    const destination = './public/Hotel/' + imageName
                    image.mv(
                        destination,
                        function (error) {
                            if (error) {
                                console.log(error)
                                reject({
                                    error,
                                    status: 0,
                                    message: 'Image Not Uploaded'
                                })
                            } else {
                                const hotel = new hotelModel(
                                    {
                                        hotel_name: data.hotel_name,
                                        hotel_location: data.hotel_location,
                                        hotel_category: data.hotel_category,
                                        hotel_discount: data.hotel_discount,
                                        hotel_rating: data.hotel_rating,
                                        hotel_image: image.name,
                                        minimum_order_price: data.minimum_order_price,
                                        maximum_order_price: data.maximum_order_price,
                                        discount_percentage: data.discount_percentage,
                                        delivery_time: data.delivery_time,
                                    }
                                )
                                hotel.save()
                                    .then(
                                        function (success) {
                                            resolve({
                                                success,
                                                status: 1,
                                                message: 'Hotel Added Successfully'
                                            })
                                        }
                                    ).catch(
                                        function (error) {
                                            console.log(error)
                                            reject({
                                                error,
                                                status: 0,
                                                messsage: 'Unable To Add Hotel'
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
}

module.exports = HotelController