import React from 'react'
import Form from 'react-bootstrap/Form';


function FormCheck({label,name,type,id,checked}) {
  return (
    <div className='mb-1 me-3'>
         <Form.Check
            inline
            label={label}
            name={name}
            type={type}
            id={id}
            checked={checked}
          />
    </div>
  )
}

export default FormCheck