import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:5000";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Fetch all Orders
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/orders/all")
      .then((res) => {
        setOrders(res.data);
        setFiltered(res.data);
      })
      .catch((err) => {
        console.error("Error loading orders:", err);
        toast.error("Failed to load orders!");
      });
  }, []);

  // Search Filter
  const handleSearch = (value) => {
    setSearch(value);
    const s = value.toLowerCase();

    const newData = orders.filter(
      (o) =>
        o._id.toLowerCase().includes(s) ||
        o.username.toLowerCase().includes(s)
    );

    setFiltered(newData);
  };

  // Status Filter
  const handleFilterStatus = (value) => {
    setStatusFilter(value);
    if (value === "All") {
      setFiltered(orders);
    } else {
      setFiltered(orders.filter((o) => o.status === value));
    }
  };

  // Update status
  const updateStatus = (orderId, newStatus) => {
    axios
      .put(`http://localhost:5000/api/orders/status/${orderId}`, {
        status: newStatus,
      })
      .then(() => {
        const updatedOrders = orders.map((o) =>
          o._id === orderId ? { ...o, status: newStatus } : o
        );

        setOrders(updatedOrders);

        if (statusFilter === "All") {
          setFiltered(updatedOrders);
        } else {
          setFiltered(updatedOrders.filter((o) => o.status === statusFilter));
        }

        toast.success("Status Updated Successfully!");
      })
      .catch((err) => {
        console.error("Error updating status:", err);
        toast.error("Failed to update status!");
      });
  };

  // Delete order
  const deleteOrder = (orderId) => {
    if (!window.confirm("Are you sure?")) return;

    axios
      .delete(`http://localhost:5000/api/orders/${orderId}`)
      .then(() => {
        const updatedList = orders.filter((o) => o._id !== orderId);

        setOrders(updatedList);

        if (statusFilter === "All") {
          setFiltered(updatedList);
        } else {
          setFiltered(updatedList.filter((o) => o.status === statusFilter));
        }

        toast.success("Order Deleted Successfully!");
      })
      .catch((err) => {
        console.error("Error deleting order:", err);
        toast.error("Failed to delete order!");
      });
  };

  return (
    <div className="container" style={{ marginTop: "10px" }}>
      <h2 className="fw-bold text-center text-warning mb-4">
        🛠️ Admin Orders Dashboard
      </h2>

      {/* Search + Filter */}
      <div className="d-flex gap-3 mb-3">
        <input
          className="form-control"
          placeholder="Search by name or order ID..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />

        <select
          className="form-select"
          value={statusFilter}
          onChange={(e) => handleFilterStatus(e.target.value)}
        >
          <option value="All">All Orders</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Shipped">Shipped</option>
          <option value="Out for Delivery">Out for Delivery</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      {/* Orders Table */}
      <table className="table table-bordered table-striped table-hover mt-3">
        <thead className="table-dark">
          <tr>
            <th>Product</th>
            <th>User</th>
            <th>Total</th>
            <th>Date</th>
            <th>Status</th>
            <th>Update</th>
            <th>Delete</th>
            <th>View</th>
          </tr>
        </thead>

        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">
                No orders found.
              </td>
            </tr>
          ) : (
            filtered.map((order) => {
              const item = order.items[0]; // show first product
              const imageURL = item?.image
                ? `${BASE_URL}/${item.image.replace(/^\//, "")}`
                : "https://via.placeholder.com/50";

              return (
                <tr key={order._id}>
                  {/* PRODUCT IMAGE + NAME */}
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={imageURL}
                        alt={item?.name}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "6px",
                        }}
                      />
                      <div>
                        <strong>{item?.name}</strong>
                        {order.items.length > 1 && (
                          <small className="text-muted d-block">
                            +{order.items.length - 1} more
                          </small>
                        )}
                      </div>
                    </div>
                  </td>

                  <td>{order.username}</td>
                  <td>₹{order.total}</td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>

                  {/* Status Badge */}
                  <td>
                    <span
                      className={`badge px-3 py-2 ${
                        order.status === "Delivered"
                          ? "bg-success"
                          : order.status === "Pending"
                          ? "bg-warning text-dark"
                          : order.status === "Shipped"
                          ? "bg-primary"
                          : "bg-info"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  {/* Update Dropdown */}
                  <td>
                    <select
                      className="form-select"
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteOrder(order._id)}
                    >
                      Delete
                    </button>
                  </td>

                  <td>
                    <a
                      href={`/order/${order._id}`}
                      className="btn btn-primary btn-sm"
                    >
                      View
                    </a>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
