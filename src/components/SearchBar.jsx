import React, {useState} from 'react';
import Col from "react-bootstrap/esm/Col";

function SearchBar({asideShow}) {
  const menu = {
    width:"30px",
    height:"30px",
    zIndex:"20",
    color:"black"
  }

  const search ={
    fontSize:"22px",
    marginTop:"3px"
  }

  return (
    <>
      {/* <!-- Menu bar section --> */}
      <div id="menu-phone" className={`justify-content-center mt-2`} onClick={asideShow}>
            <ion-icon name="menu-outline" style={menu}></ion-icon>
        </div>
        {/* <!-- search bar --> */}
        <Col lg={3} md={5} sm={4} className="searchbar ms-sm-4 me-sm-0 me-md-auto me-xl-auto d-flex align-self-center justify-content-start ms-sm-5 ms-lg-5 ms-xl-5">
            <input type="search" className="search form-control border-secondary w-75 rounded ms-sm-5 ms-lg-5 ms-xl-5 " placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
            <span className=" border-0 search-icon ms-1" style={search}>
                <ion-icon id="search_icon" name="search-outline"></ion-icon>
            </span>
        </Col>
    </>
  )
}

export default SearchBar