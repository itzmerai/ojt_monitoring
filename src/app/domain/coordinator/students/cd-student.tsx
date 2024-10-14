import React, { useState } from "react";
import "./cd-student.scss";
import SearchBar from "../../../../shared/components/searchbar/searchbar";
import DataTable from "../../../../shared/components/table/data-table";
import {
  faEdit,
  faPlus,
  faEnvelope,
  faIdCard,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PrimaryButton from "../../../../shared/components/buttons/primero-button";
import Modal from "../../../../shared/components/modals/modal";
import NameInputField from "../../../../shared/components/fields/unif";
import Dropdown from "../../../../shared/components/dropdowns/dropdown";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const CoordinatorStudent: React.FC = () => {
  const [studentData, setStudentData] = useState([
    {
      id: 1,
      studentId: "186744",
      studentInfo: {
        name: "Richel Hetutuane Cubelo",
        address: "Bentig, Calape, Bohol",
        contactNo: "123-456-7890",
        sex: "Female",
      },
      status: "Active",
      company: "Marvs Digital",
      program: "BSCS",
      schoolYear: "2023-2024",
    },
    {
      id: 2,
      studentId: "186745",
      studentInfo: {
        name: "Ryan Postanes Amasora",
        address: "Desamparados, Calape, Bohol",
        contactNo: "987-654-3210",
        sex: "Bayot",
      },
      status: "Inactive",
      company: "DataSoft Solutions",
      program: "BSIT",
      schoolYear: "2023-2024",
    },
    {
      id: 3,
      studentId: "186746",
      studentInfo: {
        name: "Rica Cubelo",
        address: "Bentig, Calape, Bohol",
        contactNo: "989-111-0000",
        sex: "Female",
      },
      status: "Inactive",
      company: "DataSoft Solutions",
      program: "BSIT",
      schoolYear: "2023-2024",
    },
    {
      id: 4,
      studentId: "186747",
      studentInfo: {
        name: "Ronie Cubelo",
        address: "Bentig, Calape, Bohol",
        contactNo: "129-111-1910",
        sex: "Male",
      },
      status: "Inactive",
      company: "Skyride",
      program: "BSEd",
      schoolYear: "2024-2025",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [sex, setSex] = useState("");
  const [studentId, setStudentId] = useState("");
  const [program, setProgram] = useState("BSCS");
  const [schoolYear, setSchoolYear] = useState("2023-2024");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("");
  const [currentModal, setCurrentModal] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleEdit = (id: number) => {
    console.log("Edit student record with ID:", id);
  };

  const handleAddButtonClick = () => {
    setShowModal(true);
  };

  const handleModalCancel = () => {
    setShowModal(false);
    setCurrentModal(null);
    resetForm();
  };

  const handleModalRegister = () => {
    setCurrentModal("credentials");
  };

  const handleFinalRegistration = () => {
    console.log("Student registered:", {
      name,
      address,
      contact,
      sex,
      studentId,
      program,
      schoolYear,
      company,
      status,
      email,
      password,
    });
    setShowModal(false);
    setCurrentModal(null);
    resetForm();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    const value = e.target.value;
    switch (field) {
      case "name":
        setName(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "contact":
        setContact(value);
        break;
      case "sex":
        setSex(value);
        break;
      case "studentId":
        setStudentId(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const resetForm = () => {
    setName("");
    setAddress("");
    setContact("");
    setSex("");
    setStudentId("");
    setProgram("");
    setSchoolYear("");
    setCompany("");
    setStatus("");
    setEmail("");
    setPassword("");
  };

  const columns = [
    { header: "#", key: "id" },
    { header: "Student ID", key: "studentId" },
    {
      header: "Student Info",
      key: "studentInfo",
      render: (row: any) => (
        <div className="student-info">
          <p>
            <strong>Name:</strong> {row.studentInfo.name || "N/A"}
          </p>
          <p>
            <strong>Address:</strong> {row.studentInfo.address || "N/A"}
          </p>
          <p>
            <strong>Contact #:</strong> {row.studentInfo.contactNo || "N/A"}
          </p>
          <p>
            <strong>Sex:</strong> {row.studentInfo.sex || "N/A"}
          </p>
        </div>
      ),
    },
    {
      header: "Status",
      key: "status",
    },
    { header: "Company", key: "company" },
    { header: "Program", key: "program" },
    { header: "S.Y.", key: "schoolYear" },
    {
      header: "Action",
      key: "action",
      render: (row: any) => (
        <div className="action-icons">
          <FontAwesomeIcon
            icon={faEdit}
            className="edit-icon"
            onClick={() => handleEdit(row.id)}
          />
        </div>
      ),
    },
  ];

  const handleReturnToRegister = () => {
    // Implement the logic for returning to register
  };

  const handleCredentialsSave = () => {
    // Implement the logic for saving credentials
  };

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Student</h1>
      <h2 className="page-subtitle">Manage Student Attendance</h2>

      <div className="controls-container">
        <div className="search-bar-container">
          <SearchBar
            placeholder="Search"
            onSearch={(query) => console.log(query)}
          />
        </div>
        <div className="add-button-container">
          <PrimaryButton
            buttonText="Add Student"
            handleButtonClick={handleAddButtonClick}
            icon={<FontAwesomeIcon icon={faPlus} />}
          />
        </div>
      </div>

      <DataTable columns={columns} data={studentData} />

      <Modal
        show={showModal && currentModal !== "credentials"}
        title=""
        message=""
        onCancel={handleModalCancel}
        onConfirm={handleModalRegister}
        size="extralarge"
        cancelButtonText="Cancel"
        confirmButtonText="Next"
      >
        <div className="modal-custom-content">
          <div className="modal-custom-header-student">
            <div className="header-left">
              <h2 className="main-header">Register New Student</h2>
              <h3 className="sub-header">Student Details</h3>
            </div>
          </div>
          <div className="modalbody">
            <div className="left">
              {/* Name Field */}
              <label htmlFor="name">Name</label>
              <NameInputField
                type="text"
                id="name"
                value={name}
                onChange={(e) => handleInputChange(e, "name")}
              />

              {/* Address Field */}
              <label htmlFor="address">Address</label>
              <NameInputField
                type="text"
                id="address"
                value={address}
                onChange={(e) => handleInputChange(e, "address")}
              />

              {/* Contact Number Field */}
              <label htmlFor="contact">Contact#</label>
              <NameInputField
                type="text"
                id="contact"
                value={contact}
                onChange={(e) => handleInputChange(e, "contact")}
              />
              <div className="drop">
                {/* Sex Dropdown */}
                <label htmlFor="sex">Sex</label>
                <Dropdown
                  options={["Male", "Female", "Other"]}
                  value={sex}
                  onChange={(value) => setSex(value)}
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="right">
              <div className="left-component">
                <div className="dropdowns">
                  {/* Program Dropdown */}
                  <label htmlFor="program">Program</label>
                  <Dropdown
                    options={["BSCS", "BSIT", "BSIS"]}
                    value={program}
                    onChange={(value) => setProgram(value)}
                  />

                  {/* Company Dropdown */}
                  <label htmlFor="company">Company</label>
                  <Dropdown
                    options={["Company A", "Company B", "Company C"]}
                    value={company}
                    onChange={(value) => setCompany(value)}
                  />

                  {/* School Year Dropdown */}
                  <label htmlFor="schoolYear">S.Y.</label>
                  <Dropdown
                    options={["2023-2024", "2024-2025", "2025-2026"]}
                    value={schoolYear}
                    onChange={(value) => setSchoolYear(value)}
                  />

                  {/* Status Dropdown */}
                  <label htmlFor="status">Status</label>
                  <Dropdown
                    options={["Active", "Inactive"]}
                    value={status}
                    onChange={(value) => setStatus(value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        show={showModal && currentModal === "credentials"}
        title=""
        message=""
        onCancel={() => setCurrentModal(null)}
        onConfirm={handleFinalRegistration}
        size="medium2"
        cancelButtonText="Back"
        confirmButtonText="Register"
      >
        <div className="modal-custom-content">
          <div className="modal-custom-header-admin-coordinator">
            <div className="header-left">
              <h2 className="main-header">Register New Student</h2>
              <h3 className="sub-header">Credentials</h3>
            </div>
          </div>
          <div className="credentials-modal-container">
            <div className="credentials-modal-body">
              <div className="name-input-field">
                <label htmlFor="email">Email</label>
                <div className="name-input-field-wrapper">
                  <NameInputField
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => handleInputChange(e, "email")}
                  />
                  <FontAwesomeIcon icon={faEnvelope} className="icon" />
                </div>
              </div>
              <div className="name-input-field">
                <label htmlFor="schoolId">School Id</label>
                <div className="name-input-field-wrapper">
                  <NameInputField
                    type="text"
                    id="schoolId"
                    value={studentId}
                    onChange={(e) => handleInputChange(e, "studentId")}
                  />
                  <FontAwesomeIcon icon={faIdCard} className="icon" />
                </div>
              </div>
              <div className="name-input-field">
                <label htmlFor="password">Password</label>
                <div className="name-input-field-wrapper">
                  <NameInputField
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => handleInputChange(e, "password")}
                  />
                  <FaLock className="icon" />
                  <div
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CoordinatorStudent;
