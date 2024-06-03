import React, { useContext } from 'react'
import { MainContext } from '../context/Context'
import { FaTimes } from 'react-icons/fa'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Bus() {
    const { formToggle, setFormToggle, routeReverser, displayUpdater, busImageRef, busData, setBusData, busFormHandler, bus, update, setUpdate, busDeleter, busFormRef, busNumberRef, journeyUpdater, busDepotRef, busStopsRef, busTimesRef, busCheckRef, busRouteRef, busDepartureRef, departureTimeRef, busDestinationRef, destinationTimeRef, } = useContext(MainContext)
    const headings = ['No.', 'Bus Number', 'Bus Route', 'Display', 'Journey', 'Actions']
    function dataSetter(data) {
        setFormToggle(true)
        setUpdate(true)
        busNumberRef.current.value = data.bus_number
        busDepotRef.current.value = data.bus_depot
        busStopsRef.current.value = data.bus_stops
        busTimesRef.current.value = data.bus_times
        busCheckRef.current.value = data.check_in
        busRouteRef.current.value = data.bus_route
        busDepartureRef.current.value = data.bus_departure
        departureTimeRef.current.value = data.departure_time
        busDestinationRef.current.value = data.bus_destination
        destinationTimeRef.current.value = data.destination_time
        setBusData(data)
    }
    return (
        <div className='flex flex-col gap-5 px-5'>
            {/* Button Here */}
            <button onClick={function () { setFormToggle(true) }} className='bg-blue-600 duration-500 hover:bg-blue-800 px-3 py-2 rounded text-white'> Add Bus </button>

            {/* Table Here */}
            <div className='w-full'>
                <div className='grid grid-cols-6 font-bold text-lg py-2 bg-blue-600 text-white text-center'>
                    {headings.map(function (data, index) { return <p className='col-span-1' key={index}> {data} </p> })}
                </div>

                {bus.map(function (data, index) {
                    return (<div key={data._id} className='grid grid-cols-6 text-center'>
                        <p className='text-sm font-medium py-2 col-span-1 capitalize'> {index + 1} </p>
                        <p className='text-sm font-medium py-2 col-span-1 capitalize'> {data.bus_number} </p>
                        <p className='text-sm font-medium py-2 col-span-1 capitalize'> {data.bus_route} </p>
                        <p onClick={function () { if (data.display === true) { displayUpdater(data._id, false) } else { displayUpdater(data._id, true) } }} className='text-sm font-medium cursor-pointer py-2 col-span-1 capitalize'> {data.display.toString()} </p>
                        <p onClick={function () { if (data.journey_completed === true) { journeyUpdater(data._id, false) } else { journeyUpdater(data._id, true) } }} className='text-sm cursor-pointer font-medium py-2 col-span-1 capitalize'> {data.journey_completed.toString()} </p>
                        <div className='text-sm col-span-1 flex items-center justify-center gap-2 font-medium py-2 capitalize'>
                            <button onClick={function () { dataSetter(data) }}> Edit </button>
                            <button onClick={function () { busDeleter(data._id) }} > Delete </button>
                            <button onClick={function () { routeReverser(data._id, data.bus_route, data.bus_stops) }}> Reverse </button>
                        </div>
                    </div>)
                })}
            </div>

            {/* Form Here */}
            <div className={`w-screen absolute top-0 duration-500 flex flex-col gap-5 h-screen bg-white ${formToggle === true ? 'left-0' : 'left-[-120%]'}`}>
                <div className='flex px-10 items-center justify-between'>
                    <p className='text-2xl font-bold'> {update === false ? 'Add Bus' : 'Update Bus'} </p>
                    <FaTimes onClick={function () { setFormToggle(false); setUpdate(false); busFormRef.current.reset() }} className='text-2xl cursor-pointer' />
                </div>
                <form ref={busFormRef} onSubmit={function (event) { busFormHandler(event) }} className='flex flex-col gap-5 px-5' encType='multipart/formdata' method="post">
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='bus_number'> Bus Number </label>
                        <input ref={busNumberRef} name='bus_number' id='bus_number' placeholder='Enter Bus Number Here' className='border focus:outline-none p-3 rounded-sm w-full' type="text" />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='bus_route'> Bus Route </label>
                        <input ref={busRouteRef} name='bus_route' id='bus_route' placeholder='Enter Bus Route Here' className='border focus:outline-none p-3 rounded-sm w-full' type="text" />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='bus_departure'> Bus Departure </label>
                        <input ref={busDepartureRef} name='bus_departure' id='bus_departure' placeholder='Enter Bus Departure Here' className='border focus:outline-none p-3 rounded-sm w-full' type="text" />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='departure_time'> Departure Time </label>
                        <input ref={departureTimeRef} name='departure_time' id='departure_time' placeholder='Enter Departure Time Here' className='border focus:outline-none p-3 rounded-sm w-full' type="text" />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='bus_destination'> Bus Destination </label>
                        <input ref={busDestinationRef} name='bus_destination' id='bus_destination' placeholder='Enter Bus Destination Here' className='border focus:outline-none p-3 rounded-sm w-full' type="text" />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='destination_time'> Destination Time </label>
                        <input ref={destinationTimeRef} name='destination_time' id='destination_time' placeholder='Enter Destination Time Here' className='border focus:outline-none p-3 rounded-sm w-full' type="text" />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='bus_stops'> Bus Stops </label>
                        <input ref={busStopsRef} name='bus_stops' id='bus_stops' placeholder='Enter Bus Stops Here' className='border focus:outline-none p-3 rounded-sm w-full' type="text" />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='bus_times'> Bus Times </label>
                        <input ref={busTimesRef} name='bus_times' id='bus_times' placeholder='Enter Bus Times Here' className='border focus:outline-none p-3 rounded-sm w-full' type="text" />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='check_in'> Checkouts </label>
                        <input ref={busCheckRef} name='check_in' id='check_in' placeholder='Enter Bus Checkouts Here' className='border focus:outline-none p-3 rounded-sm w-full' type="text" />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='bus_image'> Bus Image </label>
                        <input ref={busImageRef} name='bus_image' id='bus_image' placeholder='Enter Bus Image Here' className='border focus:outline-none p-3 rounded-sm w-full' type="file" />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='bus_depot'> Bus Depot </label>
                        <input ref={busDepotRef} name='bus_depot' id='bus_depot' placeholder='Enter Bus Depot Here' className='border focus:outline-none p-3 rounded-sm w-full' type="text" />
                    </div>
                    <button className='bg-blue-600 px-3 py-2 rounded w-full text-white' type="submit"> Submit </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Bus