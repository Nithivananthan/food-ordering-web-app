import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faShoppingBag, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
function Navbar({ setnav, nav ,token}) {
  return (
    <div className='navbar'>
      <h1 className='title'>FoodRush</h1>
      <ul className='list'>
        <Link to='/' className='nav-home'>
          <li className="list-item"><FontAwesomeIcon icon={faHome} /> Home</li>
        </Link>
        <Link to="/#menu" className='nav-menu'>
          <li className='list-item'>Menu</li>
        </Link>
        <Link to="/mobileapp" className='nav-mobile'>
          <li className='list-item'>Mobile-app</li>
        </Link>
        <li className='list-item'>Contact us</li>
      </ul>
      <div className="button">
        <Link to='/cart'>
        <button className='cartbag'><FontAwesomeIcon icon={faShoppingBag} /></button>
        </Link>
       <Link to="/myorder"><button className='orders'>Your orders</button></Link>

        {token? (
            <Link to='/profile'><button className='sign-in'>Profile</button></Link>
        ) : (
          <Link to='/login'><button className='sign-in'>Sign-in</button></Link>
        )}
      </div>
      <div className='responsive'>
        <button onClick={() => setnav(true)} className='menubar'><FontAwesomeIcon icon={faBars} /></button>
      </div>

      <div className="side-nav" style={{ display: nav ? "block" : "none" }}>
        <button className="side-nav-cancel" onClick={() => setnav(false)}>X</button>
        <ul className="side-nav-all">
          <Link to="/" className='nav-home'><li className="side-nav-items">Home</li></Link>
          <Link to="/#menu" className='nav-menu'><li className="side-nav-items">Menu</li></Link>
          <Link to="/mobileapp" className='nav-mobile'><li className="side-nav-items">Mobile-app</li></Link>
          <li className="side-nav-items">Contact us</li>
          <Link to="/cart" className='nav-cart'><li className="side-nav-items">Cart</li></Link>
        <li className="side-nav-items">
         <Link to="/myorder" className='orderlist'>Your Orders</Link>
         </li>
          {token ? (
              <Link to="/profile" className='profilelist'><li className="side-nav-items">Profile</li></Link>
          ) : (
            <Link to="/login" className='loginlist'><li className="side-nav-items">Sign-in</li></Link>
          )}
        </ul>
      </div>
    </div>
  );
}
export default Navbar;
