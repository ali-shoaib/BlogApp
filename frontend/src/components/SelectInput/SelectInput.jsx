import React from 'react'
import styles from "./SelectInput.module.css";

function SelectInput({options, value, onChange}) {
  return (
    <div className={styles.wrapper}>
        <select value={value} onChange={onChange}>
        <option style={{display:'none'}}>Select Gender</option>  
        {options.map((option) => (
            <option key={option} value={option}>{option}</option>
        ))}

        </select>
    </div>
  )
}

export default SelectInput