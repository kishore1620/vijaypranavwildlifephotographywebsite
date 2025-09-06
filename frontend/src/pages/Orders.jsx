// src/pages/Orders.jsx
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const Orders = () => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch orders when page loads
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
      <div className="container text-center my-5">
        <h3>Please login to view your orders.</h3>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4" style={{ marginTop: "160px" }}>
        📦 My Orders
      </h2>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
          <p>Loading orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="alert alert-info text-center">No orders found.</div>
      ) : (
        <div className="accordion" id="ordersAccordion">
          {orders.map((order, index) => (
            <div className="accordion-item mb-3" key={order._id}>
              <h2 className="accordion-header" id={`heading-${index}`}>
                <button
                  className="accordion-button collapsed fw-bold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse-${index}`}
                  aria-expanded="false"
                  aria-controls={`collapse-${index}`}
                >
                  Order #{index + 1} - {new Date(order.createdAt).toLocaleString()}
                </button>
              </h2>
              <div
                id={`collapse-${index}`}
                className="accordion-collapse collapse"
                aria-labelledby={`heading-${index}`}
                data-bs-parent="#ordersAccordion"
              >
                <div className="accordion-body">
                  <p><strong>Address:</strong> {order.address}, {order.district}, {order.pincode}</p>
                  <p><strong>Payment:</strong> {order.payment}</p>
                  <p><strong>Total:</strong> ₹{order.total}</p>

                  <h6>Items:</h6>
                  <ul className="list-group">
                    {order.items.map((item) => (
                      <li
                        key={item.productId}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        {item.name} <small className="text-muted">x{item.quantity}</small>
                        <span>₹{item.price * item.quantity}</span>
                      </li>
                    ))}
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
