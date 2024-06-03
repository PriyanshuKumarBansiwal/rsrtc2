import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MainContext } from '../context/Context'

function Bookingform() {
    const { bookingFormHandler } = useContext(MainContext)
    const navigator = useNavigate()
    const params = useParams()
    const bus_id = params.bus_id
    const bus_stops = params.bus_stops
    const stopsArray = bus_stops.split(',')
    const user_id = params.user_id
    return (
        <div className='w-screen'>
            <div className='2xl:container mx-auto'>
                <div className='w-full h-screen p-5'>
                    <form onSubmit={function (event) { bookingFormHandler(event, bus_id, stopsArray, user_id, navigator) }} className='flex flex-col gap-5' method="post">
                        <div className='flex flex-col gap-2'>
                            <label htmlFor='booker'> Enter The Booker Name </label>
                            <input className='border focus:outline-none p-3 rounded-md' name='booker' id='booker' type="text" />
                        </div>
                        <select className='border focus:outline-none p-3 rounded-md' name='departure' id='departure'>
                            <option hidden >Enter The Departure Location </option>
                            {stopsArray.map(function (data, index) {
                                return <option key={index} value={data}> {data} </option>
                            })}
                        </select>
                        <select className='border focus:outline-none p-3 rounded-md' name='destination' id='destination'>
                            <option hidden >Enter The Destination Location </option>
                            {stopsArray.map(function (data, index) {
                                return <option key={index} value={data}> {data} </option>
                            })}
                        </select>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor='male'> Enter The Number Of Male Passengers </label>
                            <input min={0} maxLength={2} defaultValue={0} className='border focus:outline-none p-3 rounded-md' name='male' id='male' type="number" />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor='female'> Enter The Number Of Female Passengers </label>
                            <input min={0} maxLength={2} defaultValue={0} className='border focus:outline-none p-3 rounded-md' name='female' id='female' type="number" />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor='child'> Enter The Number Of Child Passengers </label>
                            <input min={0} maxLength={2} defaultValue={0} className='border focus:outline-none p-3 rounded-md' name='child' id='child' type="number" />
                        </div>
                        <button className='bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md' type='submit'> Submit </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Bookingform