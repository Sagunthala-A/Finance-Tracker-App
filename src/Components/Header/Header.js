import React from 'react';
import './Header.css'

const Header = () => {
  return (
    <nav className='navbar'>
        <p className='navbar__logo'>Financely</p>
        <p className='navbar__logout'>Logout</p>
    </nav>
  )
}

export default Header