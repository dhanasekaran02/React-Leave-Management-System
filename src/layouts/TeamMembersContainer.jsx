import React from 'react'
import Col from "react-bootstrap/esm/Col";
import Container from 'react-bootstrap/esm/Container';
import Card from 'react-bootstrap/Card';

function TeamMembersContainer({title="Team's Presence",className,height,children,lg="4",position}) {
  return (
        <Col lg={lg} xs={12} className={`${position} mt-lg-0 mt-3`}>
          <Container fluid className="gy-lg-0 gy-md-4 gy-sm-3 gy-3" id="team-members">
            <Card className={`team_members ${className} overflow-scroll overflow-x-hidden team-member-container`} style={{height:height}}>
                <Card.Body className='p-0 h-100'>
                    <div class="members_heading text-center p-2 heading-bg-color">
                      <p class="mb-0 fw-bold font-color heading-font">{title}</p>
                    </div>
                    {children}
                </Card.Body>
            </Card>
          </Container>
        </Col>
  )
}

export default TeamMembersContainer