import React, { useState } from "react";
import "./user-coordinator.scss";
import {
  faEdit,
  faEnvelope,
  faIdCard,
} from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../../../../shared/components/searchbar/searchbar"; // Adjust the path as needed
import Dropdown from "../../../../shared/components/dropdowns/dropdown"; // Adjust the path as needed
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PrimaryButton from "../../../../shared/components/buttons/primero-button";
import DataTable from "../../../../shared/components/table/data-table";
import Modal from "../../../../shared/components/modals/modal";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import NameInputField from "../../../../shared/components/fields/unif";
import { FaEdit } from "react-icons/fa"; // Add this import
import PhotoUploadButton from "../../../../shared/components/photo-upload/image-upload";
import axios from "axios";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const Coordinator: React.FC = () => {
  const [status, setStatus] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false); // Modal visibility state
  const [currentModal, setCurrentModal] = useState<string>("details"); // Track which modal step is active
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [coordinatorsPerPage] = useState<number>(5);

  const [currentPage, setCurrentPage] = useState<number>(0);

  const openModal = () => {
    setShowModal(true); // Show modal
  };

  const closeModal = () => {
    setShowModal(false); // Close modal
    resetForm(); // Reset the form when the modal is closed
  };

  const handleStatusChange = (selectedStatus: string) => {
    setStatus(selectedStatus);
    console.log("Selected Status:", selectedStatus);
  };

  const handleAddButtonClick = () => {
    openModal(); // Open the modal when "Add Coordinator" button is clicked
    setCurrentModal("details"); // Start with the details modal
  };

  const handleModalCancel = () => {
    if (currentModal === "confirmation") {
      // If we are in the confirmation modal, go back to credentials
      setCurrentModal("credentials");
    } else if (currentModal === "credentials") {
      // If we are in the credentials modal, go back to details
      setCurrentModal("details");
    } else {
      // If we are in the details modal, just close the modal
      closeModal();
    }
  };

  const handleReturnToRegister = () => {
    setCurrentModal("details"); // Return to the details modal
  };

  const handleModalSave = () => {
    if (currentModal === "details") {
      if (!firstName || !lastName || !contact) {
        setErrorMessage("Please fill in all required coordinator details.");
        setIsErrorModalOpen(true); // Show error modal if validation fails
        return;
      }
      setCurrentModal("credentials");
    } else if (currentModal === "credentials") {
      if (!email || !username || !password) {
        setErrorMessage("Please fill in all required credentials.");
        setIsErrorModalOpen(true); // Show error modal if validation fails
        return;
      }
      setCurrentModal("confirmation");
    }
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    field: string
  ) => {
    const value = e.target.value;
    switch (field) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "contact":
        setContact(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePhotoUpload = async (file: File) => {
    // Display a preview of the photo
    const photoURL = URL.createObjectURL(file);
    setPhotoUrl(photoURL);

    // Upload the photo to the backend
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:3001/upload-photo", // Adjust this if needed
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Assuming the backend returns a path or URL for the uploaded photo
      setPhotoUrl(response.data.filename); // Adjust this as per your backend response
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    console.log("The photoURL is :", photoUrl);
  };

  const offset = currentPage * coordinatorsPerPage; // Changed to coordinatorsPerPage

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setContact("");
    setEmail("");
    setUsername("");
    setPassword("");
  };

  // Updated columns for the DataTable
  const columns = [
    { header: "ID", key: "id" },
    { header: "First Name", key: "firstName" },
    { header: "Last Name", key: "lastName" },
    { header: "Contact Number", key: "contact" }, // Updated header for clarity
    { header: "Email", key: "email" }, // Replaced Status with Email
    {
      header: "Action",
      key: "action",
      render: (row: any) => (
        <button onClick={() => handleEdit(row.id)} className="edit-button">
          <FaEdit />
        </button>
      ),
    },
  ];

  // Add this function to handle edit action
  const handleEdit = (id: number) => {
    console.log(`Edit coordinator with id: ${id}`);
    // Implement edit logic here
  };

  const handleConfirmSave = async () => {
    if (!firstName || !lastName || !email || !username || !password) {
      setErrorMessage("Please complete all fields before confirming.");
      setIsErrorModalOpen(true); // Prevent confirmation if validation fails
      return;
    }
    try {
      const newCoordinator = {
        firstName,
        lastName,
        email,
        username,
        password,
        imgDirectory: photoUrl,
      }; // Closing the object here

      setShowModal(false);
      resetForm(); // Optionally reset the form after saving
      setCurrentModal("details");
      // Continue processing newAdminCashier, such as making an API call or other logic
    } catch (error) {
      console.error("Error saving coordinator:", error);
    }
  };

  // Sample data for the DataTable
  const data = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      contact: "09837483721",
      email: "john.doe@example.com",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      contact: "09876543210",
      email: "jane.smith@example.com",
    },
    {
      id: 3,
      firstName: "Alice",
      lastName: "Johnson",
      contact: "1234567890",
      email: "alice.johnson@example.com",
    },
    {
      id: 4,
      firstName: "Bob",
      lastName: "Brown",
      contact: "09812345678",
      email: "bob.brown@example.com",
    },
  ];

  return (
    <div className="dashboard-page">
      <h1 className="page-title">User Management</h1>
      <h2 className="page-subtitle">Manage Coordinator</h2>

      <div className="controls-container">
        <div className="search-bar-container">
          <SearchBar
            placeholder="Search"
            onSearch={(query) => console.log("Search query:", query)} // Add your search handler here
          />
        </div>

        <div className="add-button-container">
          <PrimaryButton
            buttonText="Add Coordinator"
            handleButtonClick={handleAddButtonClick}
            icon={<FontAwesomeIcon icon={faPlus} />}
          />
        </div>
      </div>

      <DataTable columns={columns} data={data} />

      {/* Step 1: Add Coordinator Details Modal */}
      <Modal
        show={showModal && currentModal === "details"}
        title=""
        message=""
        onCancel={handleModalCancel}
        onConfirm={handleModalSave}
        size="large"
        cancelButtonText="Cancel"
        confirmButtonText="Next"
      >
        <div className="modal-custom-content">
          <div className="modal-custom-header-admin-coordinator">
            <div className="header-left">
              <h2 className="main-header">Register New Coordinator</h2>
              <h3 className="sub-header">Coordinator Details</h3>
            </div>
          </div>
          <div className="modal-body">
            <div className="modal-body-left">
              <label htmlFor="firstName">First Name</label>

              <NameInputField
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => handleInputChange(e, "firstName")}
              />

              <label htmlFor="lastName">Last Name</label>
              <NameInputField
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => handleInputChange(e, "lastName")}
              />
            </div>
            <div className="modal-body-right">
              <div className="left-components">
                <label htmlFor="contact">Contact</label>
                <NameInputField
                  type="text"
                  id="contact"
                  value={contact}
                  className="contactnum"
                  onChange={(e) => handleInputChange(e, "contact")}
                />
                {/*<label htmlFor="email">Email</label>
                 <NameInputField
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => handleInputChange(e, "email")}
                />*/}
                <PhotoUploadButton
                  onPhotoUpload={handlePhotoUpload}
                  imgDirectory={photoUrl}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        show={showModal && currentModal === "credentials"}
        title=""
        message=""
        onCancel={handleReturnToRegister}
        onConfirm={handleModalSave}
        size="medium2"
        cancelButtonText="Cancel"
        confirmButtonText="Save"
      >
        <div className="modal-custom-content">
          <div className="modal-custom-header-admin-coordinator">
            <div className="header-left">
              <h2 className="main-header">Register New Coordinator</h2>
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
                  <FontAwesomeIcon icon={faEnvelope} className="iicon" />
                </div>
                <label htmlFor="username">Username</label>
                <div className="name-input-field-wrapper">
                  <NameInputField
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => handleInputChange(e, "username")}
                  />
                  <FaUser className="iiicon" />
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

      <Modal
        show={currentModal === "confirmation"}
        title="Confirmation"
        message=""
        onCancel={handleModalCancel}
        onConfirm={handleConfirmSave}
        size="smallmed"
        cancelButtonText="Cancel"
        confirmButtonText="Confirm"
      >
        <div className="modal-custom-content">
          <div className="modal-custom-header">
            <div className="header-left">
              <h2 className="main-header">Add New Coordinator</h2>
              <h3 className="sub-header">
                Are you sure you want to add this coordinator?
              </h3>
            </div>
          </div>
          <div className="modal-custom-body">
            <p>The username and password will be sent through this email:</p>
            <strong>example@gmail.com</strong>
          </div>
        </div>
      </Modal>

      <Modal
        show={isErrorModalOpen}
        title="Error"
        message="Please fill out all required fields."
        onCancel={() => setIsErrorModalOpen(false)}
        size="small"
        // confirmButtonText="OK"
        singleButton={true}
      >
        <div className="modal-custom-content">
          <div className="modal-custom-header">
            <div className="header-left">
              <h2 className="main-header">
                <FontAwesomeIcon
                  icon={faExclamationTriangle}
                  className="error-icon"
                />
                Error
              </h2>
              <h3 className="sub-header">
                Ensure all required fields are filled out.
              </h3>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Coordinator;
