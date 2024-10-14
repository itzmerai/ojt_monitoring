import React, { useState } from "react";
import "./user-student.scss";
import SearchBar from "../../../../shared/components/searchbar/searchbar"; // Adjust the path as needed
import Dropdown from "../../../../shared/components/dropdowns/dropdown"; // Adjust the path as needed
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PrimaryButton from "../../../../shared/components/buttons/primero-button";
import DataTable from "../../../../shared/components/table/data-table";

const Student: React.FC = () => {
  const [program, setProgram] = useState<string>("");

  const handleProgramChange = (selectedProgram: string) => {
    setProgram(selectedProgram);
    console.log("Selected Program:", selectedProgram);
  };

  const handleAddButtonClick = () => {
    console.log("Add Student button clicked");
  };

  // Updated columns for the DataTable
  const columns = [
    { header: "Student ID", key: "studentId" },
    { header: "Coordinator", key: "coordinator" },
    { header: "Program", key: "program" },
    { header: "Company", key: "company" },
    { header: "Required Duration", key: "duration" },
  ];

  // Sample data for the DataTable
  const data = [
    {
      studentId: "S12345",
      coordinator: "John Doe",
      program: "BSCS",
      company: "Tech Corp",
      duration: "120 hours",
    },
    {
      studentId: "S67890",
      coordinator: "Jane Smith",
      program: "BSIT",
      company: "Innovate Inc.",
      duration: "100 hours",
    },
    // Add more data as needed
  ];

  return (
    <div className="dashboard-page">
      <h1 className="page-title">User Management</h1>
      <h2 className="page-subtitle">Student Records</h2>

      {/* Add the SearchBar, Dropdown, and PrimaryButton side by side */}
      <div className="controls-container">
        <div className="search-bar-container">
          <SearchBar
            placeholder="Search"
            onSearch={(query) => console.log("Search query:", query)}
          />
        </div>
      </div>

      {/* Render the DataTable below the controls */}
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Student;
