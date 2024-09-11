import React from 'react'
import { userContext } from '../../App'
import Header from '../Header';
import Main from '../../components/Main';
import { UseSelector, useSelector } from 'react-redux';

function Layout({children}){
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    const name = loggedUser.firstName.toUpperCase();
    const designation = loggedUser.designation.charAt(0).toUpperCase() + loggedUser.designation.slice(1);
    const loggedas = loggedUser.loggedAs;
    return(
      <>
        <Header name={name} designation={designation} loggedAs={loggedas}/>
        <Main>
          {children}
        </Main>
      </>
    );
  }

export default Layout