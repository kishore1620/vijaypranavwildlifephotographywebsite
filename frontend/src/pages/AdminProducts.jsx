import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", description: "", image: null });
  const [editingProduct, setEditingProduct] = useState(null);
  const [message, setMessage] = useState("");

  // ✅ Get token inside component
  const token = localStorage.getItem("token"); // make sure this is set after admin login
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  // Fetch products with token
  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_URL, config);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        setMessage("⚠️ Unauthorized. Please login again.");
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") setForm({ ...form, image: files[0] });
    else setForm({ ...form, [name]: value });
  };

  // Add or update product
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("description", form.description);
    if (form.image) formData.append("image", form.image);

    try {
      if (editingProduct) {
        // ✅ Update
        await axios.put(`${API_URL}/${editingProduct._id}`, formData, config);
        setMessage("✅ Product updated successfully");
      } else {
        // ✅ Add
        await axios.post(API_URL, formData, config);
        setMessage("✅ Product added successfully");
      }

      setForm({ name: "", price: "", description: "", image: null });
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error("Error saving product:", err.response?.data || err.message);
      setMessage(err.response?.data?.msg || "Error saving product");
      if (err.response?.status === 401) setMessage("⚠️ Unauthorized. Please login again.");
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
      image: null,
    });
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`, config);
      setMessage("✅ Product deleted successfully");
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err.response?.data || err.message);
      setMessage("Error deleting product");
      if (err.response?.status === 401) setMessage("⚠️ Unauthorized. Please login again.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Product Dashboard</h2>
      {message && <div className="alert alert-info">{message}</div>}

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="number" className="form-control" name="price" value={form.price} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" name="description" value={form.description} onChange={handleChange}></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Image</label>
          <input type="file" className="form-control" name="image" onChange={handleChange} />
        </div>

        <button type="submit" className="btn btn-primary">
          {editingProduct ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* Product List */}
      <h3>All Products</h3>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length ? (
            products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>₹{product.price}</td>
                <td>{product.description}</td>
                <td>
                  {product.image ? <img src={`http://localhost:5000${product.image}`} width="80" alt={product.name} /> : "No Image"}
                </td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(product)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(product._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="5">No products found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;
