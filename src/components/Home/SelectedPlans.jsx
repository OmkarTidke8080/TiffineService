import React, { useState } from "react";
import Thali from "../../assets/FoodImage.jpg";
import { toast, ToastContainer } from "react-toastify";

function SelectedPlans({ selectPlan, onAddToCart }) {
  const [selectedItem, setSelectedItem] = useState("");

  const handleAddToCart = (item) => {
    if (item) {
      onAddToCart(item); 
      toast.success(`${item} added successfully`);
    } else {
      toast.error("Please select an item first!");
    }
  };

  const menuItems = [
    { label: "Single Order", price: "90 Rs" },
    { label: "Weekly Plan", price: "550 Rs" },
    { label: "Monthly Plan", price: "2400 Rs" },
  ];

  return (
    <>
      <div className="flex justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectPlan}</h2>
      </div>
      <div className="w-full h-auto flex mb-10">
        {["Veg", "Non Veg"].map((type, index) => (
          <div
            key={index}
            className={`w-1/2 border border-solid m-5  border-black`}
          >
            <div className="flex justify-around mt-3">
              <h2
                className={`h-8 w-1/5 text-center ${
                  type === "Veg" ? "bg-green-400" : "bg-red-400"
                } text-white border rounded`}
              >
                {type}
              </h2>
            </div>
            <div className="flex mt-10">
              <div className="w-1/2">
                <img
                  src={Thali}
                  alt=""
                  className="h-72 w-72 rounded-full object-cover ml-2"
                />
              </div>
              <div className="w-1/2 mt-5 mb-5">
                <div
                  className={`p-5 rounded-lg shadow-md mr-5 ${
                    type === "Veg" ? "bg-green-300" : "bg-red-500"
                  }`}
                >
                  <h2 className="text-3xl font-bold text-center mb-4">
                    Ingredients
                  </h2>
                  {/* Ingredients List */}
                  {["Chapati", "Veggie", "Dal", "Rice", "Papad"].map(
                    (ingredient, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center border-gray-300 py-2"
                      >
                        <h1 className="text-xl font-semibold">{ingredient}</h1>
                        <h1 className="ml-10 text-lg">
                          {ingredient === "Chapati"
                            ? "3"
                            : ingredient === "Veggie"
                            ? "2"
                            : ingredient === "Rice"
                            ? "150 grams"
                            : "150 ml"}
                        </h1>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="h-32 flex justify-center items-center">
              {menuItems.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex shadow-xl shadow-green-200 justify-center items-center border-black rounded-2xl cursor-pointer w-44 m-5 h-20 ${
                    type === "Veg" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  <div className="font-semibold">
                    <button
                      onClick={() => {
                        setSelectedItem(item.label);
                        handleAddToCart(item.label); // Call with the selected item
                      }}
                    >
                      <h1>{item.label}</h1>
                      <div className="flex justify-center">
                        <h1>{item.price}</h1>
                      </div>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <ToastContainer />
    </>
  );
}

export default SelectedPlans;
