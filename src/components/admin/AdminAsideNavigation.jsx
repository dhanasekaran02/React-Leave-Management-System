import React from 'react'
import {NavLink} from 'react-router-dom'

function AdminAsideNavigation() {
  return (
    <div className="nav_links">
        <ul className='ps-0'>
            <li>
                <NavLink to="addemployee">
                    <ion-icon name="today-outline"></ion-icon>
                    <span>Add Employee</span>
                </NavLink>
            </li>
            <li>
                <NavLink to="addleave">
                    <ion-icon name="calendar-clear-outline"></ion-icon>
                    <span>Add Leave</span>
                </NavLink>
            </li>
            <li>
                <NavLink to="addholiday">
                    <ion-icon name="laptop-outline"></ion-icon>
                    <span>Add Holiday</span>
                </NavLink>
            </li>
            <li>
                <NavLink to="backup">
                    <ion-icon name="cloud-upload-outline"></ion-icon>
                    <span>Backup</span>
                </NavLink>
            </li>
        </ul>
    </div>
  )
}

export default AdminAsideNavigation