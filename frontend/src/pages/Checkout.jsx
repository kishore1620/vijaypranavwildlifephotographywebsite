import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import emailjs from "@emailjs/browser";
import { UserContext } from "../context/UserContext";

const Checkout = () => {
  const { user, cart, setCart } = useContext(UserContext);
  const navigate = useNavigate();

  // Redirect guests
  useEffect(() => {
    if (!user) {
      alert("⚠️ Please login to place an order.");
      navigate("/login");
    }
  }, [user]);

  const [username, setUsername] = useState(user?.name || "");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [district, setDistrict] = useState("");
  const [payment, setPayment] = useState("COD");

  const total = cart.reduce((sum, item) => sum + item.qty * (item.price || 799), 0);

  const handleConfirmOrder = async () => {
    if (!username || !address || !pincode || !district) {
      alert("⚠️ Please fill all delivery details.");
      return;
    }

    try {
      const orderSummary = cart
        .map((i) => `${i.name} x${i.qty} = ₹${i.price * i.qty}`)
        .join("\n");

      const userEmail = user?.email || "test@gmail.com";

      // Send email to user & admin (you can customize templates)
      await Promise.all([
        emailjs.send(
          "service_kishore",
          "template_to_user",
          { user_email: userEmail, user_name: username, address, district, pincode, payment, cart_summary: orderSummary, total },
          "kri44XXY7Fj3P1Gqy"
        ),
        emailjs.send(
          "service_kishore",
          "template_to_kishore",
          { user_email: userEmail, user_name: username, address, district, pincode, payment, cart_summary: orderSummary, total },
          "kri44XXY7Fj3P1Gqy"
        ),
      ]);

      // Save to backend
      const payload = {
        userId: user._id,
        username,
        address,
        pincode,
        district,
        payment,
        items: cart.map((i) => ({
          productId: i._id,
          name: i.name,
          price: i.price,
          quantity: i.qty,
        })),
        total,
      };

      console.log("📦 Sending order payload:", payload);

      await axios.post("http://localhost:5000/api/orders", payload);

      // Clear cart
      setCart([]);
      localStorage.removeItem("cart");

      alert("✅ Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      console.error("Order error:", err.response?.data || err.message);
      alert(`❌ Failed to place order: ${err.response?.data?.message || "Server error"}`);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center text-warning" style={{ marginTop: "170px" }}>Checkout</h2>

      {/* Order Summary */}
      <div className="card p-3 mb-4 shadow-sm">
        <h4 className="mb-3">Order Summary</h4>
        {cart.length ? (
          cart.map((item, index) => (
            <div key={index} className="d-flex justify-content-between p-2 border-bottom">
              <span>{item.name} (x{item.qty})</span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))
        ) : (
          <p className="text-center">Your cart is empty.</p>
        )}
        <h4 className="text-end mt-3">Total: ₹{total}</h4>
      </div>

      {/* Delivery Info */}
      <div className="card p-3 mb-4 shadow-sm">
        <h5>Delivery Details</h5>
        <input className="form-control mb-2" placeholder="Full Name" value={username} onChange={(e) => setUsername(e.target.value)} />
        <textarea className="form-control mb-2" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
        <input className="form-control mb-2" placeholder="Pin Code" value={pincode} onChange={(e) => setPincode(e.target.value)} />
        <input className="form-control mb-2" placeholder="District" value={district} onChange={(e) => setDistrict(e.target.value)} />
      </div>

      {/* Payment Method */}
      <div className="card p-3 mb-4 shadow-sm">
        <h5>Payment Method</h5>
        <select className="form-control" value={payment} onChange={(e) => setPayment(e.target.value)}>
          <option value="COD">Cash on Delivery</option>
          <option value="UPI">UPI</option>
          <option value="Card">Credit/Debit Card</option>
        </select>
      </div>

      <button className="btn btn-success w-100 py-2 fw-bold" onClick={handleConfirmOrder}>
        ✅ Confirm Order
      </button>
    </div>
  );
};

export default Checkout;
