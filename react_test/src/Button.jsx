import React from 'react';
import './Button.css';

const Button = ({ title, onClick }) => {
  let buttonClass = 'button';

  if (title === 'Save the Segment') {
    buttonClass += ' button-save';
  } else if (title === 'Cancel') {
    buttonClass += ' button-cancel';
  }

  return (
    <button className={buttonClass} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
