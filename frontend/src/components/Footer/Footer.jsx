import React from 'react';
import style from './Footer.module.css';

function Footer() {
  return (
    <div className={style.footer}>&copy; CoinBounce {new Date().getFullYear()}</div>
  )
}

export default Footer