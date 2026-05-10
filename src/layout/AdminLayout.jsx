import React, { Children } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/admin/Sidebar'
import Topbar from '../components/admin/Topbar'

function AdminLayout({Children}) {
  return (
    <>
    <div className='flex'>
      <Sidebar/>
    <div className='flex-1 bg-gray-100 min-h-screen'>
      <div className='md:hidden'>
        <Topbar/>
      </div>
    <Outlet/>
    </div>
    </div>

    </>
  )
}

export default AdminLayout