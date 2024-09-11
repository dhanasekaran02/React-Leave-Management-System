import React, { useState } from 'react'
import Hamburger from '../components/Hamburger'
import companyLogo from '../assets/images/company-logo.png';
import AsideNavigation from '../components/employee-componets/AsideNavigation';


function Aside({aside, asideShow, asideClose}) {
  
  return (
    <aside className={aside?"aside-click":null}>
        {/* Hamburger menus */}
        <Hamburger asideshow={asideShow} asideclose={asideClose}/>

        {/* company logo */}
        <div className="company_logo mt-3">
            <img src={companyLogo} alt="company_logo" width="40" height="40"/>
        </div>

        {/* page navigation */}
        <AsideNavigation/>
    </aside>
  )
}

export default Aside