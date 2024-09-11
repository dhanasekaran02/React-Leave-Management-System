import React from 'react'
import Col from "react-bootstrap/esm/Col";

function Present(){
    return(
        <p className="present mb-0">Present</p>
    );
}

function Leave(){
    return(
        <p className="on_leave mb-0">On Leave</p>
    );
}

function Normal({status,className}){
    return(
        <p className={`mb-0 ${className}`}>{status}</p>
    );
}

function TeamMembersCard({member,memberId,status,children,className}) {
  let state = (status.charAt(0) === 'P');
  let leave = (status.charAt(0) === 'L');
  let component;
  if(state) component = <Present/>
  else if(leave) component = <Leave/>
  else  component = <Normal status={status} className={className}/>
  return (
    <div className='member_card p-2 d-flex align-items-center mb-1'>
        <Col xs={8} className='left_member_card ps-lg-2 ps-0 d-flex align-items-center'>
            {children}
            <div>
                <p class="m-0 member-name team-member-font">{member}</p>
                <p id="team_id" class="team-member-font mb-0">{memberId}</p>
            </div>
        </Col>
        <Col xs={4} className='class="right_member_card ps-lg-4 ps-md-0"'>
            {component}
        </Col>
    </div>
  )
}

export default TeamMembersCard