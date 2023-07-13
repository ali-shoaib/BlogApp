import React, { useState } from 'react'
import styles from './TextInput.module.css';
import view from '../../assets/images/view.png';
import closeeye from '../../assets/images/closeeye.png';

function TextInput(props) {
  const [vieww,setVieww] = useState(false);
  return (
    <>
      {props.name==='searchbloginput' ?
        <div className={styles.searchBlogInput}>
          <input {...props} />
        </div>
      :
      <div className={styles.textInputWrapper}>
          {(props.name === "password" || props.name === 'confirmPassword' || props.name === 'currentPassword' || props.name === 'newPassword') ? <input {...props} type={vieww ? 'text' : 'password'}/> : <input {...props}/>}
          {props.error && <p className={styles.errorMessage}>{props.errormessage}</p>}
          {
          (props.name === "password" || props.name === 'confirmPassword' || props.name === 'currentPassword' || props.name === 'newPassword') 
          && 
          <button className={styles.showpassbtn} onClick={()=>setVieww(!vieww)}><img src={vieww ? view : closeeye} alt="showpassword"/></button>
          }
      </div>
    }
    </>
  )
}

export default TextInput