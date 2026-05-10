import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import { routes } from './routeConfig'
import RoleGuard from './RoleGuard'
import { layoutMap } from '../layout/LayoutMap'

export default function AppRoutes() {
  return (
    <Routes>
        {routes.map((route,idx) => {
            if(route.public){
                return (
                    <Route key={idx} path={route.path} element={<route.element/>}/>
                )
            }

            return (
                <Route key={idx} element={<RoleGuard allowedRoles={route.roles} />}>
                    <Route element={layoutMap[route.layout] || <Outlet/>}>
                    <Route path={route.path} element={<route.element/>}/>3
                    </Route>
                </Route>
            )
        })}
    </Routes>
  )
}
