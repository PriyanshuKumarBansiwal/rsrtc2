import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Mainpage from './website-pages/Mainpage'
import Home from './website-pages/Home'
import Notfound from './website-pages/Notfound'
import Busfinder from './website-pages/Busfinder'
import Bookingform from './website-pages/Bookingform'
import Fare from './website-pages/Fare'
import Enquiry from './website-pages/Enquiry'
import Adminpage from './admin-pages/Adminpage'
import Dashboard from './admin-pages/Dashboard'
import Bus from './admin-pages/Bus'
import AdminFare from './admin-pages/Fare'
import AdminLogin from './admin-pages/Login'
import Booking from './admin-pages/Booking'
import Signup from './website-pages/Signup'
import Login from './website-pages/Login'
import Ticket from './website-pages/Ticket'

function App() {
  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <Mainpage />,
        children: [
          {
            path: '',
            element: <Home />
          },
          {
            path: 'bus-finder/:user_token/:user_id',
            element: <Busfinder />
          },
          {
            path: 'booking-form/:user_token/:user_id/:bus_id/:bus_stops',
            element: <Bookingform />
          },
          {
            path: 'fare',
            element: <Fare />
          },
          {
            path: 'bus-enquiry',
            element: <Enquiry />
          },
          {
            path: 'my-ticket/:user_id',
            element: <Ticket />
          },
          {
            path: '*',
            element: <Notfound />
          },
        ]
      },
      {
        path: '/login-admin',
        element: <AdminLogin />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/admin/:admin_token/:admin_id',
        element: <Adminpage />,
        children: [
          {
            path: '',
            element: <Dashboard />
          },
          {
            path: 'bus',
            element: <Bus />
          },
          {
            path: 'fare',
            element: <AdminFare />
          },
          {
            path: 'booking',
            element: <Booking />
          },
        ]
      }
    ]
  )
  return (
    <RouterProvider router={router} />
  )
}

export default App