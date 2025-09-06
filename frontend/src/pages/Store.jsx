import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import "../styles/store.css";

const API_URL = "http://localhost:5000/api/products";
const BASE_URL = "http://localhost:5000";
const FALLBACK_IMAGE = "https://via.placeholder.com/300x200?text=No+Image";

const Store = () => {
  const { user, addToCart } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(API_URL);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err.message);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    if (!user) {
      navigate("/login");
      return;
    }
    addToCart(product);
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center" style={{ marginTop: "150px" }}>Our Products</h2>
      <div className="row">
        {products.length > 0 ? (
          products.map((product) => {
            const imgSrc = product.image
              ? `${BASE_URL}/${product.image.replace(/^\//, "")}`
              : FALLBACK_IMAGE;

            return (
              <div className="col-md-4 mb-4" key={product._id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={imgSrc}
                    alt={product.name}
                    className="card-img-top"
                    style={{ height: "400px", objectFit: "100% 100%" }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = FALLBACK_IMAGE;
                    }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text fw-bold">₹{product.price}</p>
                    <button
                      className={`btn mt-auto ${user ? "btn-warning" : "btn-outline-warning"}`}
                      onClick={() => handleAddToCart(product)}
                    >
                      {user ? "Add to Cart 🛒" : "Login to Buy"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center">No products available</p>
        )}
      </div>
    </div>
  );
};

export default Store;
