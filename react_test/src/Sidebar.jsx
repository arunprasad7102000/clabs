import React, { useState } from "react";
import { FaCircle } from "react-icons/fa";
import "./Sidebar.css";
import Footer from "./Footer";
import Dropdown from "./Dropdown";

const Sidebar = () => {
  const [segmentName, setSegmentName] = useState("");
  const [dropdowns, setDropdowns] = useState([
    {
      id: 1,
      selectedOption: "",
      isNewSegment: true,
    },
  ]);

  const handleButtonClick = (buttonTitle) => {
    if (buttonTitle === "Cancel") {
      document.getElementById("sidebar").style.display = "none";
    } else if (buttonTitle === "Save the Segment") {
      sendDataToServer();

      setSegmentName("");
      setDropdowns([
        {
          id: 1,
          selectedOption: "",
          isNewSegment: true,
        },
      ]);
    }
  };

  const handleSegmentNameChange = (e) => {
    setSegmentName(e.target.value);
  };

  const sendDataToServer = () => {
    const dataToSend = {
      segment_name: segmentName,
      schema: dropdowns
        .filter((dropdown) => dropdown.selectedOption)
        .map((dropdown) => ({
          [dropdown.selectedOption]: dropdown.selectedOption,
        })),
    };

    fetch("https://webhook.site/87c86c18-c999-4682-b606-32c5c9e8d3c9", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((data) => console.log("Data sent to server:", data))
      .catch((error) => console.error("Error sending data to server:", error));
  };

  return (
    <div id="sidebar">
      <div className="sidebar-header">
        <span>&lt;</span>
        <p>Saving Segment</p>
      </div>
      <div id="sidebar-container" className="sidebar-content">
        <div className="segment-name-input">
          <label htmlFor="segmentName" className="segment-description">
            Enter the name of the segment
          </label>
          <input
            type="text"
            id="segmentName"
            placeholder="Name of the segment"
            value={segmentName}
            onChange={handleSegmentNameChange}
          />
          <div className="segment-description">
            <p>
              To save your segment, you need to add the schemas to build the
              query
            </p>
          </div>
          <div className="schema-add-info">
            <p className="schema-info">
              <FaCircle style={{ color: "green" }} /> - User Traits
            </p>
            <p className="schema-info">
              <FaCircle style={{ color: "red" }} /> - Group Traits
            </p>
          </div>
        </div>
      </div>
      <div id="dropdown">
        <Dropdown
          segmentName={segmentName}
          setSegmentName={setSegmentName}
          dropdowns={dropdowns}
          setDropdowns={setDropdowns}
        />
      </div>
      <div id="footer" style={footerStyle}>
        <Footer handleButtonClick={handleButtonClick} />
      </div>
    </div>
  );
};

export default Sidebar;
