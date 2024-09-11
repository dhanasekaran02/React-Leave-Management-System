import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from '../../layouts/Header'
import Aside from '../../layouts/Aside'
import Dashboard from './Dashboard'
import ApplyLeave from './ApplyLeave'
import Calender from './Calender'
import LeaveHistory from './LeaveHistory'
import Policies from './Policies'
import Profile from './Profile'
import Main from '../../components/Main'

function EmployeeNavigation() {
  return (
    <>
        <Header name="DHANASEKARAN B" designation='Developer'/>
        <Aside/>
        <Main>
        <Routes>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/applyleave" element={<ApplyLeave/>}/>
            <Route path="/calender" element={<Calender/>}/>
            <Route path="/history" element={<LeaveHistory/>}/>
            <Route path="/policy" element={<Policies/>}/>
            <Route path="/employee/profile" element={<Profile/>}/>
        </Routes>
        </Main>
    </>
  )
}

export default EmployeeNavigation