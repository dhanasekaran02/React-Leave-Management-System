import React from 'react'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// Footer for modal
function Footer({handleClose,confirm="Submit"}) {
    let style={
        backgroundColor:"#624f27",
        padding:"8px 10px",
        border:"none",
        color:"white"
    }
    return (
        <div>
            <Modal.Footer>
                <Button class_name='btn font-bg-color text-white ' style={style}  onClick={handleClose}>Close</Button>
                <Button class_name='btn font-bg-color text-white' style={style}  onClick={handleClose}>{confirm}</Button>
            </Modal.Footer>
        </div>
    )
}


function ButtonModal({ bgcolor="#eece8b",color="white", button, title, footer = true, children,confirm}) {
    const [show, setShow] = useState(false);
    const handleClose = () =>( setShow(false));
    const handleShow = () => setShow(true);
    const style = {
        backgroundColor: bgcolor,
        color:color
    }
    // Deciding whether we need footer or not
    let foot;
    if (footer !== false) {
        foot = <Footer handleClose={handleClose} confirm={confirm}/>
    }
    return (
        <div>
            <div onClick={handleShow}>
                {button}
            </div>
            <Modal show={show} onHide={handleClose} centered>
                {/* Modal header */}
                <Modal.Header style={style} closeButton>
                    {/* Modal title */}
                    <Modal.Title as={() => {
                        return <p style={{ marginBottom: "0px" }}>{title}</p>;
                    }} className='form-font' >{title}</Modal.Title>
                </Modal.Header>

                {/* Modal Body */}
                <Modal.Body>
                    <Form>
                        {children}
                    </Form>
                </Modal.Body>

                {/* Modal footer if needed */}
                {foot}
            </Modal>
        </div>
    )
}

export default ButtonModal