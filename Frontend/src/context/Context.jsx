import React, { createContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Cookies from 'universal-cookie'
import { jwtDecode } from 'jwt-decode'

const MainContext = createContext()

function Context(props) {
    const [bus, setBus] = useState([])
    const [userTime, setUserTime] = useState('')
    const [userHour, setUserHour] = useState('')
    const [userMinutes, setUserMinutes] = useState('')
    const [userDate, setUserDate] = useState('')
    const [userDeparture, setUserDeparture] = useState('')
    const [userDestination, setUserDestination] = useState('')
    const [fare, setFare] = useState([])
    const [toggle, setToggle] = useState(false)
    const [busData, setBusData] = useState(null)
    const [foundedBuses, setFoundedBuses] = useState([])
    const [enquiry, setEnquiry] = useState(null)
    const [formToggle, setFormToggle] = useState(false)
    const [update, setUpdate] = useState(false)
    const [fareData, setFareData] = useState(null)
    const [user, setUser] = useState(null)
    const [admin, setAdmin] = useState(null)
    const [booking, setBooking] = useState([])
    const [ticket, setTicket] = useState([])

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
    const busBaseUrl = import.meta.env.VITE_BUS_BASE_URL
    const fareBaseUrl = import.meta.env.VITE_FARE_BASE_URL
    const bookingBaseUrl = import.meta.env.VITE_BOOKING_BASE_URL
    const userBaseUrl = import.meta.env.VITE_USER_BASE_URL
    const adminBaseUrl = import.meta.env.VITE_ADMIN_BASE_URL

    const busFormRef = useRef(null)
    const busNumberRef = useRef(null)
    const busDepotRef = useRef(null)
    const busStopsRef = useRef(null)
    const busTimesRef = useRef(null)
    const busCheckRef = useRef(null)
    const busRouteRef = useRef(null)
    const busDepartureRef = useRef(null)
    const departureTimeRef = useRef(null)
    const busDestinationRef = useRef(null)
    const destinationTimeRef = useRef(null)
    const busImageRef = useRef(null)

    const fareFormRef = useRef(null)
    const fareJourneyRef = useRef(null)
    const maleFareRef = useRef(null)
    const femaleFareRef = useRef(null)
    const childFareRef = useRef(null)

    const cookies = new Cookies()

    const hour = [
        {
            name: '00',
            value: '0'
        },
        {
            name: '01',
            value: 1
        },
        {
            name: '02',
            value: 2
        },
        {
            name: '03',
            value: 3
        },
        {
            name: '04',
            value: 4
        },
        {
            name: '05',
            value: 5
        },
        {
            name: '06',
            value: 6
        },
        {
            name: '07',
            value: 7
        },
        {
            name: '08',
            value: 8
        },
        {
            name: '09',
            value: 9
        },
        {
            name: '10',
            value: 10
        },

        {
            name: '11',
            value: 11
        },
        {
            name: '12',
            value: 12
        },
        {
            name: '13',
            value: 13
        },
        {
            name: '14',
            value: 14
        },
        {
            name: '15',
            value: 15
        },
        {
            name: '16',
            value: 16
        },
        {
            name: '17',
            value: 17
        },
        {
            name: '18',
            value: 18
        },
        {
            name: '19',
            value: 19
        },
        {
            name: '20',
            value: 20
        },
        {
            name: '21',
            value: 21
        },
        {
            name: '22',
            value: 22
        },
        {
            name: '23',
            value: 23
        }
    ]

    const minute = [
        {
            name: '00',
            value: 0
        },
        {
            name: '15',
            value: 15
        },
        {
            name: '30',
            value: 30
        },
        {
            name: '45',
            value: 45
        }
    ]

    function busReader() {
        axios.get(apiBaseUrl + busBaseUrl + '/read')
            .then(
                function (success) {
                    setBus(success.data.success)
                }
            ).catch(
                function (error) {
                    console.error(error)
                }
            )
    }

    function timeFormHandler(event) {
        event.preventDefault()
        if (userDeparture !== userDestination) {
            setUserTime(userHour + ':' + userMinutes)
            const data = { userHour, userMinutes, userDeparture, userDestination }
            axios.post(apiBaseUrl + busBaseUrl + '/filter', data)
                .then(
                    function (success) {
                        if (success.data.status === 1) {
                            setBus([])
                            setFoundedBuses(success.data.success)
                            setUserHour('')
                            setUserMinutes('')
                            setUserDeparture('')
                            setUserDestination('')
                            event.target.reset()
                        } else {
                            console.error(success.data.message)
                            setUserHour('')
                            setUserMinutes('')
                            setUserDeparture('')
                            setUserDestination('')
                            setBus([])
                            setFoundedBuses([])
                            event.target.reset()
                        }
                    }
                ).catch(
                    function (error) {
                        console.error(error)
                    }
                )
            // fareReader(userDeparture, userDestination)
        } else {
            console.log('Invalid Location')
        }
    }

    function enquiryFormHandler(event) {
        event.preventDefault()
        const bus_number = event.target.bus_number.value
        axios.post(apiBaseUrl + busBaseUrl + '/enquiry/' + bus_number)
            .then(
                function (success) {
                    if (success.data.status === 1) {
                        setEnquiry(success.data.success)
                    } else {
                        console.error(success.data.message)
                    }
                }
            ).catch(
                function (error) {
                    console.error(error)
                }
            )
    }

    function fareReader() {
        axios.get(apiBaseUrl + fareBaseUrl + '/read')
            .then(
                function (success) {
                    if (success.data.status === 1) {
                        setFare(success.data.success)
                    } else {
                        console.error(success.data.success)
                    }
                }
            ).catch(
                function (error) {
                    console.error(error)
                }
            )

    }

    function busFormHandler(event) {
        if (formToggle === true && update === false) {
            event.preventDefault()
            const formData = new FormData()
            const bus_number = event.target.bus_number.value.trim()
            const bus_route = event.target.bus_route.value.trim()
            const bus_departure = event.target.bus_departure.value.trim()
            const departure_time = event.target.departure_time.value.trim()
            const bus_destination = event.target.bus_destination.value.trim()
            const destination_time = event.target.destination_time.value.trim()
            const bus_stops = event.target.bus_stops.value.split(',').map(function (data) { return data.trim() })
            const bus_times = event.target.bus_times.value.split(',').map(function (data) { return data.trim() })
            const check_in = event.target.check_in.value.split(',').map(function (data) {
                if (data.trim() === '0' || data.trim() === false || data.trim() === 'false') { return false }
                else if (data.trim() === '1' || data.trim() === true || data.trim() === 'true') { return true }
            })
            const bus_image = event.target.bus_image.files[0]
            const bus_depot = event.target.bus_depot.value.trim()
            formData.append('bus_number', bus_number)
            formData.append('bus_route', bus_route)
            formData.append('bus_departure', bus_departure)
            formData.append('departure_time', departure_time)
            formData.append('bus_destination', bus_destination)
            formData.append('destination_time', destination_time)
            formData.append('bus_stops', JSON.stringify(bus_stops))
            formData.append('bus_times', JSON.stringify(bus_times))
            formData.append('check_in', JSON.stringify(check_in))
            formData.append('bus_image', bus_image)
            formData.append('bus_depot', bus_depot)
            axios.post(apiBaseUrl + busBaseUrl + '/create', formData)
                .then(
                    function (success) {
                        if (success.data.status === 1) {
                            toast.success(success.data.message)
                            busReader()
                            setFormToggle(false)
                            setUpdate(false)
                            event.target.reset()
                        } else {
                            toast.error(success.data.message)
                        }
                    }
                ).catch(
                    function (error) {
                        console.error(error)
                    }
                )
        } else if (formToggle === true && update === true) {
            busUpdater(event)
        }
    }

    function busUpdater(event) {
        event.preventDefault()
        const formData = new FormData()
        const bus_number = busNumberRef.current.value.trim()
        const bus_route = busRouteRef.current.value.trim()
        const bus_departure = busDepartureRef.current.value.trim()
        const departure_time = departureTimeRef.current.value.trim()
        const bus_destination = busDestinationRef.current.value.trim()
        const destination_time = destinationTimeRef.current.value.trim()
        const bus_stops = busStopsRef.current.value.split(',').map(function (data) { return data.trim() })
        const bus_times = busTimesRef.current.value.split(',').map(function (data) { return data.trim() })
        const check_in = busCheckRef.current.value.split(',').map(function (data) {
            if (data.trim() === '0' || data.trim() === false || data.trim() === 'false') { return false }
            else if (data.trim() === '1' || data.trim() === true || data.trim() === 'true') { return true }
        })
        const bus_image = event.target.bus_image.files[0]
        const bus_depot = busDepotRef.current.value.trim()
        formData.append('bus_number', bus_number)
        formData.append('bus_route', bus_route)
        formData.append('bus_departure', bus_departure)
        formData.append('departure_time', departure_time)
        formData.append('bus_destination', bus_destination)
        formData.append('destination_time', destination_time)
        formData.append('bus_stops', JSON.stringify(bus_stops))
        formData.append('bus_times', JSON.stringify(bus_times))
        formData.append('check_in', JSON.stringify(check_in))
        formData.append('bus_image', bus_image)
        formData.append('bus_depot', bus_depot)
        axios.put(apiBaseUrl + busBaseUrl + '/update/' + busData._id, formData)
            .then(
                function (success) {
                    if (success.data.status === 1) {
                        toast.success(success.data.message)
                        setFormToggle(false)
                        setUpdate(false)
                        busReader()
                    } else {
                        toast.error(success.data.message)
                    }
                }
            ).catch(
                function (error) {
                    console.error(error)
                }
            )
    }

    function displayUpdater(id, status) {
        axios.patch(apiBaseUrl + busBaseUrl + '/display/' + id + '/' + status)
            .then(
                function (success) {
                    if (success.data.status === 1) {
                        toast.success(success.data.message)
                        busReader()
                    } else {
                        toast.error(success.data.message)
                    }
                }
            ).catch(
                function (error) {
                    console.error(error)
                }
            )
    }

    function journeyUpdater(id, status) {
        axios.patch(apiBaseUrl + busBaseUrl + '/journey/' + id + '/' + status)
            .then(
                function (success) {
                    if (success.data.status === 1) {
                        toast.success(success.data.message)
                        busReader()
                    } else {
                        toast.error(success.data.message)
                    }
                }
            ).catch(
                function (error) {
                    console.error(error)
                }
            )
    }

    function busDeleter(id) {
        axios.delete(apiBaseUrl + busBaseUrl + '/delete/' + id)
            .then(
                function (success) {
                    if (success.data.status === 1) {
                        toast.success(success.data.message)
                        busReader()
                    } else {
                        toast.error(success.data.message)
                    }
                }
            ).catch(
                function (error) {
                    console.error(error)
                }
            )
    }

    function routeReverser(id, route, bus_stops) {
        axios.patch(apiBaseUrl + busBaseUrl + '/reverse-route/' + id + '/' + route, bus_stops)
            .then(
                function (success) {
                    if (success.data.status === 1) {
                        busReader()
                        toast.success(success.data.message)
                    } else {
                        toast.error(success.data.message)
                    }
                }
            ).catch(
                function (error) {
                    console.error(error)
                }
            )
    }

    function fareFormHandler(event) {
        event.preventDefault()
        if (formToggle === true && update === false) {
            const journey = event.target.journey.value
            const fare = event.target.fare.value
            const ladies_fare = event.target.ladies_fare.value
            const child_fare = event.target.child_fare.value
            const data = { journey, fare, ladies_fare, child_fare }
            axios.post(apiBaseUrl + fareBaseUrl + '/create', data)
                .then(
                    function (success) {
                        if (success.data.status === 1) {
                            fareReader()
                            setFormToggle(false)
                            setUpdate(false)
                            event.target.reset()
                            toast.success(success.data.message)
                        } else {
                            toast.error(success.data.message)
                        }
                    }
                ).catch(
                    function (error) {
                        console.error(error)
                    }
                )
        } else {
            fareUpdater()
        }
    }

    function fareUpdater() {
        const journey = fareJourneyRef.current.value
        const fare = maleFareRef.current.value
        const ladies_fare = femaleFareRef.current.value
        const child_fare = childFareRef.current.value
        const data = { journey, fare, ladies_fare, child_fare }
        axios.put(apiBaseUrl + fareBaseUrl + '/update/' + fareData._id, data)
            .then(
                function (success) {
                    if (success.data.status === 1) {
                        fareReader()
                        setFormToggle(false)
                        setUpdate(false)
                        fareFormRef.current.reset()
                        toast.success(success.data.message)
                    } else {
                        toast.error(success.data.message)
                    }
                }
            ).catch(
                function (error) {
                    console.error(error)
                }
            )
    }

    function fareDeleter(id) {
        axios.delete(apiBaseUrl + fareBaseUrl + '/delete/' + id)
            .then(
                function (success) {
                    if (success.data.status === 1) {
                        fareReader()
                        toast.success(success.data.message)
                    } else {
                        toast.error(success.data.message)
                    }
                }
            ).catch(
                function (error) {
                    console.error(error)
                }
            )
    }

    function bookingFormHandler(event, bus_id, stopsArray, user_id, navigator) {
        event.preventDefault()
        console.log(user_id)
        const booker = event.target.booker.value
        const male = event.target.male.value
        const female = event.target.female.value
        const child = event.target.child.value
        const departure = event.target.departure.value
        const destination = event.target.destination.value
        if (stopsArray.indexOf(destination) > stopsArray.indexOf(departure)) {
            const data = { booker, male, female, child, departure, destination, bus_id, user_id, userDate }
            axios.post(apiBaseUrl + bookingBaseUrl + '/create', data)
                .then(
                    function (success) {
                        if (success.data.status === 1) {
                            event.target.reset()
                            setToggle(false)
                            navigator('/my-ticket/' + user_id)
                        } else {
                            console.error(success.data.message)
                        }
                    }
                ).catch(
                    function (error) {
                        console.error(error)
                    }
                )
        } else {
            console.error('Invalid Locations')
        }
    }

    function adminFormHandler(event, navigator) {
        event.preventDefault()
        const admin_name = event.target.admin_name.value
        const admin_email = event.target.admin_email.value
        const admin_password = event.target.admin_password.value
        const data = { admin_name, admin_email, admin_password }
        axios.post(apiBaseUrl + adminBaseUrl + '/login', data)
            .then(
                function (success) {
                    if (success.data.status === 1) {
                        const token = success.data.token
                        const id = success.data.success._id
                        cookies.set('admin', token, { expires: new Date(Date.now() + 3600000), secure: true, sameSite: true })
                        event.target.reset()
                        setAdmin(jwtDecode(token))
                        navigator('/admin/' + token + '/' + id)
                    } else {
                        console.error(success.data.message)
                    }
                }
            ).catch(
                function (error) {
                    console.error(error)
                }
            )
    }

    function cookieToAdmin() {
        const storedAdmin = cookies.get('admin')
        if (storedAdmin) {
            const decodedAdmin = jwtDecode(storedAdmin)
            setAdmin(decodedAdmin)
        }
    }

    function adminRemover() {
        cookies.remove('admin')
        setAdmin(null)
    }

    function bookingUpdater(id, status) {
        if (cookies && cookies.get('admin')) {
            axios.patch(apiBaseUrl + bookingBaseUrl + '/payment/' + id + '/' + status, {}, { headers: { Authorization: cookies.get('admin') } })
                .then(
                    function (success) {
                        if (success.data.status === 1) {
                            console.log(success.data.message)
                            bookingReader()
                            toast.success(success.data.message)
                        } else {
                            toast.error(success.data.message)
                        }
                    }
                ).catch(
                    function (error) {
                        console.error(error)
                    }
                )
        } else {
            return null
        }
    }

    function signupFormHandler(event) {
        event.preventDefault()
        const user_name = event.target.user_name.value
        const user_email = event.target.user_email.value
        const user_password = event.target.user_password.value
        const contact_number = event.target.contact_number.value
        const data = { user_name, user_email, user_password, contact_number }
        axios.post(apiBaseUrl + userBaseUrl + '/create', data)
            .then(
                function (success) {
                    if (success.data.status === 1) {
                        toast.success(success.data.message)
                    } else {
                        toast.error(success.data.message)
                    }
                }
            ).catch(
                function (error) {
                    console.error(error)
                }
            )
    }

    function loginFormHandler(event, navigator) {
        event.preventDefault()
        const user_name = event.target.user_name.value
        const user_email = event.target.user_email.value
        const user_password = event.target.user_password.value
        const confirm_password = event.target.confirm_password.value
        const data = { user_name, user_email, user_password }
        if (user_password === confirm_password) {
            axios.post(apiBaseUrl + userBaseUrl + '/login', data)
                .then(
                    function (success) {
                        if (success.data.status === 1) {
                            toast.success(success.data.message)
                            const token = success.data.token
                            cookies.set('user', token, { expires: new Date(Date.now() + 3600000), secure: true, sameSite: true })
                            const decodedUser = jwtDecode(token)
                            const id = decodedUser._id
                            setUser(decodedUser)
                            navigator('/')
                        } else {
                            toast.error(success.data.message)
                        }
                    }
                ).catch(
                    function (error) {
                        console.error(error)
                    }
                )
        } else {
            toast.error('Both Passowrds Should Match')
        }
    }

    function bookingReader() {
        if (cookies && cookies.get('admin')) {
            axios.get(apiBaseUrl + bookingBaseUrl + '/read', { headers: { Authorization: cookies.get('admin') } })
                .then(
                    function (success) {
                        if (success.data.status === 1) {
                            setBooking(success.data.success)
                        } else {
                            console.error(success.data.message)
                        }
                    }
                ).catch(
                    function (error) {
                        console.error(error)
                    }
                )
        } else {
            return null
        }

    }

    function cookieToUser() {
        const storedUser = cookies.get('user')
        if (storedUser) {
            const decodedUser = jwtDecode(storedUser)
            setUser(decodedUser)
        } else {
            return null
        }
    }

    function userRemover() {
        if (user && cookies && cookies.get('user')) {
            cookies.remove('user')
            setUser(null)
        }
    }

    function ticketReader() {
        if (cookies && cookies.get('user')) {
            const storedUser = cookies.get('user')
            const decodedUser = jwtDecode(storedUser)
            const user_id = decodedUser._id
            axios.get(apiBaseUrl + bookingBaseUrl + '/user-ticket/' + user_id, { headers: { Authorization: storedUser } })
                .then(
                    function (success) {
                        if (success.data.status === 1) {
                            setTicket(success.data.success)
                        } else {
                            console.log(success.data.message)
                        }
                    }
                ).catch(
                    function (error) {
                        console.log(error)
                    }
                )
        }
    }

    useEffect(
        function () {
            busReader()
            fareReader()
            cookieToAdmin()
            bookingReader()
            cookieToUser()
            ticketReader()
        },
        []
    )

    return (
        <MainContext.Provider value={
            {
                userDestination, setUserDestination,
                apiBaseUrl, busBaseUrl, fareBaseUrl, userBaseUrl, adminBaseUrl,
                hour, minute,
                bus, setBus,
                userTime, setUserTime,
                userDate, setUserDate,
                userDeparture, setUserDeparture,
                busData, setBusData,
                ticket, setTicket,
                fare, setFare,
                fareData, setFareData,
                bookingFormHandler, adminFormHandler, timeFormHandler, signupFormHandler, fareFormHandler, loginFormHandler, busFormHandler, enquiryFormHandler,
                bookingReader, busReader, fareReader, ticketReader,
                bookingUpdater, displayUpdater, journeyUpdater, busUpdater, routeReverser, fareUpdater,
                userRemover, adminRemover, fareDeleter, busDeleter,
                user, setUser,
                foundedBuses, setFoundedBuses,
                userHour, setUserHour,
                userMinutes, setUserMinutes,
                toggle, setToggle,
                booking, setBooking,
                enquiry, setEnquiry,
                formToggle, setFormToggle,
                update, setUpdate,
                busFormRef, busNumberRef, busDepotRef, busStopsRef, busImageRef, busTimesRef, busCheckRef, busRouteRef, busDepartureRef, departureTimeRef, busDestinationRef, destinationTimeRef,
                fareFormRef, fareJourneyRef, maleFareRef, femaleFareRef, childFareRef
            }
        }>
            {props.children}
        </MainContext.Provider >
    )
}

export default Context
export { MainContext }