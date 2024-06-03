import React from 'react'
import { useContext } from 'react'
import { MainContext } from '../context/Context'
import {useNavigate} from 'react-router-dom'

function Login() {
    const { adminFormHandler } = useContext(MainContext)
    const navigator = useNavigate()
    return (
        <div className='w-screen h-screen'>
            <div className='2xl:container w-full h-full mx-auto'>
                <div className='grid w-full px-10 h-full place-items-center'>
                    <form onSubmit={function (event) { adminFormHandler(event, navigator) }} className='bg-blue-600 w-full text-white flex flex-col gap-5 rounded-md shadow-lg overflow-hidden p-5' method="post">
                        <div className='flex flex-col w-full gap-2'>
                            <label htmlFor='admin_name'> Enter The Admin Name </label>
                            <input className='text-black border w-full p-3 rounded-sm focus:outline-none' name='admin_name' id='admin_name' type='text' />
                        </div>
                        <div className='flex flex-col w-full gap-2'>
                            <label htmlFor='admin_email'> Enter The Email </label>
                            <input className='text-black border w-full p-3 rounded-sm focus:outline-none' name='admin_email' id='admin_email' type='email' />
                        </div>
                        <div className='flex flex-col w-full gap-2'>
                            <label htmlFor='admin_password'> Enter The Admin Password </label>
                            <input className='text-black border w-full p-3 rounded-sm focus:outline-none' autoComplete='off' name='admin_password' id='admin_password' type='password' />
                        </div>
                        <button type="submit"> Submit Here </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login