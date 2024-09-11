import React from 'react'
import Col from "react-bootstrap/esm/Col";
import Container from 'react-bootstrap/esm/Container';
import holidayImg from '../../assets/images/upcoming-holiday.png';

function HolidayComponent({date,holiday}) {
  return (
    <Col lg={4} xs={12}>
        <Container fluid className='mt-lg-5 mt-3' id="holiday">
          <div className='holiday d-flex'>
            <div className="left heading-bg-color p-3">
              <h3 className="fs-6 mb-0 fw-bold font-color">Upcoming Holiday</h3>
              <img src={holidayImg} alt="" width="75" height="75" />
            </div>
            <div className="right">
              <h3><span>2</span>Oct</h3>
              <p>{holiday}</p>
            </div>
          </div>
        </Container>
    </Col>
  )
}

export default HolidayComponent