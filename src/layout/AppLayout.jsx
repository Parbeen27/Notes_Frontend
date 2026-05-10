import React from 'react'

import { Outlet } from 'react-router-dom'
import Navbar from '../components/user/Navebar'


function AppLayout() {
  return (
    <>
      <div className='min-h-screen bg-white text-black'>
        <Navbar/>
      <Outlet/>
      </div>
    </>
  )
}

export default AppLayout