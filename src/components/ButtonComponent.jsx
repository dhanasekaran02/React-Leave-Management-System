import React from 'react';
import Button from 'react-bootstrap/Button';

function ButtonComponent({type="button",color="#624f27",class_name="modal-btn",id,children,onClick,onSubmit}) {
    let style={
        backgroundColor:color,
        padding:"10px",
        border:"none",
        color:"white",
        borderRadius:"4px"
    }
  return (
    <>
        <Button type={type} id={id} style={style} className={class_name} onClick={onClick} onSubmit={onSubmit}>
            {children}
        </Button>
    </>
  )
}

export default ButtonComponent