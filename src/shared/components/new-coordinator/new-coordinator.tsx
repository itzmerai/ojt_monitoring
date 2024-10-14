import React from "react";
import "./new-coordinator.scss";

interface NewCoordinatorCardProps {
  profilePicture: string;
  name: string;
  registrationDate: string;
}

const NewCoordinatorCard: React.FC<NewCoordinatorCardProps> = ({
  profilePicture,
  name,
  registrationDate,
}) => {
  return (
    <div className="card">
      <img
        className="profile-picture"
        src={profilePicture}
        alt={`${name}'s profile`}
      />
      <div className="member-info">
        <span className="member-name">{name}</span>
        <span className="registration-date">{registrationDate}</span>
      </div>
    </div>
  );
};

export default NewCoordinatorCard;
