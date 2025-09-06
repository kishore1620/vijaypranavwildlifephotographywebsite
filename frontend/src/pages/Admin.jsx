import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/admin.css";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: "", imageUrl: "" });
  const [editingId, setEditingId] = useState(null);

  // ✅ Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Add / Update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/products/${editingId}`, form);
      } else {
        await axios.post("http://localhost:5000/api/products", form);
      }
      setForm({ name: "", description: "", price: "", imageUrl: "" });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Edit product
  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product._id);
  };

  // ✅ Delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li>Products</li>
          <li>Orders</li>
          <li>Users</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <h1>Manage Products</h1>

        {/* Add/Edit Form */}
        <form className="product-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={handleChange}
            required
          />
          <button type="submit">{editingId ? "Update" : "Add"} Product</button>
        </form>

        {/* Product Table */}
        <table className="product-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>₹{p.price}</td>
                <td><img src={p.imageUrl} alt={p.name} width="60" /></td>
                <td>
                  <button onClick={() => handleEdit(p)}>Edit</button>
                  <button onClick={() => handleDelete(p._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Admin;
