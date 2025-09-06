import React, { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);

  // ✅ Fetch Products on Mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // ✅ Add or Update Product
  const handleAddOrUpdate = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image || !newProduct.description) return;

    try {
      if (editingId) {
        // Update existing
        await axios.put(`http://localhost:5000/api/products/${editingId}`, newProduct);
        setEditingId(null);
      } else {
        // Add new
        await axios.post("http://localhost:5000/api/products", newProduct);
      }

      setNewProduct({ name: "", price: "", image: "", description: "" });
      fetchProducts(); // Refresh list
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  // ✅ Edit Product (fill form)
  const handleEdit = (product) => {
    setNewProduct({
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
    });
    setEditingId(product._id);
  };

  // ✅ Delete Product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <h2>Products Management</h2>

      <div className="add-form">
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <button onClick={handleAddOrUpdate}>
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </div>

      <div className="products-grid">
        {products.map((p) => (
          <div className="product-card" key={p._id}>
            <img src={p.image} alt={p.name} />
            <h4>{p.name}</h4>
            <p>{p.description}</p>
            <p>₹{p.price}</p>
            <button onClick={() => handleEdit(p)}>Edit</button>
            <button onClick={() => handleDelete(p._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
