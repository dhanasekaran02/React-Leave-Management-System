import React from 'react';
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

function AppliedLeavesCard({user}) {
    //Date formatting
    function formatDate(dateString) {
        // Parse the date string into day, month, and year
        var [year, month, day] = dateString.split("-").map(Number);
        
        // array of month names
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        // Get the month abbreviation
        var monthAbbreviation = monthNames[month - 1]; // Adjust month to be 0-indexed
        
        // Handle special cases for 1st, 2nd, and 3rd
        var suffix = "th";
        if (day === 1 || day === 21 || day === 31) {
            suffix = "st";
        } else if (day === 2 || day === 22) {
            suffix = "nd";
        } else if (day === 3 || day === 23) {
            suffix = "rd";
        }
        
        // Format the date
        return [day,suffix,monthAbbreviation];
    }
    
    
    let style={
        display:"inline-block"
    }
    let Status = user.status.charAt(0).toUpperCase() + user.status.slice(1);
    const startDate = formatDate(user.startDate);
    const endDate = formatDate(user.endDate);
  return (
    <div className="applied_leave_description d-sm-block d-md-flex d-lg-flex mb-2">
        <Col sm={12} md={10} className='apl_column_1'>
            <Row className='leave_dates'>
                {/* <!-- Applied date and range --> */}
                <Col xs={12} sm={9} md={10} xl={9} className='applied_date d-flex justify-content-lg-around justify-content-xl-around justify-content-md-around justify-content-sm-between justify-content-between'>
                    <p className="date-range mb-0"><span className="days-color"><b>Applied On </b></span ><span id="applied_on" className="mx-2">:</span><span>{user.appliedDate}    </span></p>
                    <div className="calender_days text-black">
                        <span className="from calender_days"><p style={style} className='mb-0'>{startDate[0]}<sup className='text-black'>{startDate[1]}</sup> {startDate[2]}</p></span>
                        <span className="mx-2 calender_days">To</span>
                        <span className="calender_days"><p style={style} className='mb-0'>{endDate[0]}<sup className='text-black'>{endDate[1]}</sup> {endDate[2]}</p></span>
                    </div>
                </Col>
                {/* <!-- No of days --> */}
                <Col xl={3} sm={2} xs={12} className='leave_days d-flex justify-content-center justify-content-lg-around days-color justify-content-md-start justify-content-sm-end'>
                    <p className='mb-0'><b>{`${user.noOfDays} Days`}</b></p>
                </Col>
            </Row>
        </Col>
        {/* <!-- status --> */}
        <div className="apl_column_2 container-fluid mt-sm-2 mt-md-0 col-2 d-flex justify-content-md-center justify-content-lg-end justify-content-xl-center text-sm-center">
            <div className={user.status}>
                <p className='mb-0'><b>{Status}</b></p>
            </div>
        </div>
    </div>
  )
}

export default AppliedLeavesCard