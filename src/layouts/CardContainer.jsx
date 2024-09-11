import React from 'react'
import Col from "react-bootstrap/esm/Col";
import Container from 'react-bootstrap/Container';


function CardContainer({days,children}) {
  return (
        <Col lg={8} xs={12}>
          <Container fluid>
                {days}
            <Container fluid className='inner_leave_types d-flex flex-wrap flex-sm-wrap justify-content-md-between justify-content-around p-2 body-bg-color'>
                {children}
            </Container>
          </Container>
        </Col>
  )
}

export default CardContainer