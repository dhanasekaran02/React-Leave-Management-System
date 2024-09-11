import React from 'react'
import Header from '../layouts/Header'
import AsideManager from '../layouts/manager-layouts/AsideManager'
import { Route, Routes } from 'react-router-dom'
import ManagerDashboard from './manager/ManagerDashboard'
import PendingApprovalsPage from './manager/PendingApprovalsPage'
import Calender from './employee/Calender'
import Reports from './Reports'
import Main from '../components/Main'

function ManagerNavigation() {
  return (
    <>
        <Header name="DHANASEKARAN B" designation='Manager'/>
        <AsideManager/>
        <Main>
        <Routes>
            <Route path="/manager" element={<ManagerDashboard/>}/>
            <Route path="/manager/pending-approvals" element={<PendingApprovalsPage/>}/>
            <Route path="/manager/calender" element={<Calender/>}/>
            <Route path="/manager/report" element={<Reports/>}/>
        </Routes>
        </Main>
    </>
  )
}

export default ManagerNavigation