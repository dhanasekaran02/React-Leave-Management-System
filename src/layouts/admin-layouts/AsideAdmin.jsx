import React from 'react'
import Hamburger from '../../components/Hamburger'
import companyLogo from '../../assets/images/company-logo.png';
import AdminAsideNavigation from '../../components/admin/AdminAsideNavigation';


function AsideAdmin({aside, asideShow,asideClose}) {
  return (
    <aside className={aside?"aside-click":null}>
        {/* Hamburger menus */}
        <Hamburger asideshow={asideShow} asideclose={asideClose}/>

        {/* company logo */}
        <div className="company_logo mt-3">
            <img src={companyLogo} alt="company_logo" width="40" height="40"/>
        </div>

        {/* page navigation */}
        <AdminAsideNavigation/>
    </aside>
  )
}

export default AsideAdmin