import React from 'react';
import Button from './Button';

const Footer = ({ handleButtonClick }) => {
  return (
    <div className="footer">
      <Button title="Save the Segment" onClick={() => handleButtonClick("Save the Segment")} />
      <Button title="Cancel" onClick={() => handleButtonClick("Cancel")} />
    </div>
  );
};

export default Footer;