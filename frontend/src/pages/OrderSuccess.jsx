import React, { useEffect } from "react";
import confetti from "canvas-confetti";

const OrderSuccess = () => {

  // 🎊 Confetti Animation
  useEffect(() => {
    const duration = 2 * 1000; // 2 seconds
    const animationEnd = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{ height: "80vh", animation: "fadeIn 1s ease-in-out"  , marginTop: "100px" }}
    >

      {/* ✅ Tick Animation */}
      <div style={{ width: "120px", height: "120px" }}>
        <svg
          viewBox="0 0 52 52"
          className="checkmark"
          style={{ width: "100%", height: "100%" }}
        >
          <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
          <path className="checkmark__check" d="M14 27l7 7 16-16" fill="none" />
        </svg>
      </div>

      {/* 🎉 Success Messages */}
      <h1 className="text-success fw-bold mb-3">🎉Your Order is Confirmed!</h1>
      <h4 className="text-secondary">Thanks for visiting us ❤️</h4>

      {/* 🔘 Button */}
      <button
        className="btn btn-warning mt-4 px-4"
        onClick={() => (window.location.href = "/orders")}
      >
        Go to My Orders
      </button>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .checkmark {
          stroke-width: 2;
          stroke: #4bb543;
          stroke-miterlimit: 10;
          border-radius: 50%;
          display: block;
          stroke-linecap: round;
          animation: scaleIn 0.5s ease-in-out;
        }

        @keyframes scaleIn {
          0% { transform: scale(0.3); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .checkmark__circle {
          stroke-dasharray: 166;
          stroke-dashoffset: 166;
          stroke-width: 3;
          stroke: #4bb543;
          fill: none;
          animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }

        .checkmark__check {
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: stroke 0.4s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards;
        }

        @keyframes stroke {
          100% { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
};

export default OrderSuccess;
