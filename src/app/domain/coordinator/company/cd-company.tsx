import React, { useState } from "react";
import "./cd-company.scss";

import SearchBar from "../../../../shared/components/searchbar/searchbar"; // Adjust the path as needed
import DataTable from "../../../../shared/components/table/data-table";
import { faEdit, faPlus, faQrcode } from "@fortawesome/free-solid-svg-icons"; // Added faQrcode
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PrimaryButton from "../../../../shared/components/buttons/primero-button";
import Modal from "../../../../shared/components/modals/modal";
import NameInputField from "../../../../shared/components/fields/unif";
import QRCodeComponent from "../../../../shared/components/qrcode/qr-code";

const CoordinatorCompany: React.FC = () => {
  const [companyData, setCompanyData] = useState<
    Array<{
      id: number;
      companyName: string;
      address: string;
      mentorName: string;
      contactNo: string;
      qrCode: string | null;
    }>
  >([
    //example data in table here
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentModal, setCurrentModal] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    companyName: "",
    address: "",
    mentorName: "",
    contact: "",
  });
  const [qrCodeData, setQRCodeData] = useState<string | null>(null);

  const handleEdit = (id: number) => {
    console.log("Edit company record with ID:", id);
  };

  const handleAddButtonClick = () => {
    setShowModal(true);
    setCurrentModal("details");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    field: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const columns = [
    { header: "#", key: "id" },
    {
      header: "Company Name",
      key: "companyName",
      render: (row: any) => row.companyName || "N/A",
    },
    {
      header: "Address",
      key: "address",
      render: (row: any) => row.address || "N/A",
    },
    {
      header: "Mentor Name",
      key: "mentorName",
      render: (row: any) => row.mentorName || "N/A",
    },
    {
      header: "Contact #",
      key: "contactNo",
      render: (row: any) => row.contactNo || "N/A",
    },
    {
      header: "QR Code",
      key: "qrCode",
      render: (row: any) => (
        <div className="qr-code">
          {row.qrCode ? (
            <QRCodeComponent value={row.qrCode} size={50} />
          ) : (
            "No QR Code"
          )}
        </div>
      ),
    },
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

  const handleModalCancel = () => {
    setShowModal(false);
  };

  const handleModalSave = () => {
    // Instead of closing the modal, transition to the next one
    setCurrentModal("credentials");
  };

  const handleReturnToRegister = () => {
    // Implement the logic for returning to register
  };

  const handleGenerateQRCode = () => {
    const qrContent = `Company-${Date.now()}`;
    setQRCodeData(qrContent);
  };

  const handleRegisterQRCode = () => {
    // Create a new company object
    const newCompany = {
      id: companyData.length + 1,
      companyName: formData.companyName,
      address: formData.address,
      mentorName: formData.mentorName,
      contactNo: formData.contact,
      qrCode: qrCodeData,
    };

    // Add the new company to the companyData array
    setCompanyData([...companyData, newCompany]);

    // Reset the form data
    setFormData({
      companyName: "",
      address: "",
      mentorName: "",
      contact: "",
    });

    // Close the modal and reset QR code data
    setShowModal(false);
    setQRCodeData(null);
    setCurrentModal(null);
  };

  const companyPerPage = 10; // Adjust this number as needed
  const pageCount = Math.ceil(companyPerPage);
  const handlePageClick = ({ selected }: { selected: number }) => {
    // Handle page change logic here using the 'selected' value
  };

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Company</h1>
      <h2 className="page-subtitle">Manage Company Information</h2>

      <div className="controls-container">
        <div className="search-bar-container">
          <SearchBar
            placeholder="Search"
            onSearch={(query) => console.log(query)}
          />
        </div>
        <div className="add-button-container">
          <PrimaryButton
            buttonText="Add Company"
            handleButtonClick={handleAddButtonClick}
            icon={<FontAwesomeIcon icon={faPlus} />}
          />
        </div>
      </div>

      <DataTable columns={columns} data={companyData} />

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
          <div className="modal-custom-header-company">
            <div className="header-left">
              <h2 className="main-header">Register New Company</h2>
              <h3 className="sub-header">Company Details</h3>
            </div>
          </div>
          <div className="modal--body">
            <div className="modal-bodyleft">
              <h4>Company Info</h4>
              <div className="naming">
                <label htmlFor="companyName">Name</label>
              </div>
              <NameInputField
                type="text"
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleInputChange(e, "companyName")}
              />

              <label htmlFor="address">Address</label>
              <NameInputField
                type="text"
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange(e, "address")}
              />
            </div>

            <div className="modal-bodyright">
              <h4>Mentor Info</h4>
              <div className="leftcomponents">
                <label htmlFor="mentorName">Mentor Name</label>
                <NameInputField
                  type="text"
                  id="mentorName"
                  value={formData.mentorName}
                  onChange={(e) => handleInputChange(e, "mentorName")}
                />

                <label htmlFor="contact">Contact #</label>
                <NameInputField
                  type="text"
                  id="contact"
                  value={formData.contact}
                  onChange={(e) => handleInputChange(e, "contact")}
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
        onCancel={() => setCurrentModal("details")} // Go back to the first modal
        onConfirm={handleRegisterQRCode}
        size="medlarge"
        cancelButtonText="Back"
        confirmButtonText="Register"
      >
        <div className="modal-custom-content">
          <div className="modal-custom-header-admin-coordinator">
            <div className="header-left">
              <h2 className="main-header">Register QR Code</h2>
              <h3 className="sub-header">
                Generate and Download Unique QR code
              </h3>
            </div>
          </div>
          <div className="credentials-modal-container">
            <div className="credentials-modal-body">
              <PrimaryButton
                buttonText="Generate QR Code"
                handleButtonClick={handleGenerateQRCode}
                icon={<FontAwesomeIcon icon={faPlus} />}
              />
              {qrCodeData && (
                <div className="qr-code-container">
                  <p>QR Code</p>
                  <QRCodeComponent value={qrCodeData} size={200} />
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CoordinatorCompany;
