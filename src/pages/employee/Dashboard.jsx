import CardContainer from '../../layouts/CardContainer';
import TeamMembersContainer from '../../layouts/TeamMembersContainer';
import AppliedLeaves from '../../layouts/AppliedLeaves';
import Holiday from '../../layouts/Holiday';
import CardComponent from '../../components/CardComponent';
import Row from 'react-bootstrap/Row';
import AppliedLeavesCard from '../../components/AppliedLeavesCard';
import React,{ useEffect } from 'react'
import TeamMembersCard from '../../components/TeamMembersCard';
import {useDispatch,useSelector} from 'react-redux'
import { getLeaveFromServer } from '../../slicers/LeaveSlicer';
import Col from 'react-bootstrap/Col';
import EmployeeCardComponent from '../../components/employee-componets/EmployeeCardComponent';


function Dashboard() {
    const dispatch = useDispatch();
    const {leaveSet,error} = useSelector((state)=>state.leave);
    const appliedLeaves = leaveSet.map(leave => leave);
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    let leaveboolean = false;
    //whenever there is an update in json the useeffect should dipatch the new update
    useEffect(()=>{
        dispatch(getLeaveFromServer());
    },[dispatch])
  return (
    <Row lg="2" md="1" sm="1">
        <EmployeeCardComponent/>
        <TeamMembersContainer height="380px">
            <TeamMembersCard member="Dhanasekaran B" memberId="TM12345" status="Present"/>
            <TeamMembersCard member="Arun M" memberId="TM12345" status="Present"/>
            <TeamMembersCard member="Bhadriprasath BJ" memberId="TM12345" status="Leave"/>
            <TeamMembersCard member="Surjitkumar A" memberId="TM12345" status="Present"/>
            <TeamMembersCard member="Cheran J" memberId="TM12345" status="Leave"/>
            <TeamMembersCard member="Kishorkumar B" memberId="TM12345" status="Leave"/>
        </TeamMembersContainer>
        <AppliedLeaves height="300px" marginTop="-110px">
        {
                appliedLeaves?.reverse().filter((leave)=> loggedUser.id === leave.empid ).map((leave,index)=>{
                    leaveboolean = true;
                    return(
                        <AppliedLeavesCard user={leave}/>
                    );
                })
        }
        {
            (leaveboolean)?null:(<h3 className='text-secondary d-flex justify-content-center h-100 align-items-center' >No Applied Leaves Found</h3>)
        }
        </AppliedLeaves>
        <Holiday holiday="Gandhi Jayanthi"/>
    </Row>
  )
}

export default Dashboard