import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Footer, Navbar } from "../components";
import { Link } from "react-router-dom";

function ListProduct() {
  const api = "http://localhost:3001";
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${api}/products/list`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (_id) => {
    try {
      // Utilisez window.confirm pour demander confirmation avant la suppression
      const confirmDelete = window.confirm("Are you sure you want to delete this product?");

      if (confirmDelete) {
        await axios.delete(`${api}/products/delete/${_id}`);
        console.log("Product deleted successfully");
        setProducts(products.filter(product => product._id !== _id));
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const updateProduct = async (product) => {
    try {
      await axios.put(`${api}/products/update/${product._id}`, product);
      console.log("Product updated successfully");
      setEditingProductId(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="table-container">
      <div className="header-container">
          <h2 className="centered-h2">List Products</h2>
          <div className="button-container">
            <Link to="/addproduct" className="button">Add</Link>
          </div>
          </div>
      
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
  {editingProductId === product._id ? (
    <input
      type="text"
      value={product.image}
      onChange={(e) => setProducts(products.map(p => (p._id === product._id ? { ...p, image: e.target.value } : p)))}
    />
  ) : (
    <img
      src={editingProductId === product._id ? product.image : `data:image/jpeg;base64,${product.image}`}
      alt={product.title}
      style={{ width: '50px', height: '50px' }}
      crossOrigin="anonymous"
      onLoad={() => console.log("Image préchargée")}
    />
  )}
</td>
                <td
                  onDoubleClick={() => setEditingProductId(product._id)}
                >
                  {editingProductId === product._id ? (
                    <input
                      type="text"
                      value={product.title}
                      onChange={(e) => setProducts(products.map(p => (p._id === product._id ? { ...p, title: e.target.value } : p)))}
                    />
                  ) : (
                    product.title
                  )}
                </td>
                <td
                  onDoubleClick={() => setEditingProductId(product._id)}
                >
                  {editingProductId === product._id ? (
                    <input
                      type="text"
                      value={product.description}
                      onChange={(e) => setProducts(products.map(p => (p._id === product._id ? { ...p, description: e.target.value } : p)))}
                    />
                  ) : (
                    product.description
                  )}
                </td>
                <td
                  onDoubleClick={() => setEditingProductId(product._id)}
                >
                  {editingProductId === product._id ? (
                    <input
                      type="text"
                      value={product.price}
                      onChange={(e) => setProducts(products.map(p => (p._id === product._id ? { ...p, price: e.target.value } : p)))}
                    />
                  ) : (
                    product.price
                  )}
                </td>
                <td
                  onDoubleClick={() => setEditingProductId(product._id)}
                >
                  {editingProductId === product._id ? (
                    <input
                      type="text"
                      value={product.quantity}
                      onChange={(e) => setProducts(products.map(p => (p._id === product._id ? { ...p, quantity: e.target.value } : p)))}
                    />
                  ) : (
                    product.quantity
                  )}
                </td>
                <td
                  onDoubleClick={() => setEditingProductId(product._id)}
                >
                  {editingProductId === product._id ? (
                    <input
                      type="text"
                      value={product.category}
                      onChange={(e) => setProducts(products.map(p => (p._id === product._id ? { ...p, category: e.target.value } : p)))}
                    />
                  ) : (
                    product.category
                  )}
                </td>
                <td>
                  {editingProductId === product._id ? (
                    <div>
                      <button className="button-update" onClick={() => updateProduct(product)}>
                        Save
                      </button>
                      <button className="button-update" onClick={() => setEditingProductId(null)}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button className="button-update" onClick={() => setEditingProductId(product._id)}>
                      Update
                    </button>
                  )}
                  <button className="button-delete" onClick={() => deleteProduct(product._id)}>
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

export default ListProduct;
