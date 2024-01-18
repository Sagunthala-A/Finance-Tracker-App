import React from 'react';
import './Button.css'

const Button = ({text,isBlue,onClick,disable}) => {
  return (
      <div 
        className={isBlue?"signup__btn blue":"signup__btn"} 
        onClick={onClick}
        disabled={disable}
        >
            {text}
      </div>
  )
}

export default Button;
