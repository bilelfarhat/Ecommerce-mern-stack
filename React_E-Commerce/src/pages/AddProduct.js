import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Footer, Navbar } from "../components";
import Select from 'antd/lib/select';  // Importez le composant Select d'Ant Design

import './TableComponent.css';

const { Option } = Select;  // Définissez l'option pour le composant Select

const AddProduct = () => {
  const api = "http://localhost:3001";
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");  // Utilisez setCategory au lieu de setCategories
  const [categories, setCategories] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("category", category);

    try {
      const response = await axios.post(`${api}/products/addproduct`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("Product added successfully:", response.data);
      window.location.href = "/listproducts"


    } catch (error) {
      console.error("Axios error:", error);
      console.error("Axios response data:", error.response.data);
      console.error("Axios response status:", error.response.status);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3001/categories/list");
        const categories = response.data;
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <Navbar />
      <div className="product-form-center">
        <div className="product-form-container">
          <h2 className="centered-h1">Add Product</h2>
          <form onSubmit={handleSubmit}>
            <label>Image:</label>
            <input type="file" accept="image/*" onChange={handleImageChange} required />
            <label>Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

            <label>Description:</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

            <label>Price:</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />

            <label>Quantity:</label>
            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />

            <label>Category:</label>
            <Select
  name="category"
  value={category}
  onChange={(value) => setCategory(value)}  // Utilisez setCategory au lieu de this.setState
  placeholder="Select categorie"
>
  {categories.map((cat) => (
    <Option key={cat._id} value={cat.name}>
      {cat.name}
    </Option>
  ))}
</Select><br></br>

            <div className="submit-button-container">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddProduct;
