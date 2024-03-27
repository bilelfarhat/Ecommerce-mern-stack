import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Footer, Navbar } from "../components";
import { Link } from "react-router-dom";

function ListUsers() {
  const api = "http://localhost:3001";
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${api}/users/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (_id) => {
    try {
      // Utilisez window.confirm pour demander confirmation avant la suppression
      const confirmDelete = window.confirm("Are you sure you want to delete this user?");

      if (confirmDelete) {
        await axios.delete(`${api}/users/delete/${_id}`);
        console.log("User deleted successfully");
        setUsers(users.filter(user => user._id !== _id));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const updateUser = async (user) => {
    try {
      await axios.put(`${api}/users/update/${user._id}`, user);
      console.log("User updated successfully");
      setEditingUserId(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="table-container">
      <div className="header-container">
          <h2 className="centered-h2">List Users</h2>
          <div className="button-container">
            <Link to="/adduser" className="button">Add</Link>
          </div>
          </div>
       
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td
                  onDoubleClick={() => setEditingUserId(user._id)}
                >
                  {editingUserId === user._id ? (
                    <input
                      type="text"
                      value={user.name}
                      onChange={(e) => setUsers(users.map(u => (u._id === user._id ? { ...u, name: e.target.value } : u)))}
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td
                  onDoubleClick={() => setEditingUserId(user._id)}
                >
                  {editingUserId === user._id ? (
                    <input
                      type="text"
                      value={user.email}
                      onChange={(e) => setUsers(users.map(u => (u._id === user._id ? { ...u, email: e.target.value } : u)))}
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  {editingUserId === user._id ? (
                    <>
                      <button className="button-update" onClick={() => updateUser(user)}>
                        Save
                      </button>
                      <button className="button-update" onClick={() => setEditingUserId(null)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button className="button-update" onClick={() => setEditingUserId(user._id)}>
                      Update
                    </button>
                  )}
                  <button className="button-delete" onClick={() => deleteUser(user._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       
      </div>
      <Footer />
    </div>
  );
}

export default ListUsers;
