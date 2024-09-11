import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import CompanyLogo from '../../assets/images/company-logo.png';

function LoginHeader(){
  return (
    <header  className='login-nav shadow-none'>
        <Container fluid>
            <Navbar expand="lg" className='align-items-center justify-content-md-start'>
                <img src={CompanyLogo} alt="Profile"  width="175" height="55" className='ms-4' />
            </Navbar>
        </Container>
    </header>
  );
}

export default LoginHeader