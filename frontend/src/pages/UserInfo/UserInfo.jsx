import React from 'react'
import {useSelector} from 'react-redux';
import style from './UserInfo.module.css';

function UserInfo() {
    const userinfo = useSelector((state) => state.user);

    function showDate(date){
        return new Date(date).toLocaleDateString('en-US', { weekday: "long", year: 'numeric', month: 'long', day: 'numeric' });
    }
  return (
    <div className={style.userinfowrapper}>
        <h2 className={style.name}>{userinfo.name}</h2>
        <span className={style.username}>@{userinfo.username}</span>
        <div className={style.infocontainer}>
            <span>Email: <b>{userinfo.email}</b></span>
            <span>Joined on: <b>{showDate(userinfo.createdAt)}</b></span>
        </div>
        <button className={style.changepassword}>Change Password</button>
    </div>
  )
}

export default UserInfo