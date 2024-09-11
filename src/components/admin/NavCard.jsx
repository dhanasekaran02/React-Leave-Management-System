import React from 'react'
import { Link } from 'react-router-dom'

function NavCard({path,title,children}) {
  return (
    <Link to={path} className='text-decoration-none text-black'>
        <div className="nav-content nav2 me-1 mb-lg-0 mb-2">
            {children}
            <p>{title}</p>
        </div>
    </Link>
  )
}

export default NavCard