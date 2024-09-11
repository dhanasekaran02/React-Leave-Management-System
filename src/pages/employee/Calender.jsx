import React from 'react'
import GanttChart from '../../components/GanttChart'


function Calender() {
  return (
    <>
        <div className="main_calender_section ms-sm-4 ms-md-3 ms-lg-0" style={{width:"98%"}}>
            <div className="leave_calender_heading fs-6 font-color fw-bold">
                <h4>Leave Calender</h4>
            </div>
            <GanttChart/>
        </div>
    </>
  )
}

export default Calender