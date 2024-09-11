import React from 'react'
import {MDBDataTable} from 'mdbreact';

const data = {
    columns: [
        {
            label:'S.no',
            field:'sno',
            sort:'asc',
            width:150
        },
        {
            label: 'Members',
            field: 'member',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Email ID',
            field: 'mail',
            sort: 'asc',
            width: 270
        },
        {
            label: 'ID',
            field: 'id',
            sort: 'asc',
            width: 200
        },
        {
            label: 'Phone',
            field: 'phone',
            sort: 'asc',
            width: 100
        },
    ],
    rows: [
        {
            sno:"1",
            member:"Dhanasekaran",
            mail:"bdstechm@techm.co.in",
            id:"TM12345",
            phone:"123456789"
        },
        {
            sno:"2",
            member:"Arun",
            mail:"aruntechm@techm.co.in",
            id:"TM12346",
            phone:"123456789"
        },
        {
            sno:"3",
            member:"Bhadriprasath",
            mail:"bhadritechm@techm.co.in",
            id:"TM12347",
            phone:"123456789"
        },
        {
            sno:"4",
            member:"Dharshinipriya V",
            mail:"dp@techm.co.in",
            id:"TM12348",
            phone:"123456789"
        },
        {
            sno:"5",
            member:"Surjitkumar",
            mail:"surjitechm@techm.co.in",
            id:"TM12349",
            phone:"123456789"
        },
        {
            sno:"6",
            member:"Kishorkumar",
            mail:"kktechm@techm.co.in",
            id:"TM12341",
            phone:"123456789"
        },
        
        
    ]
};

function TeamMembersTable() {
  return (
        <MDBDataTable
          responsive
          bordered
          hover
          data={data}
        />
  );
}

export default TeamMembersTable