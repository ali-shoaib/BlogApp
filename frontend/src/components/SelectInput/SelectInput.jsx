import React from 'react'
import styles from "./SelectInput.module.css";

function SelectInput(props) {
  return (
    <div className={styles.selectWrapper}>
        <select {...props}>
        <option style={{display:'none'}}>Select Gender</option>  
        {props.options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}

        </select>
    </div>
  )
}

export default SelectInput