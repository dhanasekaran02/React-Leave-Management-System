import React from 'react'
import {MDBDataTable} from 'mdbreact';
                  

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
            field: 'totalDays',
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
    rows:  [
        {
          leaveType: "Casual Leave",
          startDate: "12-10-2023",
          endDate: "14-10-2023",
          totalDays: "03",
          reason: "Need to take leave",
        },
        {
          leaveType: "Sick Leave",
          startDate: "15-10-2023",
          endDate: "17-10-2023",
          totalDays: "03",
          reason: "Small Fever",
        },
        {
          leaveType: "LOP Leave",
          startDate: "21-09-2023",
          endDate: "23-09-2023",
          totalDays: "03",
          reason: "Loss Of Pay Leave to be taken",
        },
        {
          leaveType: "Casual Leave",
          startDate: "12-10-2023",
          endDate: "14-10-2023",
          totalDays: "03",
          reason: "Need to take leave",
        }
      ]
};

                                    
function EmployeeLeaveHistoryTable() {


    return (
        <MDBDataTable
        centered
        responsive
        bordered
        hover
        data={data}
        />
      );
}

export default EmployeeLeaveHistoryTable