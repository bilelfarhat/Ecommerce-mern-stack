import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  let componentMounted = true;

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
    console.log(product);
  };

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3001/products/list");

      if (!response.ok) {
        throw new Error(
          `Failed to fetch products: ${response.status} ${response.statusText}`
        );
      }

      const products = await response.json();
      if (componentMounted) {
        setData(products);
        setFilter(products);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching products:", error.message);
      setLoading(false);
    }
  };

  const getCategories = async () => {
    try {
      const response = await fetch("http://localhost:3001/categories/list");

      if (!response.ok) {
        throw new Error(
          `Failed to fetch categories: ${response.status} ${response.statusText}`
        );
      }

      const categories = await response.json();
      setCategories(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getProducts();
    getCategories();

    return () => {
      componentMounted = false;
    };
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        {/* ... (rest of your loading skeleton code) */}
      </>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-5">
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => setFilter(data)}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              className="btn btn-outline-dark btn-sm m-2"
              onClick={() => filterProduct(cat.name)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {filter.map((product) => {
          return (
            <div
              id={product.id}
              key={product.id}
              className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
            >
              <div className="card text-center h-100" key={product.id}>
                <img
                  className="card-img-top p-3"
                  src={`data:image/jpeg;base64,${product.image}`}
                  alt="Card"
                  height={300}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {product.title
                      ? product.title.slice(0, 12) +
                        (product.title.length > 12 ? "..." : "")
                      : ""}
                  </h5>
                  <p className="card-text">
                    {product.description
                      ? product.description.slice(0, 90) +
                        (product.description.length > 90 ? "..." : "")
                      : ""}
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead"> {product.price} TND</li>
                </ul>
                <div className="card-body">
             
                  <button
                    className="btn btn-dark m-1"
                    onClick={() => addProduct(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;
