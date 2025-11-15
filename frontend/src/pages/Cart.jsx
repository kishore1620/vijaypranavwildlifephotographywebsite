// src/pages/Cart.jsx
import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:5000";

const Cart = () => {
  const { cart, setCart } = useContext(UserContext);
  const navigate = useNavigate();

  // Increase qty
  const increaseQty = (id) => {
    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, qty: item.qty + 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Decrease qty
  const decreaseQty = (id) => {
    const updatedCart = cart
      .map((item) =>
        item._id === id ? { ...item, qty: Math.max(item.qty - 1, 1) } : item
      )
      .filter((item) => item.qty > 0);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Remove item
  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Total
  const total = cart.reduce(
    (sum, item) => sum + item.qty * (item.price || 799),
    0
  );

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4" style={{ marginTop: "170px" }}>
        🛒 Your Cart
      </h2>

      {cart.length === 0 ? (
        <div className="alert alert-warning text-center">
          Your cart is empty.
        </div>
      ) : (
        <div className="card shadow-lg p-4">
          <div className="table-responsive">
            <table className="table align-middle text-center">
              <thead className="table-dark">
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {cart.map((item) => {
                  // Make sure image path is correct
                  const imageURL = item.image
                    ? `${BASE_URL}/${item.image.replace(/^\//, "")}`
                    : "https://via.placeholder.com/60";

                  return (
                    <tr key={item._id}>
                      {/* PRODUCT (Image + name) */}
                      <td className="text-start d-flex align-items-center gap-2">
                        <img
                          src={imageURL}
                          alt={item.name}
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                            borderRadius: "6px",
                          }}
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/60";
                          }}
                        />
                        <strong>{item.name}</strong>
                      </td>

                      {/* PRICE */}
                      <td>₹{item.price || 799}</td>

                      {/* QUANTITY BUTTONS */}
                      <td>
                        <div className="btn-group" role="group">
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => decreaseQty(item._id)}
                          >
                            −
                          </button>
                          <span className="px-3 d-flex align-items-center">
                            {item.qty}
                          </span>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => increaseQty(item._id)}
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* SUBTOTAL */}
                      <td>₹{(item.price || 799) * item.qty}</td>

                      {/* REMOVE BUTTON */}
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => removeFromCart(item._id)}
                        >
                          ❌ Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>

          {/* TOTAL + CHECKOUT BUTTON */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <h4>Total: ₹{total}</h4>
            <button
              className="btn btn-success fw-bold px-4"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
