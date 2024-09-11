import React, { useEffect } from 'react'
import LeavePolicy from '../../layouts/LeavePolicy'
import { useDispatch, useSelector } from 'react-redux'
import { getPolicyFromServer } from '../../slicers/LeavePolicySlicer';
import AddPolicyComponent from '../../components/AddPolicyComponent';

function Policies() {

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getPolicyFromServer())
  });

  let nopolicy = true;
  const {policySet,error} = useSelector((state)=>state.policy);
  return (
    <LeavePolicy>
      {
        policySet && policySet.map((policy)=>{
          nopolicy = false;
            return(
                <AddPolicyComponent policy={policy}/>
            );
        })
      }
      {nopolicy?<h3 className='d-flex justify-content-center text-secondary'>No Policies</h3>:null}
    </LeavePolicy>
  )
}

export default Policies