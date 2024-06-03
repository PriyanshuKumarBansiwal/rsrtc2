import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { MainContext } from '../context/Context'
import Cookies from 'universal-cookie'
import { jwtDecode } from 'jwt-decode'

function Header() {
  const { userRemover } = useContext(MainContext)
  const cookies = new Cookies()
  const storedUser = cookies.get('user')
  try {
    if (!storedUser) {
      return (<div className='w-screen bg-blue-600'>
        <div className='2xl:container mx-auto'>
          <div className='p-5 flex items-center justify-between'>
            <Link to={'/'}>
              <img width={75} src="/RSRTC Logo.svg" alt="Logo Here" />
            </Link>
            <div className='flex items-center justify-center gap-4 text-white font-semibold text-md'>
              <Link to={'/'}> Home </Link>
              <Link to={'/login'}> Login </Link>
              <Link to={'/signup'}> Signup </Link>
              <Link to={'/bus-enquiry'}> Bus Enquiry </Link>
              <Link to={'/fare'}> Fares </Link>
            </div>
          </div>
        </div>
      </div>)
    } else {
      const decodedUser = jwtDecode(storedUser)
      const user_id = decodedUser._id
      return (<div className='w-screen bg-blue-600'>
        <div className='2xl:container mx-auto'>
          <div className='p-5 flex items-center justify-between'>
            <Link to={'/'}>
              <img width={75} src="/RSRTC Logo.svg" alt="Logo Here" />
            </Link>
            <div className='flex items-center justify-center gap-4 text-white font-semibold text-md'>
              <Link to={'/'}> Home </Link>
              <Link to={'/bus-finder/' + storedUser + '/' + user_id}> Bus Finder </Link>
              <Link to={'/bus-enquiry'}> Bus Enquiry </Link>
              <Link to={'/fare'}> Fares </Link>
              <Link to={'/my-ticket/' + user_id}> My Ticket </Link>
              <Link to={'/'} onClick={function () { userRemover() }}> Logout </Link>
            </div>
          </div>
        </div>
      </div>)
    }
  } catch (error) {
    console.error(error)
  }
}

export default Header