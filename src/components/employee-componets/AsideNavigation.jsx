import React from 'react'
import {NavLink,Outlet} from 'react-router-dom'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
function AsideNavigation() {
  return (
    <div className="nav_links">
        <ul className='ps-0'>
            <li>
            <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip id="button-tooltip-2">Dashboard</Tooltip>}
                >
                    <NavLink to="dashboard">
                    <ion-icon name="today-outline"></ion-icon>
                    <span>Dashboard</span>
                </NavLink>
                </OverlayTrigger>
                
            </li>
            <li>
            <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip id="button-tooltip-2">Apply Leave</Tooltip>}
                >
                <NavLink to="applyleave">
                    <ion-icon name="calendar-clear-outline"></ion-icon>
                    <span>Apply Leave</span>
                </NavLink>
                </OverlayTrigger>
            </li>
            <li>
            <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip id="button-tooltip-2">Calender</Tooltip>}
                >   
                <NavLink to="calender">
                    <ion-icon name="laptop-outline"></ion-icon>
                    <span>Calender</span>
                </NavLink>
                </OverlayTrigger>
            </li>
            <li>
            <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip id="button-tooltip-2">Pending Leave & History</Tooltip>}
                >
                <NavLink to="history">
                    <ion-icon name="clipboard-outline"></ion-icon>
                    <span>Pending Leave & History</span>
                </NavLink>
                </OverlayTrigger>
            </li>
            <li>
            <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip id="button-tooltip-2">Leave Policy</Tooltip>}
                >
                <NavLink to="policy">
                    <ion-icon name="book-outline"></ion-icon>
                    <span>Leave Policy</span>
                </NavLink>
                </OverlayTrigger>
            </li>
            <li>
            <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip id="button-tooltip-2">Profile</Tooltip>}
                >
                <NavLink to="profile">
                    <ion-icon name="people-outline"></ion-icon>
                    <span>Profile</span>
                </NavLink>
                </OverlayTrigger>
            </li>
        </ul>
        <Outlet/>
    </div>
  )
}

export default AsideNavigation