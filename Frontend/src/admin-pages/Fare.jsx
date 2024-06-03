import React, { useContext } from 'react'
import { MainContext } from '../context/Context'
import { FaTimes } from "react-icons/fa"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Fare() {
  const { formToggle, setFormToggle, fare, update, fareData, setFareData, setUpdate, fareFormRef, fareJourneyRef, fareDeleter, fareFormHandler, maleFareRef, femaleFareRef, childFareRef } = useContext(MainContext)
  const headings = ['No.', 'Journey', 'Male Fare', 'Female Fare', 'Child Fare', 'Actions']
  function dataSetter(data) {
    setFormToggle(true)
    setUpdate(true)
    fareJourneyRef.current.value = data.journey
    maleFareRef.current.value = data.fare
    femaleFareRef.current.value = data.ladies_fare
    childFareRef.current.value = data.child_fare
    setFareData(data)
  }
  return (
    <div className='flex flex-col gap-5 px-5'>
      {/* Button Here */}
      <button onClick={function () { setFormToggle(true) }} className='bg-blue-600 duration-500 hover:bg-blue-800 px-3 py-2 rounded text-white'> Add Fare </button>

      {/* Table Here */}
      <div className='w-full'>
        <div className='grid grid-cols-6 font-bold text-lg py-2 bg-blue-600 text-white text-center'>
          {headings.map(function (data, index) { return <p className='col-span-1' key={index}> {data} </p> })}
        </div>

        {fare.map(function (data, index) {
          return (<div key={data._id} className='grid grid-cols-6 text-center'>
            <p className='text-sm font-medium py-2 col-span-1 capitalize'> {index + 1} </p>
            <p className='text-sm font-medium py-2 col-span-1 capitalize'> {data.journey} </p>
            <p className='text-sm font-medium py-2 col-span-1 capitalize'> {data.fare} </p>
            <p className='text-sm font-medium py-2 col-span-1 capitalize'> {data.ladies_fare} </p>
            <p className='text-sm font-medium py-2 col-span-1 capitalize'> {data.child_fare} </p>
            <div className='text-sm col-span-1 flex items-center justify-center gap-2 font-medium py-2 capitalize'>
              <button onClick={function () { dataSetter(data) }}> Edit </button>
              <button onClick={function () { fareDeleter(data._id) }} > Delete </button>
            </div>
          </div>)
        })}
      </div>

      {/* Form Here */}
      <div className={`w-screen absolute top-0 duration-500 flex flex-col gap-5 h-screen bg-white ${formToggle === true ? 'left-0' : 'left-[-120%]'}`}>
        <div className='flex px-10 items-center justify-between'>
          <p className='text-2xl font-bold'> {update === false ? 'Add Fare' : 'Update Fare'} </p>
          <FaTimes onClick={function () { setFormToggle(false); setUpdate(false); fareFormRef.current.reset() }} className='text-2xl cursor-pointer' />
        </div>
        <form ref={fareFormRef} onSubmit={function (event) { fareFormHandler(event) }} className='flex flex-col gap-5 px-5' encType='multipart/formdata' method="post">
          <div className='flex flex-col gap-2'>
            <label htmlFor='journey'> Bus Journey </label>
            <input ref={fareJourneyRef} name='journey' id='journey' placeholder='Enter Bus Journey Here' className='border focus:outline-none p-3 rounded-sm w-full' type="text" />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='fare'> Male Fare </label>
            <input ref={maleFareRef} name='fare' id='fare' placeholder='Enter Male Fare Here' className='border focus:outline-none p-3 rounded-sm w-full' type="text" />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='ladies_fare'> Female Fare </label>
            <input ref={femaleFareRef} name='ladies_fare' id='ladies_fare' placeholder='Enter Female Fare Here' className='border focus:outline-none p-3 rounded-sm w-full' type="text" />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='child_fare'> Child Fare </label>
            <input ref={childFareRef} name='child_fare' id='child_fare' placeholder='Enter Child Fare Here' className='border focus:outline-none p-3 rounded-sm w-full' type="text" />
          </div>
          <button className='bg-blue-600 px-3 py-2 rounded w-full text-white' type="submit"> Submit </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Fare