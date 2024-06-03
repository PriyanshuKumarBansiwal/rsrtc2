import React from 'react'
import Header from '../admin-components/Header'
import { Outlet, useParams } from 'react-router-dom'
import Sidebar from '../admin-components/Sidebar'
import NotFound from '../website-pages/Notfound'
import Cookies from 'universal-cookie'
import { jwtDecode } from 'jwt-decode'

function Adminpage() {
    const cookies = new Cookies()
    const storedAdmin = cookies.get('admin')
    if (!storedAdmin) { return <NotFound /> }
    try {
        const params = useParams()
        const admin_token = params.admin_token
        const admin_id = params.admin_id
        const decodedAdmin = jwtDecode(storedAdmin)
        const id = decodedAdmin._id
        if (admin_id === id && admin_token === storedAdmin) {
            return (<div className='w-screen'>
                <div className='2xl:container mx-auto'>
                    <div className='grid gap-5 grid-cols-5'>
                        <div className='bg-blue-600 text-white col-span-1'>
                            <Sidebar />
                        </div>
                        <div className='bg-white col-span-4 flex flex-col gap-5'>
                            <Header />
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>)
        }
        else { return <NotFound /> }
    } catch (error) {
        console.error(error)
        return <NotFound />
    }
}

export default Adminpage