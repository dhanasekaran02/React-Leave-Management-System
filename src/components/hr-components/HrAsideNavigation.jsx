import React from 'react'
import {NavLink} from 'react-router-dom'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


function HrAsideNavigation() {
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
                    <ion-icon name="today-outline" tabIndex={0} data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Dashboard"></ion-icon>
                    <span>Dashboard</span>
                </NavLink>
                </OverlayTrigger>
            </li>
            <li>
                <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip id="button-tooltip-2">Leave Policies</Tooltip>}
                >
                <NavLink to="policies">
                    <ion-icon name="calendar-clear-outline"></ion-icon>
                    <span>Leave Policies</span>
                </NavLink>
                </OverlayTrigger>
            </li>
            <li>
                <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip id="button-tooltip-2">Leave Types</Tooltip>}
                >
                <NavLink to="leavetypes">
                    <ion-icon name="laptop-outline"></ion-icon>
                    <span>Leave Types</span>
                </NavLink>
                </OverlayTrigger>
            </li>
            <li>
                <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip id="button-tooltip-2">Leave Reports</Tooltip>}
                >
                <NavLink to="report">
                    <ion-icon name="clipboard-outline"></ion-icon>
                    <span>Leave Reports</span>
                </NavLink>
                </OverlayTrigger>
            </li>
        </ul>
    </div>
  )
}

export default HrAsideNavigation