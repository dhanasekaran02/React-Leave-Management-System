import React, { useEffect, useRef } from 'react'
import {MDBDataTable} from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import { getLeaveTypeFromServer } from '../../slicers/LeaveTypeSlicer';


function LeaveTypeTable() {

    console.log(JSON.parse(localStorage.getItem("loggedUser")));
    const dispatch = useDispatch();
    const ref = useRef(0);
    let count = 0;
    const {leaveTypeSet} = useSelector((state)=>state.leavetype);
    useEffect(()=>{
        dispatch(getLeaveTypeFromServer());
        ref.current = ref.current+1;
        console.log("Current ref",ref.current);
    },[dispatch]);

    const rows = leaveTypeSet.map((leavetype)=>{
        return leavetype;
    })

    console.log("leaveType Directly from server: ",leaveTypeSet);
    console.log("Leavetype after mapping: ",rows);
    const data = {
        columns: [
            {
                label:'Leave Name',
                field:'name',
                sort:'asc',
                width:150
            },
            {
                label: 'Leave Enabled',
                field: 'enabled',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Set as Default',
                field: 'default',
                sort: 'asc',
                width: 270
            },
            {
                label: 'Deduct from Annual Leave',
                field: 'annual',
                sort: 'asc',
                width: 200
            },
            {
                label:'No.of.days',
                field:'days',
                sort:'asc',
                width:100
            }
        ],
        rows: rows
    };
    

  return (
    <MDBDataTable
        responsive
        bordered
        centered
        hover
        data={data}
    />  
  );
}

export default LeaveTypeTable