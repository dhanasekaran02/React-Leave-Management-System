import React from 'react';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import avatar from "../assets/images/avatar.png";
import ChangePasswordModal from './ChangePasswordModal';
import { NavLink } from 'react-router-dom';

function Profile({name,designation}) {
  const img = {
    marginTop:"8px"
  }
  function clear(){
    localStorage.removeItem("loggedUser");
  }
  return (
    <Col lg={7} md={7} sm={8}  className='profile_bar d-flex align-items-center '>
        <Dropdown className='d-flex'>
            <img src={avatar}  alt="Profile" width="45" height="45" style={img}/>
            <Dropdown.Toggle id="dropdown-toggle" className='name_designation d-flex flex-column ms-3 justify-content-center bg-transparent border-0 text-dark'>
                <p className="mb-0">{name}</p>
                <p className="mb-0">{designation}</p>
            </Dropdown.Toggle> 
            <Dropdown.Menu>
                <ChangePasswordModal button={<Dropdown.Item href="#">Change Password</Dropdown.Item>}/>
                <Dropdown.Item as={NavLink} to='/' onClick={clear}>Logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    </Col>
  )
}

export default Profile