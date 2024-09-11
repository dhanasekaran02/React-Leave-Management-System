import React from 'react'
import Row from 'react-bootstrap/Row';
import TeamMembersContainer from '../../layouts/TeamMembersContainer';
import AppliedLeaves from '../../layouts/AppliedLeaves';
import Holiday from '../../layouts/Holiday';
import TeamMembersTable from '../../layouts/manager-layouts/TeamMembersTable'
import TeamMembersCard from '../../components/TeamMembersCard';
import avatar from '../../assets/images/avatar.png'
import HrTeamStatus from '../../layouts/hr-layouts/HrTeamStatus';
import BarChart from '../../components/manager-component/BarChart';
import ManagersTable from '../../layouts/hr-layouts/ManagersTable';

function HrDashboard() {
   
  return (
    <Row lg="2" md="1" sm="1">
            <HrTeamStatus/>
            <TeamMembersContainer title="Overall Department Report" height="380px">
                <BarChart height="320px"/>
            </TeamMembersContainer>
            <AppliedLeaves height="300px" marginTop="-100px" title='Team Members List'>
                <ManagersTable/>
            </AppliedLeaves>
            <Holiday/>
        </Row>
  )
}

export default HrDashboard