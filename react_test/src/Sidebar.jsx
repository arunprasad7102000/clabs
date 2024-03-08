import React, { useState } from "react";
import { FaCircle } from "react-icons/fa";
import Footer from "./Footer";
import Dropdown from "./Dropdown";

const Sidebar = () => {
  const [segmentName, setSegmentName] = useState("");

  const footerStyle = {
    marginTop: "auto",
    display: "flex",
    justifyContent: "left",
    backgroundColor: "#F6F6F6",
    padding: "10px",
  };

  const handleButtonClick = (buttonTitle) => {
    if (buttonTitle === "Cancel") {
      document.getElementById("sidebar").style.display = "none";
    } else if (buttonTitle === "Save the Segment") {
      console.log("Segment Name:", segmentName);
      setSegmentName("");
    }
  };

  const handleSegmentNameChange = (e) => {
    setSegmentName(e.target.value);
  };

  const handleSaveData = (data) => {
    console.log("Data to be saved:", data);
    fetch("your-server-endpoint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => console.log("Data saved:", responseData))
      .catch((error) => console.error("Error saving data:", error));
  };

  return (
    <div
      id="sidebar"
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        display: "flex",
        height: "100%",
        flexDirection: "column",
        width: "356px",
        color: "white",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
        <span style={{ marginRight: "10px" }}>&lt;</span>
        <p>Saving Segment</p>
      </div>
      <div id="sidebar-container" style={{ padding: "15px" }}>
        <div style={{ marginTop: "10px", color: "black", textAlign: "left" }}>
          <label
            htmlFor="segmentName"
            style={{
              marginBottom: "5px",
              fontFamily: "Lato, sans-serif",
              textAlign: "left",
              fontSize: "14px",
            }}
          >
            Enter the name of the segment
          </label>
          <input
            type="text"
            id="segmentName"
            placeholder="Name of the segment"
            value={segmentName}
            onChange={handleSegmentNameChange}
            style={{
              width: "100%",
              padding: "8px",
              boxSizing: "border-box",
              backgroundColor: "white",
              color: "black",
              fontSize: "12px",
              border: "1px solid grey",
              borderRadius: "4px",
              marginTop: "15px",
            }}
          />
          <div
            htmlFor="segmentName"
            style={{
              marginBottom: "5px",
              fontFamily: "Lato, sans-serif",
              textAlign: "left",
            }}
          >
            <p style={{ fontSize: "14px" }}>
              To save your segment, you need to add the schemas to build the
              query
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              marginRight: "16px",
            }}
          >
            <p
              style={{
                fontFamily: "Lato, sans-serif",
                fontSize: "12px",
                marginRight: "20px",
              }}
            >
              <FaCircle
                style={{
                  color: "green",
                  fontFamily: "Lato, sans-serif",
                  fontSize: "10px",
                  marginRight: "4px",
                }}
              />
              - User Traits
            </p>
            <p
              style={{
                fontFamily: "Lato, sans-serif",
                fontSize: "12px",
              }}
            >
              <FaCircle
                style={{
                  color: "red",
                  fontFamily: "Lato, sans-serif",
                  fontSize: "10px",
                  marginRight: "4px",
                }}
              />
              - Group Traits
            </p>
          </div>
        </div>
      </div>
      <div id="dropdown">
        <Dropdown segmentName={segmentName} handleSaveData={handleSaveData} />
      </div>
      <div id="footer" style={footerStyle}>
        <Footer handleButtonClick={handleButtonClick} />
      </div>
    </div>
  );
};

export default Sidebar;
