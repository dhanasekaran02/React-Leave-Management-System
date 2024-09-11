import React from 'react'
import { Routes,Route } from 'react-router-dom'
import AdminDashboard from '../pages/admin/AdminDashboard'
import AddNewHoliday from '../pages/admin/AddNewHoliday'
import NewLeaveType from '../pages/admin/NewLeaveType'
import AddNewEmployee from '../pages/admin/AddNewEmployee'
import Backup from '../pages/admin/Backup'

function Admin() {
  return (
    <>
        <Routes>
            <Route path='/' element={<AdminDashboard/>}/>
            <Route path='addemployee' element={<AddNewEmployee/>}/>
            <Route path='addleave' element={<NewLeaveType/>}/>
            <Route path='addholiday' element={<AddNewHoliday/>}/>
            <Route path='backup' element={<Backup/>}/>
        </Routes>
    </>
  )
}

export default Admin