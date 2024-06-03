import React, { useContext, useEffect } from 'react'
import { MainContext } from '../context/Context'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Booking() {
  const { booking, bookingUpdater, bookingReader } = useContext(MainContext)
  const headings = ['No.', 'Booker', 'Male', 'Femlae', 'Children', 'Journey', 'Bus Number', 'Seats', 'Payment', 'Fare']
  useEffect(
    function () {
      bookingReader()
    }, []
  )
  return (
    <div className='w-full'>
      <div className='grid grid-cols-10 font-bold text-lg py-2 bg-blue-600 text-white text-center'>
        {headings.map(function (data, index) { return <p className='col-span-1' key={index}> {data} </p> })}
      </div>

      {booking.map(function (data, index) {
        return (<div key={data._id} className='grid grid-cols-10 text-center'>
          <p className='text-sm font-medium py-2 col-span-1 capitalize'> {index + 1} </p>
          <p className='text-sm font-medium py-2 col-span-1 capitalize'> {data.booker} </p>
          <p className='text-sm font-medium py-2 col-span-1 capitalize'> {data.male} </p>
          <p className='text-sm font-medium py-2 col-span-1 capitalize'> {data.female} </p>
          <p className='text-sm font-medium py-2 col-span-1 capitalize'> {data.child} </p>
          <p className='text-sm font-medium py-2 col-span-1 capitalize'> {data.departure + ' To ' + data.destination} </p>
          <p className='text-sm font-medium py-2 col-span-1 capitalize'> {data.bus_id.bus_number} </p>
          <p className={`text-sm font-medium py-2 col-span-1 capitalize ${data.seat_number.length === 1 ? 'block' : 'hidden'}`}> {data.seat_number[0]} </p>
          <p className={`text-sm font-medium py-2 col-span-1 capitalize ${data.seat_number.length > 1 ? 'block' : 'hidden'}`}> {data.seat_number[0] + ' To ' + data.seat_number[data.seat_number.length - 1]} </p>
          <p onClick={function () { if (data.payment_status === false) { bookingUpdater(data._id, true) } else { bookingUpdater(data._id, false) } }} className='text-sm cursor-pointer font-medium py-2 col-span-1 capitalize'> {data.payment_status.toString()} </p>
          <p className='text-sm font-medium py-2 col-span-1 capitalize'> {data.total_fare} </p>
        </div>)
      })}
      <ToastContainer />
    </div>
  )
}

export default Booking