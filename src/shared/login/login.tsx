import React, { useState, useEffect } from "react";
import "./login.scss";
import PrimaryButton from "../components/buttons/primero-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faEye,
  faUser,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import InputField from "../components/fields/inputfield";

// Import the logo image
import logo from "../assets/logo-sidebar.png"; // Adjust the path based on your project structure

const LoginForm: React.FC = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showValidationError, setShowValidationError] = useState(false);
  const [validationErrorMessage, setValidationErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleButtonClick = async () => {
    const validationErrors: { username?: string; password?: string } = {};

    if (!loginData.username) {
      validationErrors.username = "Username cannot be blank.";
    }
    if (!loginData.password) {
      validationErrors.password = "Password cannot be blank.";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setValidationErrorMessage("Username and password are required.");
      setShowValidationError(true);
      return;
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleModalClose = () => {
    setShowValidationError(false);
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleButtonClick();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [loginData]);

  return (
    <div className="login-form-container">
      <div className="container">
        {/* Logo added here */}
        <img src={logo} alt="Logo" className="logo" />
        <div className="input-container">
          <div className="input-field">
            <label htmlFor="username">Username</label>
            <InputField
              type="text"
              placeholder=""
              value={loginData.username}
              name="username"
              onChange={handleChange}
              icon={faUser}
              error={errors.username}
            />
          </div>

          <div className="input-field">
            <label htmlFor="password">Password</label>
            <InputField
              type={showPassword ? "text" : "password"}
              placeholder=""
              value={loginData.password}
              name="password"
              onChange={handleChange}
              icon={faLock}
              toggleIcon={showPassword ? faEye : faEyeSlash}
              onTogglePassword={togglePasswordVisibility}
              error={errors.password}
            />
          </div>
        </div>
        <PrimaryButton
          buttonText="Login"
          handleButtonClick={handleButtonClick}
        />
      </div>
    </div>
  );
};

export default LoginForm;
