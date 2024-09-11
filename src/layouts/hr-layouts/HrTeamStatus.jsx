import React from 'react'
import Col from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import SelectDate from '../../components/manager-component/SelectDate'
import CardComponent from '../../components/CardComponent';
import report from '../../assets/images/gauge.png';
import { NavLink } from 'react-router-dom';

function HrTeamStatus() {
    let Report = <NavLink to='report'><img src={report} alt="Report" width="150" height="120" /></NavLink>
  return (
    <Col lg={7} xl={8} className='leave-types-container p-3 pe-sm-0 pe-md-0 pe-lg-3 pe-3 py-0'>
        <Row className='leave_types me-2 p-2 body-bg-color rounded-3 ms-1 ms-sm-0 ms-lg-2 ms-md-0'>
            <Container fluid>
                <Col className='inner_leave_heading d-flex align-items-center form-font'>
                    <SelectDate/>
                </Col>
                <Col  className="inner_leave_block d-flex flex-wrap flex-lg-wrap flex-xl-nowrap flex-sm-wrap flex-lg-wrap justify-content-lg-evenly justify-content-between justify-content-xl-between p-2 body-bg-color flex-grow-1 justify-content-sm-evenly">
                    <Container fluid className='d-flex flex-wrap flex-sm-wrap justify-content-md-between justify-content-around p-2 '>
                        {/* <SelectDate/> */}
                        <CardComponent title="Total Employee" count={26} content="Members" />
                        <CardComponent title="On Present" count={17} content="Requests" />
                        <CardComponent title="On Leave" count={12} content="Members" />
                        <CardComponent title="Report" count={Report} />
                    </Container>
                </Col>
            </Container>
        </Row>
    </Col>
  )
}

export default HrTeamStatus