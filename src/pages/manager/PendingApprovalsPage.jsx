import React, { useEffect } from 'react'
import SectionHeading from '../../components/SectionHeading'
import NotificationCard from '../../layouts/manager-layouts/NotificationCard'
import PendingApprovals from '../../layouts/manager-layouts/PendingApprovals'
import { useDispatch, useSelector } from 'react-redux'
import { getLeaveFromServer } from '../../slicers/LeaveSlicer'

function PendingApprovalsPage() {
  const dispatch = useDispatch();
  const {leaveSet,error} = useSelector((state)=>state.leave);
    //whenever there is an update in json the useeffect should dipatch the new update
  useEffect(()=>{
    dispatch(getLeaveFromServer())
    console.log("Leave in page :",leaveSet)
  },[dispatch])

  return (
    <div className="notification-container ps-sm-4 pt-3" id="pending">
        {/* Notification heading */}
        <SectionHeading title="Pending Approvals" />
        
        {/* Pending notification */}
        <PendingApprovals>
            {
                leaveSet && leaveSet.filter((leave)=>leave.status !== "cancelled").map((leave,index)=>{
                    return(
                        <NotificationCard obj={leave}/>
                    );
                })
            }
            {error && <div>No Leaves are pending</div>}

        </PendingApprovals>
    </div>
  )
}

export default PendingApprovalsPage