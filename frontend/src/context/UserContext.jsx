import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedCart = localStorage.getItem("cart");
      const storedOrders = localStorage.getItem("orders");

      if (storedUser && storedUser !== "undefined") setUser(JSON.parse(storedUser));
      if (storedCart && storedCart !== "undefined") setCart(JSON.parse(storedCart));
      if (storedOrders && storedOrders !== "undefined") setOrders(JSON.parse(storedOrders));
    } catch (err) {
      console.error("LocalStorage error:", err);
      localStorage.removeItem("user");
      localStorage.removeItem("cart");
      localStorage.removeItem("orders");
    }
  }, []);

  /* ---------------- LOGIN / LOGOUT ---------------- */

  const loginUser = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logoutUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    localStorage.removeItem("orders");
    setUser(null);
    setCart([]);
    setOrders([]);
  };

  /* ---------------- ADD TO CART (with image) ---------------- */

  const addToCart = (product) => {
    const existing = cart.find((item) => item._id === product._id);

    let updatedCart;
    if (existing) {
      updatedCart = cart.map((item) =>
        item._id === product._id ? { ...item, qty: item.qty + 1 } : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...product,
          qty: 1,
          image: product.image ? `/uploads/${product.image.replace("uploads/", "")}` : ""
        }
      ];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${product.name} added to cart 🛒`);
  };

  /* ---------------- PLACE ORDER (send image also) ---------------- */

  const placeOrder = async (address, pincode, district, payment) => {
    const activeUser = user || JSON.parse(localStorage.getItem("user"));

    if (!activeUser || cart.length === 0) {
      alert("⚠️ Please login and add items to cart.");
      return false;
    }

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: activeUser._id,
          username: activeUser.name,
          address,
          pincode,
          district,
          payment,
          items: cart.map((item) => ({
            productId: item._id,
            name: item.name,
            price: item.price,
            quantity: item.qty,
            image: item.image // sending exact path!
          })),
          total: cart.reduce(
            (sum, item) => sum + item.qty * (item.price || 799),
            0
          ),
        }),
      });

      const savedOrder = await response.json();

      if (!response.ok) throw new Error(savedOrder.message || "Order failed");

      const updatedOrders = [...orders, savedOrder];
      setOrders(updatedOrders);
      localStorage.setItem("orders", JSON.stringify(updatedOrders));

      setCart([]);
      localStorage.removeItem("cart");

      return true;
    } catch (err) {
      console.error("Order error:", err);
      alert("❌ Failed to place order: " + err.message);
      return false;
    }
  };

  /* ---------------- FETCH USER ORDERS ---------------- */

  const fetchOrders = async () => {
    const activeUser = user || JSON.parse(localStorage.getItem("user"));
    if (!activeUser) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/orders?userId=${activeUser._id}`
      );

      const data = await response.json();
      if (response.ok) {
        setOrders(data);
        localStorage.setItem("orders", JSON.stringify(data));
      }
    } catch (err) {
      console.error("Fetch orders error:", err);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loginUser,
        logoutUser,
        cart,
        setCart,
        addToCart,
        orders,
        setOrders,
        placeOrder,
        fetchOrders,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
