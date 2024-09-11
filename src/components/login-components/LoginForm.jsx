import React, { useEffect } from "react";
import avatar from "../../assets/images/avatar.png";
import FormInput from "../FormInput";
import Form from 'react-bootstrap/Form';
import UserType from "./UserType";
import ButtonComponent from "../ButtonComponent";
import Col from "react-bootstrap/esm/Col";
import ButtonModal from "../ButtonModal";
import SampleCredentials from "./SampleCredentials";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getEmployeesFromServer} from '../../slicers/EmployeeSlicer'

// User mail validation
function userIdValidation(userID){
  if(userID.trim() === ""){
      return false
  }
  else if(!((/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/).test(userID))){
      return false
  }
  else{
      return true;
  }
}

//password validation
function Password(pwd){
  // let pattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
  if(pwd.trim() === ""){
      return false;
  }
  else if(!((/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/).test(pwd))){
      return false;
  }
  else{
      return true;
    }
  }; 
  
  function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {employeeList,error} = useSelector((state)=>state.employee);
    useEffect(()=>{
      dispatch(getEmployeesFromServer())
    },[dispatch])

    const [values,setValues] = useState({
        userId:"",
        password:"",
        usertype:""
    })
    const [errors,setError] = useState({});

    // update the state value whenever the value in the input field changes
    function handleChange(e){
        const {name,value} = e.target
        setValues({...values,[name]:value});
    }

    //function to handle the changes while submitting the form
    function handleSubmit(e){
        e.preventDefault();

        //check validation
        const errorList = {};
        if(!userIdValidation(values.userId))
        {
            errorList.email = "Enter the email";
        }
        if(!Password(values.password))
        {
            errorList.password = "Enter the Password";
        }
        if(values.usertype.trim() ==='')
        {
            errorList.usertype = "Select a user";
        }

        if(Object.keys(errorList).length >0)
        {   //setting errors
            setError({...errorList});
        }
        else{
            // getting user from the list of users and saving it in the logged in state
            //and navigating to the respective page
            const user = employeeList.find((employee)=> (employee.employeeMailId === values.userId && employee.password === values.password && values.usertype === (employee.userType.find(type => type === values.usertype))))
            if(user){
                const userdate = {...user,loggedAs:values.usertype};
                localStorage.setItem("loggedUser",JSON.stringify(userdate));
                navigate(`/${values.usertype}/`);
            }
            else{
              const errorList = {};
              const email = employeeList.find((employee) => (employee.employeeMailId === values.userId));
              const password = employeeList.find((employee) => (employee.password === values.password));
              const types = employeeList.find((employee) => (employee.employeeMailId === values.userId && employee.password === values.password && values.usertype === (employee.userType.find(type => {
                if(type === values.usertype) return true;
                else return false;
              }))));
              if(!email){
                errorList.email = "Invalid email";
              }
              if(!password){
                errorList.password = "Invalid password";
              }
              if(!types){
                errorList.usertype = "Invalid usertype";
              }
              setError({...errorList});
            }
        }
    }

  return (
    <main className="d-flex justify-content-center mt-5">
      <div className="login-form h-auto">
        {/* Avatar */}
        <div class="avatar d-flex justify-content-center">
          <img src={avatar} alt="Login avatar" width="50" height="50" />
        </div>

        {/* Sign in Text */}
        <p id="signin-heading" class="ms-4 fs-4 form-font">
          <b>Sign In</b>
        </p>

        {/* Input login form */}
        <div class="input-form offset-1 mt-2 col-12 h-75">
          <Col xs={12}>
            <Form  onSubmit={handleSubmit}>
                {/* Email id input form */}
                <Col xs={10}>
                    <FormInput type="text" name="userId" label="User ID" id="formControlMail" placeholder="Enter User ID" onChange={handleChange} />
                    {errors.email && <small>{errors.email}</small>}
                </Col>
                {/* Password input form */}
                <Col xs={10}>
                    <FormInput type="password" name="password" label="Password" className="mt-1" id="formControlPwd" placeholder="Enter Password" onChange={handleChange} />
                    {errors.password && <small>{errors.password}</small>}
                </Col>

                {/* User type select */}
                <Col xs={10}>
                    <UserType name="usertype" onChange={handleChange}/>
                    {errors.usertype && <small>{errors.usertype}</small>}
                </Col>

                {/* Remember me */}
                <Col xs={10}>
                    <Form.Group className="mb-3 mt-2 w-75" controlId="remember me">
                    <Form.Check
                    type="checkbox"
                    id="default-checkbox"
                    label="Remember me"
                    className="border-secondary"
                    />
                    </Form.Group>
                </Col>
                <Col xs={10}>
                  <ButtonModal 
                    button={<ButtonComponent type="submit" color="#725103" class_name="col-12" >Login</ButtonComponent>}
                    title="Invalid Credentials" bgcolor="#eece8b" color="black" footer={false} >
                      <h5>Use our Sample Credentials</h5>
                      {/* employee credentials */}
                      <SampleCredentials user="Employee" userid="employee@leavaease.com" password="Pwd@employee1" />
                      {/* manager credentials */}
                      <SampleCredentials user="Manager" userid="manager@leavaease.com" password="Pwd@manager1" />
                      {/* hr credentials */}
                      <SampleCredentials user="HR" userid="hr@leavaease.com" password="Pwd@hr12" />
                      {/* admin credentials */}
                      <SampleCredentials user="Administrator" userid="admin@leavaease.com" password="Pwd@admin1" />
                  </ButtonModal>
                </Col>
            </Form>
          </Col>
        </div>
      </div>
    </main>
  );
}

export default LoginForm;
