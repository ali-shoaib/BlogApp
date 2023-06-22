import React from 'react';
import {NavLink} from 'react-router-dom';
import style from './Navbar.module.css';
import {useDispatch, useSelector} from 'react-redux';
import { signout } from '../../api/internal';
import { resetUser } from '../../store/userSlice';

function Navbar() {
    const isAuthenticated = useSelector((state) => state.user.auth);
    const dispatch=useDispatch();

    const handleSignOut = async() => {
      await signout();
      dispatch(resetUser());
    }
  return (
    <>
    <nav className={style.navbar}>
        <NavLink className={`${style.logo} ${style.inActiveStyle}`}>CoinBounce</NavLink>
        <NavLink to='/' className={({isActive}) => isActive ? style.activeStyle : style.inActiveStyle}>Home</NavLink>
        <NavLink to='crypto' className={({isActive}) => isActive ? style.activeStyle : style.inActiveStyle}>Cryptocurrencies</NavLink>
        <NavLink to='blogs' className={({isActive}) => isActive ? style.activeStyle : style.inActiveStyle}>Blogs</NavLink>
        <NavLink to='create' className={({isActive}) => isActive ? style.activeStyle : style.inActiveStyle}>Create a Blog</NavLink>
        {isAuthenticated ? 
        <NavLink className={({isActive}) => isActive ? style.activeStyle : style.inActiveStyle}><button className={style.signOutButton} onClick={handleSignOut}>SignOut</button></NavLink>
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