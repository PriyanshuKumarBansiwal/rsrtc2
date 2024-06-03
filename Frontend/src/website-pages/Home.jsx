import React, { useContext, useEffect } from 'react'
import { MainContext } from '../context/Context'

function Home() {
  const { busReader, setBusData, setToggle, setUserMinutes, userHour, userMinutes, apiBaseUrl, busBaseUrl, bus, setJourney, setUserDeparture, userDestination, timeFormHandler, setUserDestination, userTime, setUserTime, fareReader } = useContext(MainContext)

  useEffect(
    function () {
      busReader()
    },
    []
  )
  return (
    <div className='w-screen'>
      <div className='2xl:container mx-auto'>
        <div className='flex flex-col gap-10'>

          {/* Banner */}
          <div className='flex md:flex-row flex-col items-center justify-between'>
            <div className='w-full flex flex-col gap-2'>
              <p className='text-[40px] text-center md:text-left md:text-[100px] whitespace-nowrap font-bold uppercase'> Welcome to </p>
              <p className='text-[40px] text-center md:text-left md:text-[100px] font-bold uppercase'> Rajasthan Roadways </p>
              <p className='text-[20px] text-center md:text-left md:text-[50px] font-bold uppercase'> On Time, With Time </p>
            </div>
            <img width={650} src="/Kota Depot Interior-01.jpg" alt="Banner Image Here" />
          </div>

          {/* Latest Services */}
          <div className='flex flex-col px-5 gap-3'>
            <p className='text-black font-bold text-4xl uppercase text-center'> Latest Services </p>
            <div className='w-full grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
              {bus.map(function (data) {
                if (data.display === true) {
                  return (<div key={data._id} className='w-full border rounded-md group text-white overflow-hidden hover:shadow-xl bg-blue-700'>
                    <div className='w-full h-[400px] flex items-center bg-white justify-center text-center'>
                      <img className='p-3 w-72 group-hover:w-80 group-hover:blur-[10px] duration-500' src={apiBaseUrl + busBaseUrl + '/' + data.time + data.bus_image} alt="Bus Image Here" />
                    </div>
                    <p className='font-bold text-2xl text-center py-1'> {data.bus_route} </p>
                    <p className='font-bold text-sm text-center'> Via </p>
                    <p className='font-bold text-sm flex items-center justify-center text-left mx-auto w-fit gap-2 py-3'> {data.bus_stops.slice(1, -1).map(function (busStop, index) { return <span key={index}> {busStop} </span> })} </p>
                  </div>)
                } else { return null }
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Home