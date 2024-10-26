import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  // State to control when buttons are visible
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <div
          className={`transition-opacity duration-2000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
          <div className="space-x-4">
            <button
              onClick={() => navigate("/sign-in")}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/options")}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
