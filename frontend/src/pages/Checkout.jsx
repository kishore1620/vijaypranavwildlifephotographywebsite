import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import emailjs from "@emailjs/browser";
import { UserContext } from "../context/UserContext";

const Checkout = () => {
  const { user, cart, setCart } = useContext(UserContext);
  const navigate = useNavigate();

  // Redirect guests after user loads
  useEffect(() => {
    if (user === undefined) return;
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

  const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

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

      // Email sending
      await Promise.all([
        emailjs.send(
          "service_kishore",
          "template_to_user",
          {
            user_email: userEmail,
            user_name: username,
            address,
            district,
            pincode,
            payment,
            cart_summary: orderSummary,
            total,
          },
          "kri44XXY7Fj3P1Gqy"
        ),

        emailjs.send(
          "service_kishore",
          "template_to_kishore",
          {
            user_email: userEmail,
            user_name: username,
            address,
            district,
            pincode,
            payment,
            cart_summary: orderSummary,
            total,
          },
          "kri44XXY7Fj3P1Gqy"
        ),
      ]);

      // Send FULL ORDER DATA
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
          image: i.image || "",
        })),
        total,
      };

      await axios.post("http://localhost:5000/api/orders", payload);

      // Clear cart
      setCart([]);
      localStorage.removeItem("cart");

      alert("✅Please confirm your order..!!");
      navigate("/order-success");

    } catch (err) {
      console.error("Order error:", err.response?.data || err.message);
      alert(
        `❌ Failed to place order: ${
          err.response?.data?.message || "Server error"
        }`
      );
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center text-warning" style={{ marginTop: "170px" }}>
        Checkout
      </h2>

      {/* ORDER SUMMARY */}
      <div className="card p-3 mb-4 shadow-sm">
        <h4 className="mb-3">Order Summary</h4>

        {cart.length ? (
          cart.map((item, index) => {
            const imageURL = item.image
              ? `http://localhost:5000/${item.image.replace(/^\//, "")}`
              : "https://via.placeholder.com/50";

            return (
              <div
                key={index}
                className="d-flex justify-content-between align-items-center p-2 border-bottom"
              >
                {/* image + name */}
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={imageURL}
                    alt={item.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "6px",
                    }}
                  />
                  <strong>{item.name}</strong>
                </div>

                <div>
                  <span className="text-muted">x{item.qty}</span>
                </div>

                <span>₹{item.price * item.qty}</span>
              </div>
            );
          })
        ) : (
          <p className="text-center">Your cart is empty.</p>
        )}

        <h4 className="text-end mt-3">Total: ₹{total}</h4>
      </div>

      {/* DELIVERY DETAILS */}
      <div className="card p-3 mb-4 shadow-sm">
        <h5>Delivery Details</h5>
        <input
          className="form-control mb-2"
          placeholder="Full Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          className="form-control mb-2"
          placeholder="Pin Code"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />
        <input
          className="form-control mb-2"
          placeholder="District"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
        />
      </div>

      {/* Payment */}
      <div className="card p-3 mb-4 shadow-sm">
        <h5>Payment Method</h5>
        <select
          className="form-control"
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
        >
          <option value="COD">Cash on Delivery</option>
          <option value="UPI">UPI</option>
          <option value="Card">Credit/Debit Card</option>
        </select>
      </div>

      <button
        className="btn btn-success w-100 py-2 fw-bold"
        onClick={handleConfirmOrder}
      >
        ✅ Confirm Order
      </button>
    </div>
  );
};

export default Checkout;
