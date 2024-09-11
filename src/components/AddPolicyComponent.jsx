import React from 'react'
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';

function AddPolicyComponent({policy}) {
  return (
    <li>
        <span>{policy.policyName}</span>
        <Row className='policy-row'>
          <Col lg={9} sm={11} style={{width:"90%"}}>
            <div className='policy ms-4 mt-2'>
              {policy.description}
            </div>
          </Col>
        </Row>
        <hr />
    </li>
  );
}

export default AddPolicyComponent