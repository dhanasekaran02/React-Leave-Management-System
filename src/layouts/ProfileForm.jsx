import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import FormInput from '../components/FormInput';
import ButtonComponent from '../components/ButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeesFromServer, updateEmployeeToServer } from '../slicers/EmployeeSlicer';
import gif from '../assets/images/success.gif'
import Modal from 'react-bootstrap/Modal'


function ProfileForm() {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    delete loggedUser.loggedAs;

    const dispatch = useDispatch();
    const {employeeList} = useSelector((state)=>state.employee);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    function setValue(e){
        setEmployee((prev)=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }

    
    // const loggeduser = employeeList.filter((employee)=> employee.id === loggedUser.id)
    // let [user] = loggeduser;
    const user = loggedUser
    useEffect(()=>{
        dispatch(getEmployeesFromServer())
        setEmployee({
            firstName:user.firstName,
            lastName:user.lastName,
            dob:user.dob,
            phone:user.phone,
            designation:user.designation,
            deptName:user.deptName,
            employeeMailId:user.employeeMailId,
            country:user.country,
            state:user.state
        })
    },[dispatch])
    
    //setting state value to edit form
    const [employee,setEmployee] = useState({
        firstName:"",
        lastName:"",
        dob:"",
        phone:"",
        deptName:"",
        employeeMailId:"",
        country:"",
        state:""
    });
    function updateProfile(){
        dispatch(updateEmployeeToServer({...user,...employee}));
        handleShow()
    }
    return (
        <div className="profile_form">
        <Form>
            <div className="profile_left_form">
                <FormInput type="text" label="First Name" name="firstName" value={employee.firstName} onChange={setValue} id="firstname"/>
                <FormInput type="text" label="Last Name" name="lastName" value={employee.lastName} onChange={setValue} id="lastname"/>
                <FormInput type="date" label="Date of birth" name="dob" value={employee.dob} onChange={setValue} id="dob"/>
                <FormInput type="tel" label="Phone number" name="phone" value={employee.phone} onChange={setValue} id="phone"/>
                <FormInput type="text" label="Country" name="country" value="INDIA" onChange={setValue} id="country"/>
            </div>
            <div className="profile_right_form mt-lg-4 mt-0">
                <FormInput type="text" label="Department Name" placeholder="UI/UX" id="dept" disabled='true'/>
                <FormInput type="text" label="Department ID" placeholder="TM12345" id="deptid" disabled='true'/>
                <FormInput type="text" label="Email ID" value={employee.employeeMailId} id="mail" disabled='true'/>
                <FormInput type="text" label="State" name="state" value={employee.state} onChange={setValue} id="state"/>
            </div>
        </Form>
        <div className='d-flex justify-content-center'>
            <ButtonComponent type="submit" class_name='btn font-bg-color text-white' onClick={updateProfile}>Save</ButtonComponent>
        </div>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton className='heading-bg-color'>
            <Modal.Title  as={() => {
                return <h5 style={{ marginBottom: "0px" }}>Saved Successfully</h5>;
            }} className='form-font'></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={gif} alt=""  style={{width:"100%"}}/>
            </Modal.Body>
        </Modal>
    </div>
  )
}

export default ProfileForm