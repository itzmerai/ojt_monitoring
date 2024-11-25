import React, { useState, useEffect } from "react";
import "./user-coordinator.scss";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../../../../shared/components/searchbar/searchbar"; // Adjust the path as needed
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PrimaryButton from "../../../../shared/components/buttons/primero-button";
import DataTable from "../../../../shared/components/table/data-table";
import Modal from "../../../../shared/components/modals/modal";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEdit } from "react-icons/fa";
import NameInputField from "../../../../shared/components/fields/unif";
import Dropdown from "../../../../shared/components/dropdowns/dropdown";
import axios from "axios";

const Coordinator: React.FC = () => {
  const [programOptions, setProgramOptions] = useState([]);
  const [showModal, setShowModal] = useState<boolean>(false); 
  const [currentModal, setCurrentModal] = useState<string>("details");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [program, setProgram] = useState("");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [coordinators, setCoordinators] = useState<any[]>([]); 

  // Fetch coordinator data from the database
  useEffect(() => {
    const fetchCoordinators = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/coordinators");
        setCoordinators(response.data); // Update state with the fetched data
      } catch (error) {
        console.error("Error fetching coordinators:", error);
      }
    };
    fetchCoordinators();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [programsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/programname"),
        ]);
        setProgramOptions(programsRes.data.map((p) => ({ value: p.program_id, label: p.program_name })));

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleAddButtonClick = () => {
    openModal();
    setCurrentModal("details");
  };

  const handleModalCancel = () => {
    if (currentModal === "confirmation") {
      setCurrentModal("credentials");
    } else if (currentModal === "credentials") {
      setCurrentModal("details");
    } else {
      closeModal();
    }
  };

  // Handle return to "details" modal step
  const handleReturnToRegister = () => {
    setCurrentModal("details"); // Go back to the first step of the modal
  };

  const handleModalSave = () => {
    if (currentModal === "details") {
      if (!firstName || !lastName || !contact) {
        setErrorMessage("Please fill in all required coordinator details.");
        setIsErrorModalOpen(true);
        return;
      }
      setCurrentModal("credentials");
    } else if (currentModal === "credentials") {
      if (!email || !username || !password) {
        setErrorMessage("Please fill in all required credentials.");
        setIsErrorModalOpen(true);
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

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setContact("");
    setProgram("");
    setEmail("");
    setUsername("");
    setPassword("");
  };

  const handleConfirmSave = async () => {
    // Validate that all fields are filled
    if (!firstName || !lastName || !email || !username || !password || !contact) {
      setErrorMessage("All fields are required.");
      setIsErrorModalOpen(true);
      return;
    }
  
    // Log the payload before sending
    const newCoordinator = {
      admin_id: localStorage.getItem("admin_id"), // make sure this exists
      coordinator_firstname: firstName,
      coordinator_lastname: lastName,
      coordinator_contact: contact,
      program_id: program,
      coordinator_email: email,
      coordinator_user: username,
      coordinator_pass: password,
    };
  
    console.log("Submitting coordinator:", newCoordinator);
  
    try {
      const token = localStorage.getItem("token");
  
      // Make the POST request
      const response = await axios.post(
        "http://localhost:5000/api/add-coordinator",
        newCoordinator,
        {
          headers: {
            Authorization: token, // Ensure the token is valid
          },
        }
      );
  
      // On success
      setShowModal(false);
      resetForm();
      setCurrentModal("details");
  
      // Fetch updated coordinator list
      const fetchResponse = await axios.get("http://localhost:5000/api/coordinators");
      setCoordinators(fetchResponse.data);
  
    } catch (error: any) {
      console.error("Error saving coordinator:", error.response ? error.response.data : error.message);
      setErrorMessage(error.response?.data?.message || "Failed to save coordinator. Please try again.");
      setIsErrorModalOpen(true);
    }
  };
  
  const handleEdit = (id: number) => {
    console.log(`Edit coordinator with id: ${id}`);
  };

  return (
    <div className="dashboard-page">
      <h1 className="page-title">User Management</h1>
      <h2 className="page-subtitle">Manage Coordinator</h2>

      <div className="controls-container">
        <div className="search-bar-container">
          <SearchBar
            placeholder="Search"
            onSearch={(query) => console.log("Search query:", query)}
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

      <DataTable 
  columns={[
    { header: "ID", key: "coordinator_id" },
    { header: "First Name", key: "coordinator_firstname" },
    { header: "Last Name", key: "coordinator_lastname" },
    { header: "Contact Number", key: "coordinator_contact" },
    { header: "Program", key: "program_name" },
    { header: "Email", key: "coordinator_email" },
    { header: "Username", key: "coordinator_user" },
    { header: "Password", key: "coordinator_pass" },
    
    {
      header: "Action",
      key: "action",
      render: (row) => (
        <button onClick={() => handleEdit(row.id)} className="edit-button">
          <FaEdit />
        </button>
      ),
    }
  ]}
  data={coordinators} 
/>


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
              </div>
              <div className="dropdowns">
            <label htmlFor="program">Program</label>
                  <Dropdown
                    options={programOptions.map((p) => p.label)}
                    value={programOptions.find((p) => p.value === program)?.label || ""}
                    onChange={(selectedLabel) =>
                      setProgram(programOptions.find((p) => p.label === selectedLabel)?.value || "")
                    }
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
  onConfirm={handleConfirmSave}  // Here we ensure this triggers saving
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
      <strong>{email}</strong>
    </div>
  </div>
</Modal>


     {/*<Modal
        show={isErrorModalOpen}
        title="Error"
        message={errorMessage}
        onCancel={() => setIsErrorModalOpen(false)}
        size="small"
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
      </Modal>*/}
    </div>
  );
};

export default Coordinator;
