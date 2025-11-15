// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AdminOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");

//   // Fetch all orders
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/orders/all")
//       .then((res) => {
//         setOrders(res.data);
//         setFiltered(res.data);
//       })
//       .catch((err) => console.error("Error loading orders:", err));
//   }, []);

//   // Search by name / order id
//   const handleSearch = (value) => {
//     setSearch(value);
//     const s = value.toLowerCase();

//     const newData = orders.filter(
//       (o) =>
//         o._id.toLowerCase().includes(s) ||
//         o.username.toLowerCase().includes(s)
//     );

//     setFiltered(newData);
//   };

//   // Filter by status
//   const handleFilterStatus = (value) => {
//     setStatusFilter(value);
//     if (value === "All") {
//       setFiltered(orders);
//     } else {
//       setFiltered(orders.filter((o) => o.status === value));
//     }
//   };

//   // Update order status
//   const updateStatus = (orderId, newStatus) => {
//     axios
//       .put(`http://localhost:5000/api/orders/status/${orderId}`, {
//         status: newStatus,
//       })
//       .then(() => {
//         const updatedOrders = orders.map((o) =>
//           o._id === orderId ? { ...o, status: newStatus } : o
//         );
//         setOrders(updatedOrders);

//         if (statusFilter === "All") {
//           setFiltered(updatedOrders);
//         } else {
//           setFiltered(updatedOrders.filter((o) => o.status === statusFilter));
//         }
//       })
//       .catch((err) => console.error("Error updating status:", err));
//   };

//   // Delete order
//   const deleteOrder = (orderId) => {
//     if (!window.confirm("Are you sure you want to delete this order?")) return;

//     axios
//       .delete(`http://localhost:5000/api/orders/${orderId}`)
//       .then(() => {
//         const updatedList = orders.filter((o) => o._id !== orderId);
//         setOrders(updatedList);

//         if (statusFilter === "All") {
//           setFiltered(updatedList);
//         } else {
//           setFiltered(updatedList.filter((o) => o.status === statusFilter));
//         }
//       })
//       .catch((err) => console.error("Error deleting order:", err));
//   };

//   return (
//     <div className="container" style={{ marginTop: "160px" }}>
//       <h2 className="fw-bold text-center text-warning mb-4">
//         🛠️ Admin Orders Dashboard
//       </h2>

//       {/* Search + Filter */}
//       <div className="d-flex gap-3 mb-3">
//         <input
//           className="form-control"
//           placeholder="Search by name or order ID..."
//           value={search}
//           onChange={(e) => handleSearch(e.target.value)}
//         />

//         <select
//           className="form-select"
//           value={statusFilter}
//           onChange={(e) => handleFilterStatus(e.target.value)}
//         >
//           <option value="All">All Orders</option>
//           <option value="Pending">Pending</option>
//           <option value="Confirmed">Confirmed</option>
//           <option value="Shipped">Shipped</option>
//           <option value="Out for Delivery">Out for Delivery</option>
//           <option value="Delivered">Delivered</option>
//         </select>
//       </div>

//       {/* Table */}
//       <table className="table table-bordered table-striped table-hover mt-3">
//         <thead className="table-dark">
//           <tr>
//             <th>Product</th>
//             <th>User</th>
//             <th>Total</th>
//             <th>Date</th>
//             <th>Status</th>
//             <th>Update</th>
//             <th>Delete</th>
//             <th>View</th>
//           </tr>
//         </thead>

//         <tbody>
//           {filtered.length === 0 ? (
//             <tr>
//               <td colSpan="8" className="text-center">
//                 No orders found.
//               </td>
//             </tr>
//           ) : (
//             filtered.map((order) => (
//               <tr key={order._id}>
                
//                 {/* ⭐ Product image + name col */} 
//                 <td>
//                   {order.items?.length > 0 ? (
//                     <div className="d-flex align-items-center gap-2">
//                       <img
//                         src={
//                           order.items[0].image
//                             ? `http://localhost:5000/${order.items[0].image}`
//                             : "https://via.placeholder.com/40"
//                         }
//                         alt="Product"
//                         style={{
//                           width: "40px",
//                           height: "40px",
//                           borderRadius: "6px",
//                           objectFit: "cover",
//                         }}
//                       />

//                       <div>
//                         <strong>{order.items[0].name}</strong>
//                         {order.items.length > 1 && (
//                           <div className="text-muted small">
//                             +{order.items.length - 1} more
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   ) : (
//                     <span className="text-muted">No items</span>
//                   )}
//                 </td>

//                 <td>{order.username}</td>
//                 <td>₹{order.total}</td>
//                 <td>{new Date(order.createdAt).toLocaleString()}</td>

//                 {/* Status Badge */}
//                 <td>
//                   <span
//                     className={`badge px-3 py-2 ${
//                       order.status === "Delivered"
//                         ? "bg-success"
//                         : order.status === "Pending"
//                         ? "bg-warning text-dark"
//                         : order.status === "Shipped"
//                         ? "bg-primary"
//                         : "bg-info"
//                     }`}
//                   >
//                     {order.status}
//                   </span>
//                 </td>

//                 {/* Update Status Dropdown */}
//                 <td>
//                   <select
//                     className="form-select"
//                     value={order.status}
//                     onChange={(e) => updateStatus(order._id, e.target.value)}
//                   >
//                     <option>Pending</option>
//                     <option>Confirmed</option>
//                     <option>Shipped</option>
//                     <option>Out for Delivery</option>
//                     <option>Delivered</option>
//                   </select>
//                 </td>

//                 {/* Delete */}
//                 <td>
//                   <button
//                     className="btn btn-danger btn-sm"
//                     onClick={() => deleteOrder(order._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>

//                 {/* View */}
//                 <td>
//                   <a
//                     href={`/order/${order._id}`}
//                     className="btn btn-primary btn-sm"
//                   >
//                     View
//                   </a>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminOrders;
