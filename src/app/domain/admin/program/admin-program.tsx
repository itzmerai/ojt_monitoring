import React, { useState } from "react";
import "./admin-program.scss";
import SearchBar from "../../../../shared/components/searchbar/searchbar"; // Adjust the path as needed
import PrimaryButton from "../../../../shared/components/buttons/primero-button";
import DataTable from "../../../../shared/components/table/data-table";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../../../../shared/components/modals/modal";
import NameInputField from "../../../../shared/components/fields/unif";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
const handleEdit = (id: number) => {
  // Implement your edit logic here
};

const Program: React.FC = () => {
  const [programs, setPrograms] = useState([
    {
      id: 1,
      program: "BSCS",
      description: "Bachelor of Science in Computer Science",
      requiredDuration: "320 hrs",
    },
    {
      id: 2,
      program: "BS Information Technology",
      description: "Bachelor of Science in Information Technology",
      requiredDuration: "350 hrs",
    },
    {
      id: 3,
      program: "BEEd",
      description: "Bachelor of Elementary Education",
      requiredDuration: "40 days",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [program, setProgram] = useState("");
  const [description, setDescription] = useState("");
  const [requiredDuration, setRequiredDuration] = useState(""); // New state for required duration
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);
  const [currentModal, setCurrentModal] = useState<string>("details"); // Track which modal step is active
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
    useState<boolean>(false);
  const handleAddButtonClick = () => {
    setShowModal(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    field: string
  ) => {
    if (field === "program") {
      setProgram(e.target.value);
    } else if (field === "description") {
      setDescription(e.target.value);
    } else if (field === "requiredDuration") {
      // Handle required duration input
      setRequiredDuration(e.target.value);
    }
  };

  const handleModalCancel = () => {
    setShowModal(false);
    setProgram("");
    setDescription("");
    setRequiredDuration(""); // Reset required duration
  };

  const handleModalSave = () => {
    if (!program || !description || !requiredDuration) {
      setIsErrorModalOpen(true);
    } else {
      // Show the confirmation modal if all fields are filled
      setCurrentModal("confirmation");
      setShowModal(false); // Close the add modal
    }
  };
  const confirmAddProgram = () => {
    const newProgram = {
      id: programs.length + 1,
      program,
      description,
      requiredDuration,
    };

    // Add the new program to the state
    setPrograms([...programs, newProgram]);

    // Close the confirmation modal
    setCurrentModal("details"); // Reset to details or whatever your default modal is
    setIsConfirmationModalOpen(false); // Close confirmation modal

    // Reset fields
    handleModalCancel(); // This will reset fields and close the add modal
  };

  // Table columns
  const columns = [
    { header: "ID", key: "id" },
    { header: "Program", key: "program" },
    { header: "Description", key: "description" },
    { header: "Required Duration", key: "requiredDuration" },
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

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Program</h1>
      <h2 className="page-subtitle">Manage Academic Program</h2>

      {/* Add the SearchBar and Add Button side by side */}
      <div className="controls-container">
        <div className="search-bar-container">
          <SearchBar
            placeholder="Search"
            onSearch={(query) => console.log(query)}
          />
        </div>

        <div className="add-button-container">
          <PrimaryButton
            buttonText="Add Program"
            handleButtonClick={handleAddButtonClick}
            icon={<FontAwesomeIcon icon={faPlus} />}
          />
        </div>
      </div>

      {/* Render the DataTable */}
      <DataTable columns={columns} data={programs} />

      {/* Modal for adding a new program */}
      <Modal
        show={showModal}
        message="Please fill in the details below:"
        title=""
        onCancel={handleModalCancel}
        onConfirm={handleModalSave}
        cancelButtonText="Cancel"
        confirmButtonText="Add"
      >
        <div className="modal-custom-header-admin-program">
          <div className="header-left">
            <h2 className="main-header">Register New Program</h2>
            <h3 className="sub-header">Program Details</h3>
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-program">
            <label htmlFor="program">Program</label>
            <NameInputField
              type="text"
              id="program"
              value={program}
              onChange={(e) => handleInputChange(e, "program")}
            />
            <div className="description-modal">
              <label htmlFor="description">Description</label>
            </div>
            <NameInputField
              type="text"
              id="description"
              value={description}
              onChange={(e) => handleInputChange(e, "description")}
            />

            {/* New Required Duration Input Field */}
            <label htmlFor="requiredDuration">Duration</label>
            <NameInputField
              type="text"
              id="requiredDuration"
              value={requiredDuration}
              onChange={(e) => handleInputChange(e, "requiredDuration")}
            />
          </div>
        </div>
      </Modal>

      <Modal
        show={currentModal === "confirmation"}
        title="Confirmation"
        message=""
        onCancel={handleModalCancel}
        onConfirm={confirmAddProgram}
        size="small"
        cancelButtonText="Cancel"
        confirmButtonText="Confirm"
      >
        <div className="modal-custom-content">
          <div className="modal-custom-header">
            <div className="header-left">
              <h2 className="main-header">Add New Program</h2>
              <h3 className="sub-header">
                Are you sure you want to add this program?
              </h3>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        show={isErrorModalOpen}
        title="" // Remove the title
        message="Please fill out all required fields."
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
      </Modal>
    </div>
  );
};

export default Program;
