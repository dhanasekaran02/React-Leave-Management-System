import React from 'react'
import Form from 'react-bootstrap/Form';


function SelectComponent({label,className="select",id="select",options,name,onChange,onClick,onSelect,setDefault}) {
  return (
    <div className='mb-1 mt-2'>
        <Form.Select className={className} name={name} id={id} defaultValue={setDefault} aria-label="Default select example" onChange={onChange} onClick={onClick} onSelect={onSelect} style={{border:"1px solid grey"}}>
            <Form.Label>{label }</Form.Label>
            {/* options */}
            <option value="" selected hidden disabled key={1} >Select</option>
            {
                options.map((key,value)=>{
                    return(
                        <option value={key.value} key={key.key}>{key.name}</option>
                    );
                })
            }
        </Form.Select>
    </div>
  )
}

export default SelectComponent