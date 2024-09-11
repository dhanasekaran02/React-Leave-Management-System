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
            label:'Deparment',
            field:'department',
            sort:'asc',
            width:100
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
            department:'Backend',
            mail:"bdstechm@techm.co.in",
            id:"TM12345",
            phone:"123456789"
        },
        {
            sno:"2",
            member:"Arun",
            department:'Backend',
            mail:"aruntechm@techm.co.in",
            id:"TM12346",
            phone:"123456789"
        },
        {
            sno:"3",
            member:"Bhadriprasath",
            department:'UI/UX',
            mail:"bhadritechm@techm.co.in",
            id:"TM12347",
            phone:"123456789"
        },
        {
            sno:"4",
            member:"Surjitkumar",
            department:'UI',
            mail:"surjitechm@techm.co.in",
            id:"TM12348",
            phone:"123456789"
        },
        {
            sno:"5",
            member:"Cheran",
            department:'Testing',
            mail:"cherantechm@techm.co.in",
            id:"TM12349",
            phone:"123456789"
        },
        {
            sno:"6",
            member:"Kishorkumar",
            department:'Backend',
            mail:"kktechm@techm.co.in",
            id:"TM12341",
            phone:"123456789"
        },
        
        
    ]
};

function ManagersTable() {
  return (
    // <div className="applied_leave_desc">
    //     <Table bordered hover className="leave_table" id="leave-history-table">
    //         <thead>
    //             <tr>
    //                 <th>S.no</th>
    //                 <th>Members</th>
    //                 <th>Email Id</th>      
    //                 <th>ID</th>
    //                 <th>Phone</th>
    //             </tr>
    //         </thead>
    //         <tbody>
    //             <tr>
    //                 <td>1</td>
    //                 <td>Dhanasekaran</td>
    //                 <td>bdstechm@techm.co.in</td>
    //                 <td><span>TM12345</span></td>
    //                 <td>123456789</td>
    //             </tr>
    //             <tr>
    //                 <td>2</td>
    //                 <td>Arun</td>
    //                 <td>aruntechm@techm.co.in</td>
    //                 <td><span>TM12635</span></td>
    //                 <td>123456789</td>
    //             </tr>
    //             <tr>
    //                 <td>3</td>
    //                 <td>Cheran</td>
    //                 <td>cherstechm@techm.co.in</td>
    //                 <td><span>TM12645</span></td>
    //                 <td>123456789</td>
    //             </tr>
    //             <tr>
    //                 <td>4</td>
    //                 <td>Bhadriprasath</td>
    //                 <td>bhadritechm@techm.co.in</td>
    //                 <td><span>TM12325</span></td>
    //                 <td>123456789</td>
    //             </tr>
    //             <tr>
    //                 <td>5</td>
    //                 <td>Kishorkumar</td>
    //                 <td>kktechm@techm.co.in</td>
    //                 <td><span>TM12645</span></td>
    //                 <td>123456789</td>
    //             </tr>
    //             <tr>
    //                 <td>6</td>
    //                 <td>Surjitkumar</td>
    //                 <td>surjittechm@techm.co.in</td>
    //                 <td><span>TM12545</span></td>
    //                 <td>123456789</td>
    //             </tr>
    //         </tbody>
    //     </Table>
    // </div>
        <MDBDataTable
          responsive
          bordered
          hover
          data={data}
        />
  );
}

export default ManagersTable