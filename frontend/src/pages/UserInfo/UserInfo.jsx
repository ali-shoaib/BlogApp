import React from 'react'
import {useSelector} from 'react-redux';
import style from './UserInfo.module.css';
import { NavLink } from 'react-router-dom';
import { showDate } from '../../reusable/showDate';

function UserInfo() {
    const userinfo = useSelector((state) => state.user);
  return (
    <div className={style.userinfowrapper}>
        <h2 className={style.name}>{userinfo.name}</h2>
        <span className={style.username}>@{userinfo.username}</span>
        <div className={style.infocontainer}>
            <span>Gender: <b>{userinfo.gender}</b></span>
            <span>Email: <b>{userinfo.email}</b></span>
            <span>Joined on: <b>{showDate(userinfo.createdAt)}</b></span>
        </div>
        <NavLink to="/reset-password"><button className={style.changepassword}>Change Password</button></NavLink>
    </div>
  )
}

export default UserInfo