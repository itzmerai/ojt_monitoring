import React, { useState } from "react";
import "./cd-attendance.scss";
import SearchBar from "../../../../shared/components/searchbar/searchbar"; // Adjust the path as needed
import DataTable from "../../../../shared/components/table/data-table";
import { faEdit } from "@fortawesome/free-solid-svg-icons"; // Import only the edit icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Attendance: React.FC = () => {
  const [attendanceData, setAttendanceData] = useState([
    {
      id: 1,
      date: "186744",
      name: "Richel H. Cubelo",
      company: "Tech Corp",
      morning: {
        inTime: "09:00 AM",
        outTime: "01:00 PM",
      },
      afternoon: {
        inTime: "02:00 PM",
        outTime: "06:00 PM",
      },
      duration: "8 hours",
      remarks: "Present",
      location: "Calape, Bohol",
    },
    {
      id: 2,
      date: "2024-09-01",
      name: "Jane Smith",
      company: "Innovate Solutions",
      morning: {
        inTime: "09:00 AM",
        outTime: "01:00 PM",
      },
      afternoon: {
        inTime: "02:00 PM",
        outTime: "05:30 PM",
      },
      duration: "7.5 hours",
      remarks: "Late",
      location: "Town Center, Town",
    },
  ]);

  const handleEdit = (id: number) => {
    console.log("Edit attendance record with ID:", id);
  };

  // Table columns with Location next to Name
  const columns = [
    { header: "#", key: "id" },
    { header: "Date", key: "date" },
    {
      header: "Name",
      key: "studentName",
      render: (row: any) => (
        <div className="student-name">
          <p>{row.name || "N/A"}</p>
        </div>
      ),
    },
    {
      header: "Location",
      key: "location",
      render: (row: any) => (
        <div className="student-location">
          <p>{row.location || "N/A"}</p>
        </div>
      ),
    },
    {
      header: "Morning", // Updated Header
      key: "morning",
      render: (row: any) => (
        <div className="student-time">
          <p>
            <strong>In:</strong> {row.morning.inTime || "N/A"}
          </p>
          <p>
            <strong>Out:</strong> {row.morning.outTime || "N/A"}
          </p>
        </div>
      ),
    },
    {
      header: "Afternoon", // New Header
      key: "afternoon",
      render: (row: any) => (
        <div className="student-time">
          <p>
            <strong>In:</strong> {row.afternoon.inTime || "N/A"}
          </p>
          <p>
            <strong>Out:</strong> {row.afternoon.outTime || "N/A"}
          </p>
        </div>
      ),
    },
    { header: "Company", key: "company" },
    { header: "Duration", key: "duration" },
    { header: "Remarks", key: "remarks" },
  ];

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Attendance</h1>
      <h2 className="page-subtitle">Check Student Attendance</h2>

      {/* SearchBar */}
      <div className="controls-container">
        <div className="search-bar-container">
          <SearchBar
            placeholder="Search"
            onSearch={(query) => console.log(query)}
          />
        </div>
      </div>

      {/* Render the DataTable */}
      <DataTable columns={columns} data={attendanceData} />
    </div>
  );
};

export default Attendance;
