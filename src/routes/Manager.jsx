import React from 'react'
import { Route,Routes } from 'react-router-dom'
import ManagerDashboard from '../pages/manager/ManagerDashboard'
import PendingApprovals from '../layouts/manager-layouts/PendingApprovals'
import Reports from '../pages/Reports'
import Calender from '../pages/employee/Calender'
import PendingApprovalsPage from '../pages/manager/PendingApprovalsPage'

function Manager() {
  return (
    <>
        <Routes>
            <Route path='/' element={<ManagerDashboard/>}/>
            <Route path='dashboard' element={<ManagerDashboard/>}/>
            <Route path='pending-approvals' element={<PendingApprovalsPage/>}/>
            <Route path='calender' element={<Calender/>}/>
            <Route path='report' element={<Reports/>}/>
        </Routes>
    </>
  )
}

export default Manager