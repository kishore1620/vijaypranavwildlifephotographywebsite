import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/orders/${id}`)
      .then((res) => setOrder(res.data))
      .catch((err) => console.error("Error loading order:", err));
  }, [id]);

  if (!order)
    return (
      <h3 className="text-center mt-5" style={{ marginTop: "160px" }}>
        Loading order details...
      </h3>
    );

  return (
    <div className="container" style={{ marginTop: "160px" }}>
      <h2 className="fw-bold mb-4 text-warning">📦 Order Details</h2>

      {/* Order Header */}
      <div className="card shadow-sm p-3 mb-4">
        <div className="d-flex justify-content-between">
          <div>
            <h5>
              <strong>Order ID:</strong> {order._id}
            </h5>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleString("en-IN")}
            </p>
          </div>

          <span
            className={`badge p-2 ${
              order.status === "Delivered"
                ? "bg-success"
                : order.status === "Shipped"
                ? "bg-primary"
                : order.status === "Out for Delivery"
                ? "bg-info text-dark"
                : order.status === "Confirmed"
                ? "bg-warning text-dark"
                : "bg-secondary"
            }`}
            style={{ height: "35px" }}
          >
            {order.status || "Pending"}
          </span>
        </div>
      </div>

      {/* Main Layout */}
      <div className="row">
        {/* Left section */}
        <div className="col-lg-8">
          {/* Customer Info */}
          <div className="card shadow-sm p-3 mb-4">
            <h5 className="fw-bold mb-3">👤 Customer Information</h5>
            <p>
              <strong>Name:</strong> {order.username}
            </p>
            <p>
              <strong>Address:</strong> {order.address}
            </p>
            <p>
              <strong>District:</strong> {order.district}
            </p>
            <p>
              <strong>Pincode:</strong> {order.pincode}
            </p>
            <p>
              <strong>Payment:</strong> {order.payment}
            </p>
          </div>

          {/* Order Items */}
          <div className="card shadow-sm p-3 mb-4">
            <h5 className="fw-bold mb-3">🛒 Ordered Items</h5>

            {order.items.map((item) => (
              <div
                key={item.productId}
                className="d-flex justify-content-between border-bottom py-2"
              >
                <div>
                  <strong>{item.name}</strong>
                  <p className="text-muted mb-0">
                    Qty: {item.quantity} × ₹{item.price}
                  </p>
                </div>

                <h6>₹{item.price * item.quantity}</h6>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section (Summary) */}
        <div className="col-lg-4">
          <div className="card shadow-sm p-3">
            <h5 className="fw-bold mb-3">💰 Order Summary</h5>

            <div className="d-flex justify-content-between">
              <span>Subtotal:</span>
              <span>₹{order.total}</span>
            </div>

            <div className="d-flex justify-content-between">
              <span>Delivery:</span>
              <span>FREE</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between fw-bold">
              <span>Total Amount:</span>
              <span>₹{order.total}</span>
            </div>

            <button
              className="btn btn-warning w-100 mt-3"
              onClick={() => (window.location.href = "/orders")}
            >
              Back to My Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
