import React, { useEffect } from 'react'
import {MDBDataTable} from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import { getLeaveHistoryFromServer } from '../slicers/LeaveHistorySlicer';
import { getLeaveFromServer } from '../slicers/LeaveSlicer';
                  



                                    
function LeaveHistoryTable() {

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getLeaveFromServer())
    },[dispatch]);

    let notable = true;

    const {leaveSet} = useSelector((state)=>state.leave);
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

    const row = leaveSet.filter((leave)=> {
        if(leave.empid === loggedUser.id && leave.status === "approved"){
            notable = false;
            return leave;
        }
    })

    const data = {
        columns: [
            {
                label:'Leave Type',
                field:'leaveType',
                sort:'asc',
                width:150
            },
            {
                label: 'Start Date',
                field: 'startDate',
                sort: 'asc',
                width: 150
            },
            {
                label: 'End Date',
                field: 'endDate',
                sort: 'asc',
                width: 270
            },
            {
                label: 'Total Days',
                field: 'noOfDays',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Reason',
                field: 'reason',
                sort: 'asc',
                width: 100
            },
        ],
        rows: row
    };

    return (
        <>
            {
                notable ? <h5 className='d-flex justify-content-enter text-secondary'>No Applied Leave Histories Found</h5>:
                <MDBDataTable
                centered
                responsive
                bordered
                hover
                data={data}
                />
            }
        </>
      );
}

export default LeaveHistoryTable