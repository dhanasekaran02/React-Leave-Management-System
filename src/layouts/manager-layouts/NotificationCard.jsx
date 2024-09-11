import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import avatar from '../../assets/images/avatar.png';
import ButtonModal from '../../components/ButtonModal';
import FormInput from '../../components/FormInput';
import { useDispatch, useSelector } from 'react-redux';
import { updateLeaveToServer,setSelectedLeave, getLeaveFromServer } from '../../slicers/LeaveSlicer';
import ButtonComponent from '../../components/ButtonComponent';

function NotificationCard({obj}) {
    const [accept,setAccept] = useState(false);
    const [reject,setReject] = useState(false);
    //assign approve modal
    const [assign_approve,setAssignApprove] = useState(false);

    //assign approve value
    const [assign,setAssign] = useState("");

    // useEffect(()=>{
    //     dispatch(getLeaveFromServer())
    // },[dispatch])
    //dispatching and getting selected user
    const dispatch = useDispatch();

    function approved(user){
        if(user.assignedPerson !== undefined){
            const leaveuser = {...user};
            delete leaveuser.assignedPerson;
            // console.log("leave user after deleting: ",leaveuser)
            dispatch(updateLeaveToServer({...leaveuser,status:"approved"}))
        }
        else{
            dispatch(updateLeaveToServer({...user,status:"approved"}))
        }
    }

    function rejected(user){
        if(user.assignedPerson !== undefined){
            const leave = {...user};
            delete leave.assignedPerson;
            // console.log("if rejected has been called ");
            dispatch(updateLeaveToServer({...leave,status:"rejected"}))
        }
        else{
            dispatch(updateLeaveToServer({...user,status:"rejected"}))
        }
    }

    function assignApprove(user){
        dispatch(updateLeaveToServer({...user,status:"approved",assignedPerson:assign}));
    }


    function onAccept(leave){
        setAccept(true);
        setReject(false);
        setAssignApprove(false);

        // calling approved function to set status as approved
        approved(leave);
    }
    function onReject(leave){
        setAccept(false);
        setReject(true);
        setAssignApprove(false);

        // calling approved function to set status as rejected
        rejected(leave)
    }

    function onAssignApprove(leave){
        setAssignApprove(true);
        setAccept(false);
        setReject(false);

        // calling approved function to set status as rejected
        assignApprove(leave);
    }

    const empname = obj.empname;
    const desig = obj.designation.replace(/^./, obj.designation[0].toUpperCase());
    const startDate = new Date(obj.startDate).toLocaleDateString('en-GB').replace(/\//g, '-');
    const endDate = new Date(obj.endDate).toLocaleDateString('en-GB').replace(/\//g, '-');
    const leaveType = obj.leaveType.charAt(0).toUpperCase() + obj.leaveType.slice(1)+" Leave";
  return (
    <Card className='notification-card flex-shrink-0 me-4' style={{width:"350px"}}>
        <Card.Header className='heading-bg-color notification-header '>
            <div className='profile-info d-flex align-items-center justify-content-between column-gap-3 h-100'>
                <div className='d-flex align-items-center column-gap-2'>
                    <img src={avatar} alt="Profile" width="40" height="40" />
                    <div className="name-and-designation">
                        <p className='mb-0'>{empname}</p>
                        <p className='mb-0'>{desig}</p>
                    </div>
                </div>
                <div className="applied-date h-100">
                    <p className='mb-0'>{obj.appliedDate}</p>
                </div>
            </div>
        </Card.Header>
        <Card.Body className='leave-reason'>
            <div className="from-to-date d-flex justify-content-between mb-2">
                <p className="font-color fw-semibold mb-1">{startDate}<span className="text-black fw-normal mx-2">To</span>{endDate}</p>
                <p className="days-color mb-1"><b>{`${obj.noOfDays} days`}</b></p>
            </div>
            <div className="leave-type d-flex column-gap-3 align-items-center mb-2">
                <p className="leave-color fw-bold mb-1">Leave Type :</p>
                {/* <!-- <span>:</span> --> */}
                <p className='mb-1'>{leaveType}</p>
            </div>
            <div className="leave-reason mb-2" style={{whiteSpace:"normal"}}>
                <p className="leave-color fw-bold mb-1">Reason</p>
                <p className="reason-leave overflow-y-scroll ps-1">{obj.reason}</p>
            </div>
            <div className="suggested d-flex column-gap-3">
                {obj.suggestion?(<>
                    <p className="leave-color fw-bold mb-1">Suggestion : </p>
                    <p>{obj.suggestion}</p>
                </>):null}
            </div>
        </Card.Body>
        <Card.Footer className='border-0 bg-white'>
            <div className="buttons">
                <p id="accept" className={`${(obj.status == "approved" )?"d-block":"d-none"} member mb-0 text-success fw-semibold`}>Approved</p>
                <button id="approve" onClick={()=>onAccept(obj)} className={(obj.status == "approved")?"d-none":"d-block"}>&#x2713;&nbsp;Approve</button>
                <button id="reject" onClick={()=>onReject(obj)} className={(obj.status == "rejected")?"d-none":"d-block"}>&#x2717;&nbsp;Reject</button>
                <p id="rejected" className={`${(obj.status == "rejected")?"d-block":"d-none"} member mb-0 text-danger fw-semibold`}>Rejected</p>
            </div>
            <div class="assign_approve mb-2">
                <p id="assign" className={`${obj.assignedPerson?"d-block":"d-none"} member mb-0 fw-semibold`}> Assigned & Approved</p>
                <div>
                <ButtonModal 
                button={<button type="button" data-bs-toggle="modal" data-bs-target="#assign_Approve" className={` ${obj.assignedPerson?"d-none":"d-block"} assign_Approve`}>Assign & Approve</button>} 
                color="black"
                title="Assign & Approve"
                footer={false}
                >
                    <FormInput type="text" label="Assign an Employee" name="assign" value={assign} onChange={(e)=>(setAssign(e.target.value))} id="assign-person" />
                    <div className='d-flex justify-content-end mt-3'>
                        <ButtonComponent onClick={()=>onAssignApprove(obj)}>Submit</ButtonComponent>
                    </div>
                </ButtonModal>
                </div>
            </div>
        </Card.Footer>
    </Card>
  )
}

export default NotificationCard