import React, { useContext } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { MainContext } from '../context/Context'
import { useNavigate } from 'react-router-dom'

function Login() {
    const { loginFormHandler } = useContext(MainContext)
    const navigator = useNavigate()
    return (
        <div className='w-screen h-screen bg-white'>
            <div className='2xl:container w-full h-full mx-auto'>
                <div className='h-full w-full rounded-md overflow-hidden px-10 grid place-items-center'>
                    <form className='w-full flex flex-col rounded-md gap-5 bg-blue-600 text-white p-10' onSubmit={function (event) { loginFormHandler(event, navigator) }} method="post">
                        <div className='flex flex-col gap-2'>
                            <label htmlFor='user_name'> User Name </label>
                            <input className='border rounded-md focus:outline-none p-3 text-black' name='user_name' id='user_name' type='text' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor='user_email'> User Email </label>
                            <input className='border rounded-md focus:outline-none p-3 text-black' name='user_email' id='user_email' type='email' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor='user_password'> User Password </label>
                            <input className='border rounded-md focus:outline-none p-3 text-black' autoComplete='off' name='user_password' id='user_password' type='password' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor='confirm_password'> Confirm Password </label>
                            <input autoComplete='off' max={10} className='border rounded-md focus:outline-none p-3 text-black' name='confirm_password' id='confirm_password' type='password' />
                        </div>
                        <button type="submit"> Submit Here </button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Login