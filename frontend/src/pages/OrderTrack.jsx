// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const steps = [
//   "Pending",
//   "Confirmed",
//   "Shipped",
//   "Out for Delivery",
//   "Delivered",
// ];

// const OrderTrack = () => {
//   const { id } = useParams();
//   const [order, setOrder] = useState(null);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/api/orders/${id}`)
//       .then((res) => setOrder(res.data))
//       .catch((err) => console.error("Error loading order:", err));
//   }, [id]);

//   if (!order) return <h3 className="text-center mt-5">Loading tracking...</h3>;

//   return (
//     <div className="container" style={{ marginTop: "170px" }}>
//       <h2 className="fw-bold text-warning text-center mb-4">
//         🚚 Order Tracking
//       </h2>

//       <div className="card p-4 rounded-4 shadow-sm">
//         {steps.map((step, index) => {
//           const isActive = steps.indexOf(order.status) >= index;
//           return (
//             <div key={index} className="d-flex align-items-center mb-3">
//               <div
//                 className={`circle ${isActive ? "active" : ""}`}
//               >
//                 {isActive ? "✔" : index + 1}
//               </div>
//               <span className="ms-3 fw-semibold">{step}</span>
//             </div>
//           );
//         })}
//       </div>

//       <style>
//         {`
//         .circle {
//           width: 35px;
//           height: 35px;
//           border-radius: 50%;
//           border: 2px solid gray;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           font-weight: bold;
//         }
//         .active {
//           background-color: #28a745;
//           color: white;
//           border-color: #28a745;
//         }
//         `}
//       </style>
//     </div>
//   );
// };

// export default OrderTrack;
