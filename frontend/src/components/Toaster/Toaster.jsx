import React, { useEffect, useState } from 'react'
import styles from "./Toaster.module.css";

function Toaster({message}) {
    const [show,SetShow]=useState(true);

    useEffect(()=>{
        setTimeout(() => {
            SetShow(false)}
        ,2000);
    },[]);
  return (
    <div>
        {show && <div id="snackbar" className={styles.snackbar}>{message}</div>}
    </div>
  )
}

export default Toaster