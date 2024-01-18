import React from 'react';
import './Input.css'

const Input = ({label,placeholder,type,state,setState}) => {

    // console.log("user...",user)
  return (
    <div className='input__wrapper'>
        <label htmlFor={label}>{label}</label>
        <input
            id={label}
            type={type}
            placeholder={placeholder}
            value={state}
            onChange={(e)=>{setState(e.target.value)}}
        />
    </div>
  )
}

export default Input