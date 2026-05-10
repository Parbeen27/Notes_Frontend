import React from 'react'
import { useAuth } from '../context/AuthProvider'
import { Navigate, Outlet } from 'react-router-dom'

export default function RoleGuard({ allowedRoles }) {
    const { user } = useAuth()
    if(!user) return <Navigate to="/login"/>

    if(allowedRoles && !allowedRoles.includes(user.role)){
        return <Navigate to="/unauthorized"/>
    }
  return (
    <Outlet/>
  )
}
