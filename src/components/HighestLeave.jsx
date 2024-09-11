import React from 'react'

function HighestLeave({name,days,dept=null}) {
  return (
    <div className="highest_leave card-body p-3 h-100 rounded-bottom-3">
        <div className="high_leave card h-100">
            <div className="high_leave_heading card-header heading-bg-color text-center">
                <h6 className="mb-0 p-0 fw-semibold font-color">Highest Leave Taken</h6>
            </div>
            <div className="high_leave_content card-body d-flex h-75 p-0">
                <div className="hl_left h-100 w-50 d-flex flex-column">
                    <p className="fs-5">{name}</p>
                    {/* <!-- <p>IT Department</p> --> */}
                    {dept?<p className>{dept}</p>:null}
                </div>
                <div className="hl_right w-50 h-100">
                    <p className="fs-5">{`${days} days`}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HighestLeave