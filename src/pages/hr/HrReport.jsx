import React from 'react'
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import SectionHeading from '../../components/SectionHeading'
import TeamMembersContainer from '../../layouts/TeamMembersContainer';
import TeamMembersCard from '../../components/TeamMembersCard';
import ButtonComponent from '../../components/ButtonComponent';
import HighestLeave from '../../components/HighestLeave';
import ReportChart from '../../components/ReportChart';
import avatar from '../../assets/images/avatar.png'
import ExampleLineChart from '../../components/manager-component/ExampleLineChart';
import EmployeeLeaveHistoryTable from '../../layouts/hr-layouts/EmployeeLeaveHistoryTable';


function HrReport() {
    const style={
        width:"350px",
        height:"300px"
    }
  return (
    <div className='main_report me-5'>
        <SectionHeading title="Leave Report"/>

        <Row xs={2} className='leave_report pb-3 ms-sm-0 ms-3'>
            {/* Column 1 */}
            <Col sm={12} xl={4} className='report-col-1 col-12 pe-2 ps-2 ps-lg-4 ms-sm-0 ms-3 position-relative'>
                {/* Team members container */}
                <TeamMembersContainer height="70vh" className="team-mem-presence" lg="12" position="sticky">
                    <TeamMembersCard member="Dhanasekaran B" memberId="TM12345" status="TM12345">
                        <img src={avatar} alt="avatar" width="40" height="40" className='me-2'/>
                    </TeamMembersCard>
                    <TeamMembersCard member="Arun M" memberId="TM12345" status="TM12345">
                        <img src={avatar} alt="avatar" width="40" height="40" className='me-2'/>
                    </TeamMembersCard>
                    <TeamMembersCard member="Bhadriprasath BJ" memberId="TM12345" status="TM12345" st>
                        <img src={avatar} alt="avatar" width="40" height="40" className='me-2'/>
                    </TeamMembersCard>
                    <TeamMembersCard member="Dharshinipriya V" memberId="TM12345" status="TM12345">
                        <img src={avatar} alt="avatar" width="40" height="40" className='me-2'/>
                    </TeamMembersCard>
                    <TeamMembersCard member="Surjitkumar A" memberId="TM12345" status="TM12345">
                        <img src={avatar} alt="avatar" width="40" height="40" className='me-2'/>
                    </TeamMembersCard>
                    <TeamMembersCard member="Kishorkumar B" memberId="TM12345" status="TM12345">
                        <img src={avatar} alt="avatar" width="40" height="40" className='me-2'/>
                    </TeamMembersCard>
                </TeamMembersContainer>
            </Col>

            {/* Column 2 */}
            <Col xl={8} xs={12} className="report-col-2 statistics mt-sm-3 mt-xl-0">
                {/* Row */}
                <Row>
                    {/* Sub column 1 */}
                    <Col xs={12} className="sub-col d-flex justify-content-around flex-sm-row flex-column mt-3">
                        {/* Report 1 */}
                        <div className="data-load card p-0 flex-shrink-0 me-md-2 me-lg-0" >
                            {/* <!-- upload and download data --> */}
                            <div className="imp_exp card-header border-0 p-2 d-flex flex-sm-column flex-md-row justify-content-around rounded-top-3 pt-2">
                                <ButtonComponent class_name='import' color='#473610'>&uarr;&nbsp;Upload Data</ButtonComponent>
                                <ButtonComponent class_name='export' color='#473610'>&darr;&nbsp;Download Data</ButtonComponent>
                            </div>

                            {/* highest leave */}
                            <HighestLeave name="Raj Kumar" dept="IT department" days={12}/>
                        </div>

                        {/* Report 2 */}
                        <div className="charts flex-shrink-0 me-md-2 me-lg-0" style={style}>
                            <div className="chart card h-100">
                                <ReportChart title="Tracking Leave Trends" chartId="chartId">
                                    <ExampleLineChart chartColor="hotpink"/>
                                </ReportChart>
                            </div>
                        </div>
                    </Col>

                    {/* sub-column 2 */}
                    <Col xs={12} className="sub-col d-flex justify-content-around flex-sm-row flex-md-column mt-3" style={{height:"300px",overflowY:"scroll"}}>
                        <div class="leave_taken_history overflow-y-scroll rounded-top-3">
                            {/* <!-- Heading --> */}
                            <div class="chart_heading card-heading rounded-top-2 p-2 d-flex heading-bg-color">
                                <h6 class="fs-5 font-color fw-semibold mb-0">Dhanasekaran's Holidays</h6>
                            </div>
                            {/* <!-- Leave History Table --> */}
                            <div class=" leave_taken_table d-flex justify-content-center">    
                                <EmployeeLeaveHistoryTable/>        
                            </div>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>
  )
}

export default HrReport