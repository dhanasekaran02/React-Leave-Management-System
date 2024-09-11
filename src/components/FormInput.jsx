import React from 'react';
import Form from 'react-bootstrap/Form';

function Important({type,label,placeholder,id,name,value,onChange, onKeyUp,className="mt-3"}){
  return(
    <div>
        <Form.Group className={className} controlId={id}>
            <Form.Label>{label}<sup className='text-danger fw-semibold' style={{fontSize:"16px"}}>*</sup></Form.Label>
            <Form.Control type={type} placeholder={placeholder} name={name} value={value} onChange={onChange} onKeyUp={onKeyUp} className="border-secondary"/>
        </Form.Group>
    </div>
  );
}

function DisabledForm({type,label,placeholder,id,value}){
return(
  <div>
        <Form.Group className="mb-2" controlId={id}>
            <Form.Label>{label}</Form.Label>
            <Form.Control type={type} placeholder={placeholder} value={value} disabled className="border-secondary"/>
            <small></small>
        </Form.Group>
    </div>
);
}

function EnabledForm({type,label,placeholder,id,name,value,onChange,className}){
  return(
    <div>
        <Form.Group className={`${className}  mb-2`} controlId={id}>
            <Form.Label>{label}</Form.Label>
            <Form.Control type={type} placeholder={placeholder} name={name} value={value} onChange={onChange} className="border-secondary"/>
        </Form.Group>
    </div>
  );
}



function FormInput({type,className,label,placeholder,id,name,value,disabled="false",onChange,onKeyUp,important='false'}) {
  let Form = <EnabledForm type={type} label={label} name={name} placeholder={placeholder} id={id} value={value} onChange={onChange} onKeyUp={onKeyUp} className={className}/>
  if(disabled === "true"){
    Form = <DisabledForm type={type} label={label} placeholder={placeholder} id={id} value={value} />
  }
  if(important === 'true') 
    Form = <Important type={type} label={label} className={className} name={name} placeholder={placeholder} id={id} value={value} onChange={onChange} onKeyUp={onKeyUp} />
  return (
     Form
  )
}

export default FormInput