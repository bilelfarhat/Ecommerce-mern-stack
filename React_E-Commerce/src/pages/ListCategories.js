import './TableComponent.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Footer, Navbar } from "../components";
import { Link } from "react-router-dom";

function ListCategories() {
  const api = "http://localhost:3001";
  const [categories, setCategories] = useState([]);
  const [editingCatId, seteditingCatId] = useState(null);

  const fetchCat = async () => {
    try {
      const response = await axios.get(`${api}/categories/list`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const deleteCat = async (_id) => {
    try {
      // Utilisez window.confirm pour demander confirmation avant la suppression
      const confirmDelete = window.confirm("Are you sure you want to delete this category?");

      if (confirmDelete) {
        await axios.delete(`${api}/categories/delete/${_id}`);
        console.log("Category deleted successfully");
        setCategories(categories.filter(categorie => categorie._id !== _id));
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const updateCat = async (categorie) => {
    try {
      await axios.put(`${api}/categories/update/${categorie._id}`, categorie);
      console.log("Categorie updated successfully");
      seteditingCatId(null);
    } catch (error) {
      console.error("Error updating categorie:", error);
    }
  };

  useEffect(() => {
    fetchCat();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="table-container">
      <div className="header-container">
          <h2 className="centered-h2">List Categories</h2>
          <div className="button-container">
            <Link to="/addCategorie" className="button">Add</Link>
          </div>
          </div>
        
        <table>
          <thead>
            <tr>

             
              <th>Name</th>
              <th>Action</th>
              
            </tr>
          </thead>
          <tbody>
            {categories.map((categorie) => (
              <tr key={categorie._id}>
                <td
                  onDoubleClick={() => seteditingCatId(categorie._id)}
                >
                  {editingCatId === categorie._id ? (
                    <input
                      type="text"
                      value={categorie.name}
                      onChange={(e) => setCategories(categories.map(a => (a._id === categorie._id ? { ...a, name: e.target.value } : a)))}
                    />
                  ) : (
                    categorie.name
                  )}
                </td>
                <td>
                  {editingCatId === categorie._id ? (
                    <>
                      <button className="button-update" onClick={() => updateCat(categorie)}>
                        Save
                      </button>
                      <button className="button-update" onClick={() => seteditingCatId(null)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button className="button-update" onClick={() => seteditingCatId(categorie._id)}>
                      Update
                    </button>
                  )}
                  <button className="button-delete" onClick={() => deleteCat(categorie._id)}>
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

export default ListCategories;
