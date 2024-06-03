import React, { useContext, useEffect } from 'react'
import { MainContext } from '../context/Context'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Cookies from 'universal-cookie'
import Notfound from './Notfound'
import { jwtDecode } from 'jwt-decode'

function Busfinder() {
    const { hour, foundedBuses, userDate, setUserDate, setFoundedBuses, toggle, setToggle, busData, setBusData, bus, apiBaseUrl, busBaseUrl, minute, timeFormHandler, userDeparture, setUserDeparture, userDestination, setUserDestination, userHour, setUserHour, userMinutes, setUserMinutes } = useContext(MainContext)
    const cookies = new Cookies()
    const navigator = useNavigate()
    const storedUser = cookies.get('user')
    if (!storedUser) { return <Notfound /> }
    try {
        const decodedUser = jwtDecode(storedUser)
        const id = decodedUser._id
        const params = useParams()
        const user_token = params.user_token
        const user_id = params.user_id
        if (user_token === storedUser && id === user_id) {
            return (
                <div className='w-screen'>
                    <div className='2xl:container mx-auto'>
                        <div className='flex flex-col gap-5 py-5'>

                            {/* Search Section */}
                            <div className='flex flex-col px-5 gap-3'>
                                <p className='text-black font-bold text-md md:text-4xl uppercase text-center'> Search For Your Bus Journey </p>
                                <form className='mx-auto md:w-full flex flex-col md:flex-row items-center justify-center gap-10' onSubmit={function (event) { timeFormHandler(event) }} method='post'>
                                    <input value={userDate} onChange={function (event) { setUserDate(event.target.value) }} required={true} name='user_date' id='user_date' className='border focus:outline-none p-5 w-full uppercase rounded-md' type="date" />
                                    <div className='flex items-center w-full justify-center gap-3'>
                                        <select onChange={function (event) { setUserHour(event.target.value) }} required={true} value={userHour ? userHour : undefined} className='border focus:outline-none w-full p-5 capitalize rounded-md' name="user_hour" id="user_hour">
                                            <option hidden={true} > Enter Hour Here </option>
                                            {hour.map(function (data, index) { return <option key={index} value={data.value}> {data.name} </option> })}
                                        </select>
                                        <p className='font-bold hidden text-2xl md:block'> : </p>
                                        <select onChange={function (event) { setUserMinutes(event.target.value) }} value={userMinutes ? userMinutes : undefined} required={true} className='border w-full focus:outline-none p-5 capitalize rounded-md' name="user_minutes" id="user_minutes">
                                            <option hidden={true}> Select Minutes Here </option>
                                            {minute.map(function (data, index) { return <option key={index} value={data.value}> {data.name}</option> })}
                                        </select>
                                    </div>
                                    <div className='flex items-center w-full justify-center gap-3'>
                                        <input required={true} placeholder='Enter Departure Location' className='border   w-full focus:outline-none p-5 capitalize rounded-md' name='user_departure' id='user_departure' value={userDeparture} onChange={function (event) { setUserDeparture(event.target.value.trim().charAt(0).toUpperCase() + event.target.value.slice(1)) }} type="text" />
                                        <input required={true} placeholder='Enter Destination Location' className='border w-full focus:outline-none p-5 capitalize rounded-md' name='user_destination' id='user_destination' value={userDestination} onChange={function (event) { setUserDestination(event.target.value.trim().charAt(0).toUpperCase() + event.target.value.slice(1)) }} type="text" />
                                    </div>
                                    <button className='bg-blue-600 w-full hover:bg-blue-700 p-5 rounded text-white' type="submit"> Search </button>
                                </form>
                            </div>

                            {/* Display Section */}
                            <div className='flex flex-col px-5 gap-3'>
                                <p className='text-black font-bold text-4xl uppercase text-center'> Available Services </p>
                                <div className='w-full grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
                                    {bus.length > 0 ? (bus.map(function (data) {
                                        return (<div key={data._id} className='w-full border rounded-md group text-white overflow-hidden hover:shadow-xl bg-blue-700'>
                                            <div className='w-full h-[400px] flex items-center bg-white justify-center text-center relative'>
                                                <div className='w-full h-full bg-[#00000050] absolute z-10 top-0 grid place-items-center left-0 opacity-0 group-hover:opacity-100 duration-500'>
                                                    <button onClick={function () { setToggle(true); setBusData(data) }} className='bg-blue-600 p-5 text-white rounded-lg duration-300 hover:bg-blue-800'> Book Now </button>
                                                </div>
                                                <p className={`bg-blue-600 w-fit p-3 rounded-md absolute top-3 right-3 ${data.bus_stops.length <= 2 ? 'block' : 'hidden'}`}> Non Stop </p>
                                                <img className='p-3 w-72 group-hover:w-80 group-hover:blur-[10px] duration-500' src={apiBaseUrl + busBaseUrl + '/' + data.time + data.bus_image} alt="Bus Image Here" />
                                            </div>
                                            <p className='font-bold text-2xl text-center py-1'> {data.bus_number} </p>
                                            <p className='font-bold text-2xl text-center py-1'> {data.bus_route} </p>
                                            <p className={`font-bold text-sm text-center ${data.bus_stops.length > 2 ? 'block' : 'hidden'}`}> Via </p>
                                            <p className='font-bold text-sm flex items-center justify-center text-left mx-auto w-fit gap-2 py-3'> {data.bus_stops.slice(1, -1).map(function (busStop, index) { return <span key={index}> {busStop} </span> })} </p>
                                        </div>)
                                    })) : foundedBuses.length > 0 ? (foundedBuses.map(function (data) {
                                        return (<div key={data._id} className='w-full border rounded-md group text-white overflow-hidden hover:shadow-xl bg-blue-700'>
                                            <div className='w-full h-[400px] flex items-center bg-white justify-center text-center relative'>
                                                <div className='w-full h-full bg-[#00000050] absolute z-10 top-0 grid place-items-center left-0 opacity-0 group-hover:opacity-100 duration-500'>
                                                    <Link to={'/booking-form/' + storedUser + '/' + id + '/' + data._id + '/' + data.bus_stops} onClick={function () { setToggle(true); setBusData(data) }} className='bg-blue-600 p-5 text-white rounded-lg duration-300 hover:bg-blue-800'> Book Now </Link>
                                                </div>
                                                <p className={`bg-blue-600 w-fit p-3 rounded-md absolute top-3 right-3 ${data.bus_stops.length <= 2 ? 'block' : 'hidden'}`}> Non Stop </p>
                                                <img className='p-3 w-72 group-hover:w-80 group-hover:blur-[10px] duration-500' src={apiBaseUrl + busBaseUrl + '/' + data.time + data.bus_image} alt="Bus Image Here" />
                                            </div>
                                            <p className='font-bold text-2xl text-center py-1'> {data.bus_number} </p>
                                            <p className='font-bold text-2xl text-center py-1'> {data.bus_route} </p>
                                            <p className={`font-bold text-sm text-center ${data.bus_stops.length > 2 ? 'block' : 'hidden'}`}> Via </p>
                                            <p className='font-bold text-sm flex items-center justify-center text-left mx-auto w-fit gap-2 py-3'> {data.bus_stops.slice(1, -1).map(function (busStop, index) { return <span key={index}> {busStop} </span> })} </p>
                                        </div>)
                                    })) : <p> No Bus Available </p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <Notfound />
        }
    } catch (error) {
        return <Notfound />
    }

}

export default Busfinder