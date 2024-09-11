import React from 'react'
import { policy } from '../components/utilities/LeavePolicies'
import AddPolicyComponent from '../components/AddPolicyComponent'
import SectionHeading from '../components/SectionHeading'
function LeavePolicy({children}) {
  return (
    <div className="policy_section main_policy_container ps-sm-2 ps-md-3 ps-lg-0" id="Policy">
        <div className="policies ms-lg-3 ms-md-0">
            <SectionHeading title="Leave Policies"/>
        </div>

        {/* policy container */}
        <div className='policy_container'>
            <div className='policy_list'>
                <h4 className='fs-5'>Leave Policy</h4>

                <div className='leave_policy_list'>
                    <ol>
                        {children}
                    </ol>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LeavePolicy