import React from 'react'

function ReportChart({title,chartId,children}) {
  return (
    <>
        {/* <!-- chart heading --> */}
        <div className="chart_heading card-heading rounded-top-2 p-2 d-flex justify-content-around align-items-center heading-bg-color">
            <h6 className="fs-5 font-color fw-semibold mb-0">{title}</h6>
        </div>
        {/* <!-- chart image --> */}
        {children}
    </>
  )
}

export default ReportChart