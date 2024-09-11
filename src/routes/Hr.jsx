import React from 'react'
import { Route,Routes } from 'react-router-dom'
import HrDashboard from '../pages/hr/HrDashboard'
import LeavePolicies from '../pages/hr/LeavePoilcies'
import LeaveTypeTablePage from '../pages/hr/LeaveTypeTablePage'
import HrReport from '../pages/hr/HrReport'

function Hr() {
  return (
    <Routes>
        <Route path='/' element={<HrDashboard/>}/>
        <Route path='dashboard' element={<HrDashboard/>}/>
        <Route path='policies' element={<LeavePolicies/>}/>
        <Route path='leavetypes' element={<LeaveTypeTablePage/>}/>
        <Route path='report' element={<HrReport/>}/>
    </Routes>
  )
}

export default Hr