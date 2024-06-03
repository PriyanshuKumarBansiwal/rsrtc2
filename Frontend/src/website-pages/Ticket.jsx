import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Cookies from 'universal-cookie'
import Notfound from './Notfound'
import { jwtDecode } from 'jwt-decode'
import { MainContext } from '../context/Context'

function Ticket() {
    const { ticketReader } = useContext(MainContext)
    const { ticket } = useContext(MainContext)
    const headings = ['Booker', 'Male', 'Female', 'Child', 'Fare', 'Seats']
    const cookies = new Cookies()
    const storedUser = cookies.get('user')
    if (!storedUser) { return <Notfound /> }
    try {
        const params = useParams()
        const user_id = params.user_id
        const decodedUser = jwtDecode(storedUser)
        const id = decodedUser._id
        useEffect(
            function () {
                ticketReader()
            },[]
        )
        if (user_id === id) {
            return (
                <div className='w-screen'>
                    <div className='2xl:container mx-auto'>
                        <div className='flex w-full p-5 flex-col gap-5'>
                            {ticket.length > 0 ? (ticket.map(function (data, index) {
                                const date = new Date(data.departure_date).toLocaleDateString()
                                const todayDate = new Date().getMonth() + '/' + new Date().getDate() + '/' + new Date().getFullYear()
                                return (
                                    <div key={data._id} className='w-full border flex flex-col gap-5 p-5 rounded-md shadow-md'>
                                        <div className='flex items-center justify-between text-center font-semibold'>
                                            <p> We Wish You A Happy Journey ! </p>
                                            <p> Rajasthan Roadways, On Time, With Time </p>
                                            <p> Toll Free No. 0000 0000 000 </p>
                                        </div>
                                        <div className='flex font-semibold items-center justify-between'>
                                            <div title={data.payment_status === true ? 'Payment Done' : 'Payment Pending'} className={`h-10 w-10 font-semibold text-white text-center grid place-items-center rounded-[100px] ${data.payment_status === true ? 'bg-blue-600' : 'bg-red-600'}`}>
                                                <p className=' cursor-default'> {index + 1} </p>
                                            </div>
                                            <p> Vehicle Number : {data.bus_id.bus_number} </p>
                                            <p> Ticket ID : {data._id} </p>
                                            <p> From {data.departure + ' To ' + data.destination} </p>
                                            <p> Date Of Departure : {date} </p>
                                        </div>
                                        <div className='grid text-center font-semibold text-white bg-blue-600 grid-cols-6'>
                                            {headings.map(function (data2, index2) { return <p className='py-3' key={index2}> {data2} </p> })}
                                        </div>
                                        <div className='grid text-center font-semibold text-black grid-cols-6'>
                                            <p className='py-3'> {data.booker} </p>
                                            <p className='py-3'> {data.male} </p>
                                            <p className='py-3'> {data.female} </p>
                                            <p className='py-3'> {data.child} </p>
                                            <p className='py-3'> {data.total_fare} </p>
                                            <p className={`py-3 ${data.seat_number.length === 1 ? 'block' : 'hidden'}`}> {data.seat_number[0]} </p>
                                            <p className={`py-3 ${data.seat_number.length > 1 ? 'block' : 'hidden'}`}> {data.seat_number[0] + ' To ' + data.seat_number[data.seat_number.length - 1]} </p>
                                        </div>
                                    </div>
                                )
                            })) : (<p> Not Tickets Booked </p>)}
                        </div>
                    </div>
                </div>
            )
        } else { return <Notfound /> }
    } catch (error) {
        console.error(error)
        return <Notfound />
    }
}

export default Ticket