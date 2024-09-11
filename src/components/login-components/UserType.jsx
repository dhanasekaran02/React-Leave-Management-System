import React from 'react';
import Form from 'react-bootstrap/Form';

function UserType({name,onChange}) {
  return (
    <div className='mt-2'>
        <Form.Label>User Type</Form.Label>
        <Form.Select aria-label="Default select example" name={name} onChange={onChange} className=" border-secondary">
            <option selected hidden disabled value="">Select</option>
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
            <option value="hr">HR</option>
            <option value="admin">System Admin</option>
        </Form.Select>
    </div>
  )
}

export default UserType