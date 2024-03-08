import React, { useState } from "react";
import { FaCircle } from "react-icons/fa";

const Dropdown = ({ segmentName, setSegmentName }) => {
  const [dropdowns, setDropdowns] = useState([
    {
      id: 1,
      selectedOption: "",
      isNewSegment: true,
    },
  ]);

  const buttonStyle = {
    backgroundColor: "#F2FBF9",
    color: "#657A93",
    padding: "0px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "32px",
  };

  const options = [
    { value: "firstName", label: "First Name" },
    { value: "lastName", label: "Last Name" },
    { value: "age", label: "Age" },
    { value: "gender", label: "Gender" },
    { value: "accountName", label: "Account Name" },
    { value: "city", label: "City" },
    { value: "state", label: "State" },
  ];

  const handleDeleteDropdown = (dropdownId) => {
    setDropdowns((prevDropdowns) =>
      prevDropdowns.filter((dropdown) => dropdown.id !== dropdownId)
    );
  };

  const sendDataToServer = () => {
    const dataToSend = {
      segment_name: segmentName,
      schema: dropdowns
        .filter((dropdown) => dropdown.selectedOption)
        .map((dropdown) => ({ [dropdown.selectedOption]: dropdown.selectedOption })),
    };
    fetch("https://webhook.site/87c86c18-c999-4682-b606-32c5c9e8d3c9", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((data) => console.log("Data sent to server:", data))
      .catch((error) => console.error("Error sending data to server:", error));
  };

  const handleAddDropdown = () => {
    const newDropdown = {
      id: Date.now(),
      selectedOption: "",
      isNewSegment: true,
    };
    setDropdowns((prevDropdowns) => [...prevDropdowns, newDropdown]);
  };

  const isAddButtonDisabled = dropdowns.some((dropdown) => !dropdown.selectedOption);

  return (
    <div>
      <div style={{ maxHeight: "250px", overflowY: "auto" }}>
        {dropdowns.map((dropdown) => (
          <div
            key={dropdown.id}
            className="dropdown-container"
            style={{ alignItems: "center", display: "flex", justifyContent: "center" }}
          >
            <FaCircle
              style={{
                color: dropdown.isAccountName ? "red" : dropdown.isNewSegment ? "grey" : "green",
                fontFamily: "Lato, sans-serif",
                fontSize: "10px",
                marginRight: "4px",
              }}
            />
            <div className="facircle-icon"></div>
            <select
              value={dropdown.selectedOption}
              onChange={(e) =>
                setDropdowns((prevDropdowns) =>
                  prevDropdowns.map((d) => {
                    if (d.id === dropdown.id) {
                      const updatedDropdown = { ...d, selectedOption: e.target.value };
                      const isAccountName = e.target.value === "accountName";
                      return { ...updatedDropdown, isAccountName, isNewSegment: false };
                    }
                    return d;
                  })
                )
              }
              style={{
                fontFamily: "Lato, sans-serif",
                fontSize: "14px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                padding: "8px",
                width: "260px",
                margin: "5px",
              }}
            >
              <option value="" disabled>
                Add schema to segment
              </option>
              {options
                .filter(
                  (option) =>
                    !dropdowns.some((d) => d.selectedOption === option.value && d.id !== dropdown.id)
                )
                .map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </select>
            <button onClick={() => handleDeleteDropdown(dropdown.id)} style={buttonStyle}>
              -{" "}
            </button>
          </div>
        ))}
      </div>
      <a
        href="#"
        style={{
          fontFamily: "Lato, sans-serif",
          color: isAddButtonDisabled ? "#ccc" : "#46B697",
          fontSize: "12px",
          display: "flex",
          marginLeft: "36px",
        }}
        onClick={() => (isAddButtonDisabled ? null : (handleAddDropdown(), sendDataToServer()))}
        disabled={isAddButtonDisabled}
      >
        + Add new schema
      </a>
    </div>
  );
};

export default Dropdown;
