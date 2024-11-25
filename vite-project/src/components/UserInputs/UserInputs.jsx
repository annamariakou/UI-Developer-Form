import "./UserInputs.css";
import PropTypes from "prop-types";
import { format } from "date-fns";

import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import activeIcon from "../../assets/icons/active.svg";
import inactiveIcon from "../../assets/icons/inactive.svg";
import disabledIcon from "../../assets/icons/disabled.svg";

// Component to display a list of user details
const UserInputs = ({ users, onEdit, onRemove }) => {
  // Format date in MM/dd/yyyy
  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date)) {
        throw new Error("Invalid date");
      }
      return format(date, "MM/dd/yyyy");
    } catch (error) {
      console.error("Date parsing error:", error);
      return "Unavailable";
    }
  };

  // Function to get status icon based on status
  const getStatusIcon = (status) => {
    let icon;
    switch (status) {
      case "active":
        icon = activeIcon;
        break;
      case "inactive":
        icon = inactiveIcon;
        break;
      case "disabled":
        icon = disabledIcon;
        break;
      default:
        icon = null;
    }
    return (
      <span className="statusWrapper">
        <img src={icon} alt={status} className="statusIcon" />
        <span>{status}</span>
      </span>
    );
  };

  return (
    <div>
      <h2 className="listTitle">User List</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <div className="userInfo">
              <span>
                {user.firstName} {user.lastName}
              </span>
              <span>{user.email}</span>
              <span>{getStatusIcon(user.status)}</span>
              <span>Created: {formatDate(user.created)}</span>
              <span>Updated: {formatDate(user.updated)}</span>
            </div>
            <div className="actions">
              <button className="listButton" onClick={() => onRemove(user)}>
                <img src={deleteIcon} alt="Delete" />
              </button>
              <button className="listButton" onClick={() => onEdit(user)}>
                <img src={editIcon} alt="Edit" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Prop types to ensure the right props are being passed

UserInputs.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      created: PropTypes.string.isRequired,
      updated: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemove: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default UserInputs;
