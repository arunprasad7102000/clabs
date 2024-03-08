import React, { useState } from 'react';
import './App.css';
import Navbar from './Navabar';
import Button from './Button';
import Sidebar from './Sidebar';

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleButtonClick = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <Navbar />
      <Button title="Save Segment" onClick={() => handleButtonClick("Save Segment")} />
      {showSidebar && <Sidebar />}
    </>
  );
};

export default App;