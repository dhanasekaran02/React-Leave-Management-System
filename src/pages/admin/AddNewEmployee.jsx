import React,{useState} from 'react'
import SectionHeading from '../../components/SectionHeading'
import ButtonComponent from '../../components/ButtonComponent'
import AddNewEmployeeTable from '../../layouts/admin-layouts/AddNewEmployeeTable'
import ButtonModal from '../../components/ButtonModal';
import FormInput from '../../components/FormInput';
import SelectComponent from '../../components/SelectComponent';
import { roles,head } from '../../components/utilities/selectOption';
import Form from 'react-bootstrap/Form';
import { firstName,lastName,dateOfBirth,phoneNumber,Designation,departmentName,companyMail,passwordEmployee,departmentHead } from '../../javascript/addEmployeeValidation';
import { useDispatch } from 'react-redux';
import { addEmployeeToServer } from '../../slicers/EmployeeSlicer';

function AddNewEmployee() {
    const btn = <ButtonComponent>+&nbsp;&nbsp;Add Employee</ButtonComponent>
    const [employee,setEmployee] = useState({
        firstName:"",
        lastName:"",
        dob:"",
        phone:"",
        designation:"",
        deptName:"",
        employeeMailId:"",
        password:"",
        manager:"",
    });

    const [error,setError] = useState({});
    const dispatch = useDispatch();

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

    //last name change
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

    //dob 
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
    //phone number
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

    //designation
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

    //deptname
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

    //company mail
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

    //password
    function onChangePassword(e){
        const {name,value} = e.target;
        setEmployee(prevValue=>({
            ...prevValue,
            [name]:value
        }))
        const error = {};
        const state = passwordEmployee(value);
        if(state[0]){
            error.password = null;
            setError({...error,...error});
            return true; 
        }
        else{
            error.password=state[1];
            setError({...error,...error});
            return false;
        }
    }

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
            let userType,notification="admin";
            if(employee.designation === "developer")
            {
                userType = ["employee"]
            }
            else
            {
                userType = ["employee",employee.designation];
            }
            if(employee.designation === "admin") notification = "hr"
            const firstName = employee.firstName.charAt(0).toUpperCase() + employee.firstName.slice(1);
            const lastName = employee.lastName.charAt(0).toUpperCase() + employee.lastName.slice(1);
            const Employee = {...employee,userType:userType,firstName,lastName,notification,state:"Tamilnade"}
            dispatch(addEmployeeToServer({...Employee}));
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

    function reset(){
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

  return (
    <div className="add_employee_container">
            {/* <!-- heading --> */}
            <SectionHeading title="Add New Employee"/>
            <div className="employee_table">
                {/* <!-- container --> */}
                <div className="emp_table mb-3">
                    {/* <!-- searchbar and button --> */}
                    <div className="search_button container d-flex justify-content-end align-items-center ms-5 mb-2">
                        <div className="add_emp_btn mb-2 me-5">
                            <ButtonModal button={btn} title="Add New Employee" color="black" className="mt-0" footer={false}>
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
                                        <SelectComponent options={head} name="manager" id="manager" value={employee.manager} onChange={onChangeDeptHead}/>
                                        {error.depthead && <small>{error.depthead}</small> }
                                    </div>
                                    <div className='d-flex justify-content-end column-gap-3'>
                                        <ButtonComponent type="reset" onClick={reset}>reset</ButtonComponent>
                                        <ButtonComponent type="submit" onClick={onSubmitValidation}>Submit</ButtonComponent>
                                    </div>
                                </Form>
                            </ButtonModal>
                        </div>
                    </div>
                    {/* <!-- table --> */}
                    <div className="container table-container table-responsive">
                        <AddNewEmployeeTable/>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default AddNewEmployee