import React from 'react'
import Col from 'react-bootstrap/Col';
import SelectComponent from '../SelectComponent';
import { day } from '../utilities/selectOption';

function SelectDate() {
  const date = new Date().toLocaleDateString('en-GB').replace(/\//g, '-');
  return (
    <Col className='d-flex align-items-center'>
        <h6 className="fs-5 fw-bold font-color mt-1">Today's Status</h6>
        <h6 className="mx-2">:</h6>
        <h6 className="fs-5 fw-bold font-color mt-1 form-font">{date}</h6>
    </Col>
  )
}

export default SelectDate