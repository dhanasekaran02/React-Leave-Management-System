import React from 'react'
import Row from 'react-bootstrap/Row';
import TeamMembersContainer from '../../layouts/TeamMembersContainer';
import AppliedLeaves from '../../layouts/AppliedLeaves';
import Holiday from '../../layouts/Holiday';
import ManagerCardContainer from '../../layouts/manager-layouts/ManagerCardContainer';
import TeamMembersTable from '../../layouts/manager-layouts/TeamMembersTable'
import TeamMembersCard from '../../components/TeamMembersCard';
import avatar from '../../assets/images/avatar.png'


function ManagerDashboard() {
  return (
        <Row lg="2" md="1" sm="1">
            <ManagerCardContainer/>
            <TeamMembersContainer title="Team's Presence" height="380px">
                <TeamMembersCard member="Dhanasekaran B" memberId="TM12345" status="Present">
                    <img src={avatar} alt="avatar" width="40" height="40" className='me-2'/>
                </TeamMembersCard>
                <TeamMembersCard member="Arun M" memberId="TM12345" status="Present">
                    <img src={avatar} alt="avatar" width="40" height="40" className='me-2'/>
                </TeamMembersCard>
                <TeamMembersCard member="Dharsinipriya V" memberId="TM12345" status="Leave">
                    <img src={avatar} alt="avatar" width="40" height="40" className='me-2'/>
                </TeamMembersCard>
                <TeamMembersCard member="Bhadriprasath BJ" memberId="TM12345" status="Leave">
                    <img src={avatar} alt="avatar" width="40" height="40" className='me-2'/>
                </TeamMembersCard>
                <TeamMembersCard member="Surjitkumar A" memberId="TM12345" status="Present">
                    <img src={avatar} alt="avatar" width="40" height="40" className='me-2'/>
                </TeamMembersCard>
                <TeamMembersCard member="Kishorkumar B" memberId="TM12345" status="Leave">
                    <img src={avatar} alt="avatar" width="40" height="40" className='me-2'/>
                </TeamMembersCard>
            </TeamMembersContainer>
            <AppliedLeaves height="300px" marginTop="-100px" title='Team Members List'>
                <TeamMembersTable/>
            </AppliedLeaves>
            <Holiday/>
        </Row>
  )
}

export default ManagerDashboard