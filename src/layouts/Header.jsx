import React from 'react'
import SearchBar from '../components/SearchBar'
import UserProfile from '../components/UserProfile'
import Aside from './Aside'
import { useState } from 'react'
import AsideManager from './manager-layouts/AsideManager'
import AsideHr from './hr-layouts/AsideHr'
import AsideAdmin from './admin-layouts/AsideAdmin'
function Header({name,designation,loggedAs}) {
  const [aside,setAside] = useState(false);
  const asideClose = () => setAside(false);
  const asideShow = () => setAside(true);
  designation = designation.trim();
  let side;
  switch(loggedAs){
    case "employee":{
      side = <Aside aside={aside} asideClose={asideClose} asideShow={asideShow}/>
      break;
    }
    case "manager":{
      side = <AsideManager aside={aside} asideClose={asideClose} asideShow={asideShow}/>
      break;
    }
    case "hr":{
      side=<AsideHr aside={aside} asideClose={asideClose} asideShow={asideShow}/>
      break;
    }
    case "admin":{
      side=<AsideAdmin  aside={aside} asideClose={asideClose} asideShow={asideShow}/>
      break;
    }
  }
  return (
    <div className='fixed_header w-100'>
        <header className=" d-flex position-fixed top-0 w-100 z-1">
          <SearchBar asideShow={asideShow}/>
          <UserProfile name={name} designation={designation}/>
        </header>
        {side}
    </div>
  )
}

export default Header