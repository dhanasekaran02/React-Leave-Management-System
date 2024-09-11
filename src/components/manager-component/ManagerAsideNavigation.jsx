import React from 'react'
import {NavLink} from 'react-router-dom'

function ManagerAsideNavigation() {
  return (
    <div className="nav_links">
        <ul className='ps-0'>
            <li>
                <NavLink to="dashboard">
                    <ion-icon name="today-outline"></ion-icon>
                    <span>Dashboard</span>
                </NavLink>
            </li>
            <li>
                <NavLink to="pending-approvals">
                    <ion-icon name="calendar-clear-outline"></ion-icon>
                    <span>Pending Approvals</span>
                </NavLink>
            </li>
            <li>
                <NavLink to="calender">
                    <ion-icon name="laptop-outline"></ion-icon>
                    <span>Calender</span>
                </NavLink>
            </li>
            <li>
                <NavLink to="report">
                    <ion-icon name="clipboard-outline"></ion-icon>
                    <span>Leave Reports</span>
                </NavLink>
            </li>
        </ul>
    </div>
  )
}

export default ManagerAsideNavigation