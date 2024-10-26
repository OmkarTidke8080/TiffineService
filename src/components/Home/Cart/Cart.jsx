import React, { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { IconButton } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Thali from "../../../assets/FoodImage.jpg";

function Cart() {
  const [counts, setCounts] = useState({});
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { items } = location.state || { items: [] };
    setItems(items);
  }, [location.state]);

  const onClose = () => {
    navigate("/home");
  };

  const increment = (type) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [type]: (prevCounts[type] || 0) + 1,
    }));
  };

  const decrement = (type) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [type]: Math.max(0, (prevCounts[type] || 0) - 1),
    }));
  };

  const clearCart = () => {
    setCounts({});
  };

  const total = Object.keys(counts).reduce((acc, type) => {
    return acc + counts[type] * 90;
  }, 0);

  return (
    <div className="container mx-auto p-6">
      <div>
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <IconButton
          onClick={onClose}
          style={{ position: "absolute", top: "10px", right: "10px" }}
        >
          <RxCross1 />
        </IconButton>
      </div>

      <div className="flex justify-center">
        <div className="bg-white shadow-md rounded-lg p-4 w-2/4">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b pb-4 mb-4"
            >
              <img
                src={Thali}
                alt="Food Item"
                className="w-20 h-20 rounded-lg"
              />
              <div className="flex-1 mx-4">
                <h2 className="text-lg font-semibold">{item}</h2>
                <span className="text-gray-800 font-semibold">Rs 90</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => decrement(item)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full transition duration-200"
                >
                  -
                </button>
                <span className="text-lg font-semibold">
                  {counts[item] || 0}
                </span>
                <button
                  onClick={() => increment(item)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full transition duration-200"
                >
                  +
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between mt-4 font-semibold">
            <span>Total:</span>
            <span className="text-lg">Rs {total}</span>
          </div>

          <div className="flex justify-center mt-4 space-x-4">
            <button
              onClick={clearCart}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
            >
              Clear Cart
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-200">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
