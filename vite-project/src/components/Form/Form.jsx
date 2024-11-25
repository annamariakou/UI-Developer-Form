import "./Form.css";

import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Form = ({ userToEdit, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    status: "",
  });

  // Populate form when user is being edited

  useEffect(() => {
    if (userToEdit) {
      setFormData(userToEdit);
    }
  }, [userToEdit]);

  // Changes to form inputs

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Form submission

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const { firstName, lastName, email, status } = formData;
    if (!firstName || !lastName || !email || !status) {
      alert("All fields required!");
      return;
    }

    // Cannot edit if user status is disabled
    if (userToEdit?.status === "disabled") {
      alert("Cannot edit users with status set to disabled.");
      return;
    }

    onSubmit(formData);

    // Reset form after submission

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      status: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="formTitle">Add or Edit User</h2>
      <label className="formLabel">
        First Name <span className="required">*</span>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="eg. John"
          readOnly={userToEdit?.status === "disabled"}
          required
        />
      </label>
      <label className="formLabel">
        Last Name <span className="required">*</span>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="eg. Doe"
          readOnly={userToEdit?.status === "disabled"}
          required
        />
      </label>
      <label className="formLabel">
        Email <span className="required">*</span>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="eg. john@gmail.com"
          readOnly={userToEdit?.status === "disabled"}
          required
        />
      </label>
      <label className="formLabel">
        Status <span className="required">*</span>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          disabled={userToEdit?.status === "disabled"}
          required
        >
          <option value="" disabled hidden>
            Select One
          </option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="disabled">Disabled</option>
        </select>
      </label>
      <button className="formButton" type="submit">
        {userToEdit ? "Edit" : "Add"}
      </button>
    </form>
  );
};

// Prop types

Form.propTypes = {
  userToEdit: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
