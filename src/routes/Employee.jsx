import React from 'react'
import Dashboard from '../pages/employee/Dashboard'
import ApplyLeave from '../pages/employee/ApplyLeave'
import Calender from '../pages/employee/Calender'
import LeaveHistory from '../pages/employee/LeaveHistory'
import Profile from '../pages/employee/Profile'
import { Route,Routes } from 'react-router-dom'
import Policies from '../pages/employee/Policies'

function Employee() {
  return (
    <>
      <Routes>
          <Route path='/' element={<Dashboard/>} />
          <Route path='dashboard' element={<Dashboard/>} />
          <Route path='applyleave' element={<ApplyLeave/>}/>
          <Route path='calender' element={<Calender/>}/>
          <Route path='history' element={<LeaveHistory/>}/>
          <Route path='policy' element={<Policies/>} />
          <Route path='profile' element={<Profile/>}/>
      </Routes>
    </>
  )
}

export default Employee