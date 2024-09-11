import React from 'react'

function Hamburger({asideshow,asideclose}) {
  const hamburg = {
    width:"30px",
    height:"30px",
    color:"white"
  };
  return (
    <>
        <div id="menu" className="d-flex justify-content-center mt-2 cursor-pointer" onClick={asideshow}>
            <ion-icon name="menu-outline" style={hamburg}></ion-icon>
        </div>
        <div className="close d-flex justify-content-end text-white" id="close" onClick={asideclose}>
            <ion-icon name="close-outline" className="btn-close" style={hamburg}></ion-icon>
        </div>
    </>
  )
}

export default Hamburger