import React, { useEffect } from 'react'
import SectionHeading from '../../components/SectionHeading'
import AppliedLeaveStatus from '../../components/AppliedLeaveStatus'
import LeaveHistoryTable from '../../layouts/LeaveHistoryTable';
import {useDispatch,useSelector} from 'react-redux'
import { getLeaveFromServer } from '../../slicers/LeaveSlicer';

function LeaveHistory() {
    const dispatch = useDispatch();
    // const {leaveSet,error} = useSelector((state)=>state.leave);
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    //whenever there is an update in json the useeffect should dipatch the new update
    // console.log(leaveSet);
    // console.log("Example");
    // const employeeLeave = leaveSet.filter((leave)=>{
    //     if(leave.empid === loggedUser.id && leave.status === "pending"){
    //         return leave;
    //     }
    // })

    // console.log(employeeLeave);
    const {leaveSet} = useSelector((state)=>state.leave);
    useEffect(()=>{
        dispatch(getLeaveFromServer())
    },[leaveSet])
    let count=false;
  return (
    <div className='main_leave_history leave_history ms-sm-1 ms-md-2 ms-lg-0'>
        <SectionHeading title="Pending Leave & History"/>

        <div className='inner_leave_history body-bg-color m-0 p-3 h-auto'>
            <div className='pending_leave_history overflow-x-scroll'>
                {/* <!-- Pending requested history --> */}
                <div className='pending_leave_history_inner d-flex flex-wrap gy-2 justify-content-evenly'>
                    {
                        leaveSet && (leaveSet.filter((leave)=> loggedUser.id === leave.empid && leave.status === "pending" ).map((leave,index)=>{
                            count = true;
                            return(
                                <AppliedLeaveStatus user={leave} className='applied_pending_leave_history mb-4' keys={index}/>
                            );
                        }))
                    }
                    {/* if there is no leave */}
                    {
                        (count==0)?(<h3 className='text-secondary d-flex justify-content-center h-100 align-items-center' >No Applied Leaves Found</h3>):null
                    }
                </div>
                

                <hr id="line"/> 
                {/* Leave history table */}
                <div className='leave_taken_history overflow-y-scroll'>
                    <div className='leave_taken_table d-flex justify-content-center'>
                        <LeaveHistoryTable/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LeaveHistory