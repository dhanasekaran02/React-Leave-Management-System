import React, { useEffect } from 'react'
import {MDBDataTable} from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployeeFromServer, getEmployeesFromServer, setSelectedEmployee, updateEmployeeToServer } from '../../slicers/EmployeeSlicer';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ButtonComponent from '../../components/ButtonComponent';
import SelectComponent from '../../components/SelectComponent';
import { roles,head } from '../../components/utilities/selectOption';
import FormInput from '../../components/FormInput';
import { firstName,lastName,dateOfBirth,phoneNumber,Designation,departmentName,companyMail,passwordEmployee,departmentHead } from '../../javascript/addEmployeeValidation';

function AddNewEmployeeTable() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (employee) => (
        setShow(true),
        dispatch(setSelectedEmployee(employee))
    );

    //to store the data to delete while clicking the delete button
    const [leave,setLeave] = useState({});

    //delete modal
    const [deleteShow, setDeleteShow] = useState(false);
    const handleDeleteClose = () => (
        setDeleteShow(false)
    );
    const handleDeleteShow = (employee) => (
        setDeleteShow(true),
        setLeave({
            ...employee
        })
    )

    //delete dispatch while clicking delete button
    
    //dispatch for store 
    const dispatch = useDispatch();
    const {employeeList} = useSelector((state)=>state.employee);
    //selected employee
    const {selectedEmployee} = useSelector((state)=>state.employee);
    //dispatching employees from server
    useEffect(()=>{
        dispatch(getEmployeesFromServer());
        setEmployee({
            firstName:selectedEmployee.firstName,
            lastName:selectedEmployee.lastName,
            dob:selectedEmployee.dob,
            phone:selectedEmployee.phone,
            designation:selectedEmployee.designation,
            deptName:selectedEmployee.deptName,
            employeeMailId:selectedEmployee.employeeMailId,
            password:selectedEmployee.password,
            manager:selectedEmployee.manager,
        })
    },[dispatch,selectedEmployee]);
    
    function deleteEmployee(){
        dispatch(deleteEmployeeFromServer(leave));
        handleDeleteClose();
    }
    
    const rows = employeeList.map((employee)=>{
        const action = <div className="edit_icon">
                    <ion-icon name="create-outline" className="employee-edit-button" onClick={()=>handleShow(employee)}></ion-icon>
                    <ion-icon name="trash-outline" className="delete" onClick={()=>handleDeleteShow(employee)}></ion-icon>
                </div>
            return ({...employee,action:action})
    });

    const data = {
        columns: [
            {
                label: 'Employee Name',
                field: 'firstName',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Mail ID',
                field: 'employeeMailId',
                sort: 'asc',
                width: 270
            },
            {
                label: 'Dept',
                field: 'deptName',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Emp Id',
                field: 'id',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Phone',
                field: 'phone',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Action',
                field: 'action',
                sort: 'asc',
                width: 100
            }
        ],
        rows:rows
    };

    const [employee,setEmployee] = useState({
        firstName:"",
        lastName:"",
        dob:"",
        phone:"",
        designation:"",
        deptName:"",
        employeeMailId:"",
        password:"",
        manager:""
    });

    const [error,setError] = useState({});

    //first name validation
    function onChangeFname(e){
        const {name,value} = e.target;
        setEmployee(prevValue=>({
            ...prevValue,
            [name]:value
        }))
        const error = {};
        const state = firstName(value);
        if(state[0]){
            error.fname = null;
            setError({...error,...error});
            return true;
        }
        else{
            error.fname=state[1];
            setError({...error,...error});
            return false;
        }
    }

    //last name change validation
    function onChangeLname(e){
        const {name,value} = e.target;
        setEmployee(prevValue=>({
            ...prevValue,
            [name]:value
        }))
        const error = {};
        const state = lastName(value);
        if(state[0]){
            error.lname = null;
            setError({...error,...error});
            return true; 
        }
        else{
            error.lname=state[1];
            setError({...error,...error});
            return false;
        }
    }

    //dob validation
    function onChangeDob(e){
        const {name,value} = e.target;
        setEmployee(prevValue=>({
            ...prevValue,
            [name]:value
        }))
        const error = {};
        const state = dateOfBirth(value);
        if(state[0]){
            error.dob = null;
            setError({...error,...error});
            return true;
        }
        else{
            error.dob=state[1];
            setError({...error,...error});
            return false;
        }
    }

    //phone number validation
    function onChangePhone(e){
        const {name,value} = e.target;
        setEmployee(prevValue=>({
            ...prevValue,
            [name]:value
        }))
        const error = {};
        const state = phoneNumber(value);
        if(state[0]){
            error.phone = null;
            setError({...error,...error});
            return true; 
        }
        else{
            error.phone=state[1];
            setError({...error,...error});
            return false;
        }
    }

    //designation validation
    function onChangeDesignation(e){
        const {name,value} = e.target;
        setEmployee(prevValue=>({
            ...prevValue,
            [name]:value
        }))
        const error = {};
        const state = Designation(value);
        if(state[0]){
            error.desig = null;
            setError({...error,...error});
            return true; 
        }
        else{
            error.desig=state[1];
            setError({...error,...error});
            return false;
        }
    }

    //deptname validation
    function onChangeDepartmentName(e){
        const {name,value} = e.target;
        setEmployee(prevValue=>({
            ...prevValue,
            [name]:value
        }))
        const error = {};
        const state = departmentName(value);
        if(state[0]){
            error.deptname = null;
            setError({...error,...error});
            return true; 
        }
        else{
            error.deptname=state[1];
            setError({...error,...error});
            return false;
        }
    }

    //company mail validation
    function onChangeMail(e){
        const {name,value} = e.target;
        setEmployee(prevValue=>({
            ...prevValue,
            [name]:value
        }))
        const error = {};
        const state = companyMail(value);
        if(state[0]){
            error.mail = null;
            setError({...error,...error});
            return true; 
        }
        else{
            error.mail=state[1];
            setError({...error,...error});
            return false;
        }
    }

    //password validation
    function onChangePassword(e){
        const {name,value} = e.target;
        setEmployee(prevValue=>({
            ...prevValue,
            [name]:value
        }))
        const error = {};
        const state = passwordEmployee(value);
        if(state[0]){
            error.pwd = null;
            setError({...error,...error});
            return true; 
        }
        else{
            error.pwd=state[1];
            setError({...error,...error});
            return false;
        }
    }

    //department head validation
    function onChangeDeptHead(e){
        const {name,value} = e.target;
        setEmployee(prevValue=>({
            ...prevValue,
            [name]:value
        }))
        const error = {};
        const state = departmentHead(value);
        if(state[0]){
            error.depthead = null;
            setError({...error,...error});
            return true; 
        }
        else{
            error.depthead=state[1];
            setError({...error,...error});
            return false;
        }
    }


    function onSubmitValidation(e){
        e.preventDefault();

        const error = {};
        console.log("function has been called")
        const fname = firstName(employee.firstName)
        const lname = lastName(employee.lastName);
        const dob = dateOfBirth(employee.dob);
        const phone = phoneNumber(employee.phone);
        const design = Designation(employee.designation);
        const deptname = departmentName(employee.deptName);
        const mail = companyMail(employee.employeeMailId);
        const pwd = passwordEmployee(employee.password);
        const manager = departmentHead(employee.manager);

        if(!fname[0]){
            error.fname = fname[1];
        }
        if(!lname[0]){
            error.lname = lname[1];
        }

        if(!dob[0]){
            error.dob = dob[1];
        }

        if(!phone[0]){
            error.phone = phone[1];
        }

        if(!design[0]){
            error.designation = design[1];
        }

        if(!deptname[0]){
            error.deptname = deptname[1];
        }

        if(!mail[0]){
            error.mail = mail[1];
        }

        if(!pwd[0]){
            error.password = pwd[1];
        }

        if(!manager[0]){
            error.depthead = manager[1];
        }

        if(Object.values(error).length >0)
        {   
            setError({...error});
        }
        else
        {
            console.log("form submitted successfully");
            const firstName = employee.firstName.charAt(0).toUpperCase() + employee.firstName.slice(1);
            const lastName = employee.lastName.charAt(0).toUpperCase() + employee.lastName.slice(1);
            const id = selectedEmployee.id;
            const Employee = {...employee,userType:employee.userType,firstName,lastName,id,notification:employee.notification}
            dispatch(updateEmployeeToServer(Employee));
            handleClose();
            setEmployee({
                firstName:"",
                lastName:"",
                dob:"",
                phone:"",
                designation:"",
                deptName:"",
                employeeMailId:"",
                password:"",
                manager:"",
            })
        }
    }
  return (
    <>
        <MDBDataTable
          responsive
          bordered
          centered
          hover
          data={data}
          />
          {/* edit modal */}
          <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className='heading-bg-color'>
                <Modal.Title as={() => {
                        return <p style={{ marginBottom: "0px" }}>Edit Employee</p>;
                    }} className='form-font'></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onSubmitValidation}>
                        <FormInput type="text" label="First Name" name="firstName" className="mt-0" id="firstname" important='true' value={employee.firstName} onChange={onChangeFname}/>
                        {error.fname && <small>{error.fname}</small> }
                        <FormInput type="text" label="Last Name" name="lastName" id="lastname" important='true' value={employee.lastName} onChange={onChangeLname}/>
                        {error.lname && <small>{error.lname}</small> }
                        <FormInput type="date" label="Date of birth" name="dob" id="dob" important='true' value={employee.dob} onChange={onChangeDob}/>
                        {error.dob && <small>{error.dob}</small> }
                        <FormInput type="tel" label="Phone" name="phone" id="phone" important='true' value={employee.phone} onChange={onChangePhone}/>
                        {error.phone && <small>{error.phone}</small> }
                        <div className='mb-3 mt-2'>
                            <label htmlFor="designation">Designation <sup className='text-danger fw-bolder fs-6'>*</sup></label>
                            <SelectComponent options={roles} name="designation" value={employee.designation} setDefault={employee.designation} onChange={onChangeDesignation}/>
                            {error.designation && <small>{error.designation}</small> }
                        </div>
                        <FormInput type="text" label="Department Name" name="deptName" id="dept" value={employee.deptName} important='true' onChange={onChangeDepartmentName}/>
                        {error.deptname && <small>{error.deptname}</small> }
                        <FormInput type="text" label="Company Mail ID" name="employeeMailId" id="mail" value={employee.employeeMailId} important='true' onChange={onChangeMail}/>
                        {error.mail && <small>{error.mail}</small> }
                        <FormInput type="password"  label="New Password" name="password" id="pwd" value={employee.password} important='true' onChange={onChangePassword}/>
                        {error.password && <small>{error.password}</small> }
                        <div className='mb-3 mt-2'>
                            <label htmlFor="dep-head">Department Head<sup className='text-danger fw-bolder fs-6'>*</sup></label>
                            <SelectComponent options={head} name="manager" id="manager" setDefault={employee.manager} value={employee.manager} onChange={onChangeDeptHead}/>
                            {error.depthead && <small>{error.depthead}</small> }
                        </div>
                        <div className='d-flex justify-content-end column-gap-3'>
                            <ButtonComponent type="reset">reset</ButtonComponent>
                            <ButtonComponent type="submit" onClick={onSubmitValidation}>Submit</ButtonComponent>
                        </div>
                    </Form>
                </Modal.Body>
          </Modal>

          {/* delete modal */}
          <Modal show={deleteShow} onHide={handleDeleteClose}>
                <Modal.Header closeButton className='heading-bg-color'>
                <Modal.Title as={() => {
                        return <p style={{ marginBottom: "0px" }}>Edit LeaveType</p>;
                    }} className='form-font'></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4 className='d-flex justify-content-center text-secondary'>Are you sure to delete the LeaveType</h4>
                </Modal.Body>
                <Modal.Footer>
                    <div className='d-flex justify-content-end column-gap-3'>
                        <ButtonComponent type="reset" onClick={handleDeleteClose}>Cancel</ButtonComponent>
                        <ButtonComponent type="submit" color="red" onClick={deleteEmployee}>Delete</ButtonComponent>
                    </div>
                </Modal.Footer>
            </Modal>
    </>
  );
}

export default AddNewEmployeeTable