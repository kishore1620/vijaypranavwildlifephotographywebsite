// src/pages/Orders.jsx
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

const Orders = () => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Status colors
  const statusStyles = {
    Pending: { backgroundColor: "#ffc107", color: "#000" },
    Confirmed: { backgroundColor: "#0d6efd", color: "#fff" },
    Shipped: { backgroundColor: "#6f42c1", color: "#fff" },
    "Out for Delivery": { backgroundColor: "#ff9800", color: "#fff" },
    Delivered: { backgroundColor: "#28a745", color: "#fff" },
  };

  // Fetch user's orders
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?._id) return;

      try {
        const res = await axios.get(
          `http://localhost:5000/api/orders?userId=${user._id}`
        );
        setOrders(res.data);
      } catch (err) {
        console.error("❌ Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="container text-center" style={{ marginTop: "150px" }}>
        <h3>Please login to view your orders.</h3>
      </div>
    );
  }

  return (
    <div className="container mb-5" style={{ marginTop: "180px" }}>
      <h2 className="text-center mb-4 text-warning fw-bold">📦 My Orders</h2>

      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary"></div>
          <p className="mt-2">Loading orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="alert alert-info text-center mt-4">
          No orders found.
        </div>
      ) : (
        <div className="accordion" id="ordersAccordion">
          {orders.map((order, index) => (
            <div
              className="accordion-item mb-3 shadow-sm rounded-3 border-0"
              key={order._id}
            >
              {/* HEADER */}
              <h2 className="accordion-header" id={`heading-${index}`}>
                <button
                  className="accordion-button collapsed fw-bold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse-${index}`}
                >
                  <div className="d-flex flex-column">
                    <span>Order #{index + 1}</span>
                    <small className="text-muted">
                      {new Date(order.createdAt).toLocaleString("en-IN")}
                    </small>
                  </div>

                  <span
                    className="badge ms-auto px-3 py-2"
                    style={{
                      ...statusStyles[order.status || "Pending"],
                      fontSize: "13px",
                    }}
                  >
                    {order.status}
                  </span>
                </button>
              </h2>

              {/* BODY */}
              <div
                id={`collapse-${index}`}
                className="accordion-collapse collapse"
                data-bs-parent="#ordersAccordion"
              >
                <div className="accordion-body">
                  <p>
                    <strong>Address:</strong> {order.address}, {order.district},{" "}
                    {order.pincode}
                  </p>

                  <p>
                    <strong>Payment:</strong> {order.payment}
                  </p>

                  <h5 className="mt-3 fw-bold">Total: ₹{order.total}</h5>

                  <hr />

                  <h6 className="fw-semibold">Ordered Items:</h6>
                  <ul className="list-group">
                    {order.items.map((item) => {
                      const imageURL = item.image
                        ? `${BASE_URL}/${item.image.replace(/^\//, "")}`
                        : "https://via.placeholder.com/60";

                      return (
                        <li
                          key={item.productId}
                          className="list-group-item d-flex align-items-center justify-content-between"
                        >
                          {/* image + name */}
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={imageURL}
                              alt={item.name}
                              style={{
                                width: "60px",
                                height: "60px",
                                objectFit: "cover",
                                borderRadius: "6px",
                              }}
                              onError={(e) =>
                                (e.target.src =
                                  "https://via.placeholder.com/60")
                              }
                            />
                            <strong>{item.name}</strong>
                          </div>

                          <small className="text-muted">
                            x{item.quantity}
                          </small>

                          <span>₹{item.price * item.quantity}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
