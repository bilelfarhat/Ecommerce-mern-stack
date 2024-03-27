import './TableComponent.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Footer, Navbar } from "../components";
import { Link } from "react-router-dom";

function ListAdmins() {
  const api = "http://localhost:3001";
  const [admins, setAdmins] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get(`${api}/users/admins`);
      setAdmins(response.data);
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  const deleteUser = async (_id) => {
    try {
      // Utilisez window.confirm pour demander confirmation avant la suppression
      const confirmDelete = window.confirm("Are you sure you want to delete this user?");

      if (confirmDelete) {
        await axios.delete(`${api}/users/delete/${_id}`);
        console.log("User deleted successfully");
        setAdmins(admins.filter(user => user._id !== _id));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const updateAdmin = async (admin) => {
    try {
      await axios.put(`${api}/users/update/${admin._id}`, admin);
      console.log("User updated successfully");
      setEditingUserId(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="table-container">
      <div className="header-container">
          <h2 className="centered-h2">List Admins</h2>
          <div className="button-container">
            <Link to="/addadmin" className="button">Add</Link>
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
            {admins.map((admin) => (
              <tr key={admin._id}>
                <td
                  onDoubleClick={() => setEditingUserId(admin._id)}
                >
                  {editingUserId === admin._id ? (
                    <input
                      type="text"
                      value={admin.name}
                      onChange={(e) => setAdmins(admins.map(a => (a._id === admin._id ? { ...a, name: e.target.value } : a)))}
                    />
                  ) : (
                    admin.name
                  )}
                </td>
                <td
                  onDoubleClick={() => setEditingUserId(admin._id)}
                >
                  {editingUserId === admin._id ? (
                    <input
                      type="text"
                      value={admin.email}
                      onChange={(e) => setAdmins(admins.map(a => (a._id === admin._id ? { ...a, email: e.target.value } : a)))}
                    />
                  ) : (
                    admin.email
                  )}
                </td>
                <td>
                  {editingUserId === admin._id ? (
                    <>
                      <button className="button-update" onClick={() => updateAdmin(admin)}>
                        Save
                      </button>
                      <button className="button-update" onClick={() => setEditingUserId(null)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button className="button-update" onClick={() => setEditingUserId(admin._id)}>
                      Update
                    </button>
                  )}
                  <button className="button-delete" onClick={() => deleteUser(admin._id)}>
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

export default ListAdmins;
