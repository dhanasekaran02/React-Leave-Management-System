import React,{useEffect} from 'react'
import AppliedLeavesCard from '../components/AppliedLeavesCard'
import {useDispatch,useSelector} from 'react-redux'
import { getLeaveFromServer } from '../slicers/LeaveSlicer'

function AppliedLeavesCardContainer() {
    const dispatch = useDispatch();
    const {leaveSet,error} = useSelector((state)=>state.leave);
    leaveSet.map((leave,index)=>{
      console.log("Leave is array or obj ",leave);
    })
    //whenever there is an update in json the useeffect should dipatch the new update
    useEffect(()=>{
        dispatch(getLeaveFromServer())
    },[dispatch])
  return (
    <>
        {
            leaveSet && leaveSet.map((leave,index)=>{
                return(
                  <AppliedLeavesCard user={leave.toString()} key={index}/>
                //   <div>hello</div>
                );
            })
        }
    </>
  )
}

export default AppliedLeavesCardContainer