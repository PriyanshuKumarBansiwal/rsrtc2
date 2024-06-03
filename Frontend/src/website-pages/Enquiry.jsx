import React, { useContext } from 'react'
import { MainContext } from '../context/Context'

function Enquiry() {
  const { enquiryFormHandler, enquiry, setEnquiry } = useContext(MainContext)
  let index = 0
  const headings = ['Bus Number', 'Bus Route', 'Bus Depot', 'Booked Seats', 'Total Seats']
  return (
    <div className='w-screen'>
      <div className='2xl:container mx-auto'>
        <div className='flex flex-col gap-5 py-5'>
          <form onSubmit={function (event) { enquiryFormHandler(event) }} className='flex items-center justify-center gap-5' method="post">
            <label className='text-lg' htmlFor='bus_number'>Enter The Bus Number : </label>
            <input className='border p-3 shadow-md focus:outline-none rounded-md' name='bus_number' id='bus_number' type="text" />
            <button className='bg-blue-600 p-3 rounded-md hover:bg-blue-700 text-white' type="submit"> Submit Here </button>
          </form>

          <div>
            <div className='grid gap-2 text-center grid-cols-5'>
              {headings.map(function (data, index) { return <p key={index} className='bg-blue-600 text-white py-2 text-xl font-medium'> {data} </p> })}
            </div>
            <div className='grid text-center grid-cols-5'>
              <p className='py-2 font-medium'> {enquiry?.bus_number} </p>
              <p className='py-2 font-medium'> {enquiry?.bus_route} </p>
              <p className='py-2 font-medium'> {enquiry?.bus_depot} </p>
              <p className='py-2 font-medium'> {enquiry?.booked_seats} </p>
              <p className='py-2 font-medium'> {enquiry?.bus_seats} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Enquiry