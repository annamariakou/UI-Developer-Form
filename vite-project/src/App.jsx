import "./App.css";
import { useState, useEffect } from "react";
import moment from "moment-timezone";
import Form from "./components/Form/Form";
import UserInputs from "./components/UserInputs/UserInputs";

// Format Dates
const formatDate = (date) => {
  return moment(date)
    .tz("America/New_York")
    .format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)");
};

const App = () => {
  // Store users in state
  const [users, setUsers] = useState([]);
  // Store user to edit in state
  const [userToEdit, setUserToEdit] = useState(null);

  // Fetch users from API
  useEffect(() => {
    fetch("http://localhost:3001/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Add user to API
  const addUser = (user) => {
    const now = new Date();
    const newUser = {
      ...user,
      created: formatDate(now),
      updated: undefined,
    };

    fetch("http://localhost:3001/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((addedUser) => setUsers([...users, addedUser]))
      .catch((error) => console.error("Error adding user:", error));
  };

  // Edit user in API
  const editUser = (updatedUser) => {
    const now = new Date();
    const userWithUpdatedDate = {
      ...updatedUser,
      updated: formatDate(now),
    };

    fetch(`http://localhost:3001/api/users/${updatedUser.email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userWithUpdatedDate),
    })
      .then((response) => response.json())
      .then(() => {
        setUsers(
          users.map((user) =>
            user.email === updatedUser.email ? userWithUpdatedDate : user
          )
        );
        // Reset userToEdit state
        setUserToEdit(null);
      })
      .catch((error) => console.error("Error updating user:", error));
  };

  // Handle form submission
  const handleSubmit = (user) => {
    if (userToEdit) {
      editUser(user);
    } else {
      addUser(user);
    }
  };

  // Handle for submission for adding / editing user
  const handleEdit = (user) => {
    setUserToEdit(user);
  };

  // Remove user from list
  const handleRemove = (user) => {
    fetch(`http://localhost:3001/api/users/${user.email}`, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          setUsers(users.filter((u) => u.email !== user.email));
        } else {
          console.error("Error deleting user");
        }
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  return (
    <div>
      <h1 className="appTitle">UI Assignment</h1>
      <div className="container">
        <Form userToEdit={userToEdit} onSubmit={handleSubmit} />
        <UserInputs users={users} onEdit={handleEdit} onRemove={handleRemove} />
      </div>
    </div>
  );
};

export default App;
