import React from 'react';
import {NavLink} from 'react-router-dom';
import style from './Navbar.module.css';

function Navbar() {
    const isAuthenticated = false;
  return (
    <>
    <nav className={style.navbar}>
        <NavLink className={`${style.logo} ${style.inActiveStyle}`}>CoinBounce</NavLink>
        <NavLink to='/' className={({isActive}) => isActive ? style.activeStyle : style.inActiveStyle}>Home</NavLink>
        <NavLink to='crypto' className={({isActive}) => isActive ? style.activeStyle : style.inActiveStyle}>Cryptocurrencies</NavLink>
        <NavLink to='blogs' className={({isActive}) => isActive ? style.activeStyle : style.inActiveStyle}>Blogs</NavLink>
        <NavLink to='create' className={({isActive}) => isActive ? style.activeStyle : style.inActiveStyle}>Create a Blog</NavLink>
        {isAuthenticated ? 
        <NavLink to='signout' className={({isActive}) => isActive ? style.activeStyle : style.inActiveStyle}><button className={style.signOutButton}>SignOut</button></NavLink>
        :
        <>
            <NavLink to='login' className={({isActive}) => isActive ? style.activeStyle : style.inActiveStyle}><button className={style.logInButton}>LogIn</button></NavLink>
            <NavLink to='signup' className={({isActive}) => isActive ? style.activeStyle : style.inActiveStyle}><button className={style.signUpButton}>SignUp</button></NavLink>
        </>
        }
    </nav>
    <div className={style.separator}></div>
    </>
  )
}

export default Navbar