import React from 'react'
import Form from 'react-bootstrap/Form';

function RadioButton({label,name,type,id,value,onChange,checked}) {
  return (
    <>
        <Form.Check // prettier-ignore
        type="radio"
        id={id}
        name={name}
        label={`${label}`}
        value={value}
        onChange={onChange}
        checked={checked}
        />
    </>
  )
}

export default RadioButton