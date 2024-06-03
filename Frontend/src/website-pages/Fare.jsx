import React, { useContext, useEffect } from 'react'
import { MainContext } from '../context/Context'

function Fare() {
    const { fare, setFare, fareReader } = useContext(MainContext)
    useEffect(
        function () {
            fareReader()
        },
        []
    )
    const headings = ['No.', 'Journey', 'Male Fare', 'Female Fare', 'Child Fare']
    return (
        <div className='w-screen'>
            <div className='2xl:container mx-auto'>
                <div className='text-center'>
                    <div className='grid text-2xl gap-2 font-semibold py-2 grid-cols-5'>
                        {headings.map(function (data, index) { return <p key={index} className='bg-blue-600 text-white'> {data} </p> })}
                    </div>
                    
                    {fare.map(function (data, index) {
                        return (<div key={data._id} className='grid font-medium gap-2 py-2 grid-cols-5'>
                            <p> {index + 1} </p>
                            <p> {data.journey} </p>
                            <p> {data.fare} </p>
                            <p> {data.ladies_fare} </p>
                            <p> {data.child_fare} </p>
                        </div>)
                    })}
                </div>
            </div>
        </div>
    )
}

export default Fare