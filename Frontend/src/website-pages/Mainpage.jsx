import React from 'react'
import Header from '../website-components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../website-components/Footer'

function Mainpage() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default Mainpage