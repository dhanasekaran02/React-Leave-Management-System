import React from 'react'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FormInput from './FormInput';
import { currentPassword, newPassword, confirmNewPassword } from '../javascript/changePasswordValidation';
import { useDispatch } from 'react-redux';
import { updateEmployeeToServer } from '../slicers/EmployeeSlicer';
import Form from 'react-bootstrap/Form'

function ChangePasswordModal({button}) {

    const dispatch = useDispatch();

    const [password,setPassword] = useState({
        current:"",
        newPwd:"",
        confirmNewPwd:""
    })
    const [error,setError] = useState({})

    const user = JSON.parse(localStorage.getItem("loggedUser"));
    const loggedPassword = user.password;

    //validating current password
    function currentPwd(e){
        const {name,value} = e.target
        const error = {};
        setPassword(preValue=>({
            ...preValue,
            [name]:value
        }))
        const pwd = currentPassword(value,loggedPassword);
        if(!pwd[0]){
            error.current = pwd[1];
            setError({...error,...error})
            return false;
        }
        else{
            error.current = null;
            setError({...error,...error});
            return true;
        }

    }

    //validating new password
    function newPwd(e){
        const {name,value} = e.target
        const error = {};
        setPassword(preValue=>({
            ...preValue,
            [name]:value
        }))
        const pwd = newPassword(value,loggedPassword);
        if(!pwd[0]){
            error.new = pwd[1];
            setError({...error,...error})
            return false;
        }
        else{
            error.new = null;
            const data = confirmNewPassword(value,password.confirmNewPwd);
            if(!data[0]) error.confirm="Password Doesn\'t match";
            else error.confirm = null;
            setError({...error,...error});
            return true;
        }

    }

    //validating confirm new password
    function confirmNewPwd(e){
        const {name,value} = e.target
        const error = {};
        setPassword(preValue=>({
            ...preValue,
            [name]:value
        }))
        const pwd = confirmNewPassword(value,password.newPwd);
        if(!pwd[0]){
            error.confirm = pwd[1];
            setError({...error,...error})
            return false;
        }
        else{
            error.confirm = null;
            setError({...error,...error});
            return true;
        }

    }
    function onSubmitValidation(e){
        e.preventDefault();
        const error = {};
        const current = currentPassword(password.current,loggedPassword);
        const New = newPassword(password.newPwd,loggedPassword);
        const confirmNew = confirmNewPassword(password.newPwd,password.confirmNewPwd);

        if(!current[0]){
            error.current= current[1];
        }
        if(!New[0]){
            error.new = New[1];
        }
        if(!confirmNew[0]){
            error.confirm = confirmNew[1];
        }
        if(Object.keys(error).length>0){
            setError({...error});
        }
        else{
            console.log("form has been submitted");
            delete user.loggedAs;
            const User = {...user};
            dispatch(updateEmployeeToServer({...User,password:password.confirmNewPwd}));
            handleClose();
        }
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const style = {
        backgroundColor: "#fbe6b6",
        borderRadius:"10px 10px 0px 0px"
    }
    const btnStyle={
        backgroundColor:"#624f27",
        border:"none !important" 
    }

    return (
        <div>
            <div onClick={handleShow}>
                {button}
            </div>
            <Modal show={show} onHide={handleClose} style={{borderRadius:"10px"}}>
                {/* Modal header */}

                {/* Modal Body */}
                <Modal.Body style={style}>
                    <Form >
                        <FormInput type="password" label="Current Password" name="current" value={password.current} id="currentpwd" onChange={currentPwd}/>
                        {error.current && <small>{error.current}</small>}
                        <FormInput type="password" label="New Password" id="currentpwd" value={password.new} name="newPwd" onChange={newPwd} />
                        {error.new && <small>{error.new}</small>}
                        <FormInput type="password" label="Confirm New Password" id="currentpwd" value={password.confirm} name="confirmNewPwd" onChange={confirmNewPwd} />
                        {error.confirm && <small>{error.confirm}</small>}
                    </Form>
                </Modal.Body>

                {/* Modal footer if needed */}
                <Modal.Footer style={{backgroundColor: "#fbe6b6"}}>
                    <Button class_name='btn font-bg-color text-white border-0' style={btnStyle}  onClick={handleClose}>Close</Button>
                    <Button class_name='btn font-bg-color text-white border-0' style={btnStyle} type='button'  onClick={onSubmitValidation}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ChangePasswordModal