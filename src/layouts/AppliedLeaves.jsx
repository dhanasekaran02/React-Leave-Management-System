import React from 'react'
import Col from "react-bootstrap/esm/Col";
import Container from 'react-bootstrap/esm/Container';
import Card from 'react-bootstrap/Card';



function AppliedLeaves({height,marginTop,title="Applied Leaves",children}) {
  return (
    <Col lg={8} xs={12} id="applied-leave" style={{marginTop:marginTop}}>
        <Container fluid>
            <Card className='applied_leaves'>
                <Card.Body className='p-0 h-100'>
                    {/* Heading */}
                    <div className="applied_leave_heading heading-bg-color ps-3">
                        <p className="mb-0 fw-bold font-color heading-font">{title}</p>
                    </div>

                    {/* Applied leave container */}
                    <div className='applied_leave_desc overflow-scroll overflow-x-hidden' style={{height:height}}>
                        {children}
                    </div>
                </Card.Body>
            </Card>
        </Container>
    </Col>
  )
}

export default AppliedLeaves