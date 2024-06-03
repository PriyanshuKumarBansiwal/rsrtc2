import React from 'react'
import { Link, useParams } from "react-router-dom"
import Cookies from 'universal-cookie'
import { jwtDecode } from 'jwt-decode'
import Notfound from '../website-pages/Notfound'

function Sidebar() {
  const cookies = new Cookies()
  const storedAdmin = cookies.get('admin')
  if (!storedAdmin) { return <Notfound /> }
  try {
    const params = useParams()
    const admin_id = params.admin_id
    const admin_token = params.admin_token
    const decodedAdmin = jwtDecode(storedAdmin)
    if (admin_id === decodedAdmin._id && admin_token === storedAdmin) {
      return (
        <div className='flex flex-col gap-5 py-5 h-screen'>
          <Link className='text-center cursor-pointer font-bold text-4xl'> ADMIN PANEL </Link>
          <div className='flex flex-col w-fit px-5 gap-4'>
            <Link className='active:font-bold ' to={'/admin/' + admin_token + '/' + admin_id}> Dashboard </Link>
            <Link className='active:font-bold ' to={'/admin/' + admin_token + '/' + admin_id + '/bus'}> Bus </Link>
            <Link className='active:font-bold ' to={'/admin/' + admin_token + '/' + admin_id + '/fare'}> Fare </Link>
            <Link className='active:font-bold ' to={'/admin/' + admin_token + '/' + admin_id + '/booking'}> Booking </Link>
          </div>
        </div>
      )
    }
    else { return <Notfound /> }
  } catch (error) {
    console.error(error)
    return <Notfound />
  }
}

export default Sidebar