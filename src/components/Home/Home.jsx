import React, { useState, useEffect } from "react";
import tiffin from "../../assets/FoodImage.jpg";
import { ScaleLoader } from "react-spinners";
import Plans from "./Plans";
import SelectedPlans from "./SelectedPlans.jsx";
import "./Home.css";
import Navbar from "./Navbar.jsx";
import { useNavigate } from "react-router-dom";
import foodBag from "../../assets/food-bag.png";
import foodMenu from "../../assets/hotel-menu.png";

function Home() {
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ScaleLoader color="black" loading={loading} />
        </div>
      ) : (
        <>
          <Navbar />

          <div className="home-background w-full sm:block md:flex h-auto md:h-96 border-blue-500 rounded mb-10">
            <div className="w-1/2 md:w-1/2 h-full flex flex-col mt-40  items-center text-black text-left">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-center">
                  Welcome to Home Tiffin Services!!!
                </h1>
                <h3 className="text-xl md:text-2xl mt-4 text-center">
                  Your delicious meals are just a click away.
                </h3>
              </div>
              <div className="searchBar mt-5 h-20 ">
                <div class="max-w-md mx-auto">
                  <div class="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                    <div class="grid place-items-center h-full w-12 text-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>

                    <input
                      class="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                      type="text"
                      id="search"
                      placeholder="Search something.."
                    />
                  </div>
                </div>
              </div>
              <div>
                <button>Order Now</button>
              </div>
            </div>
            <img
              className="h-40 sm:h-64 md:h-full w-full md:w-1/2 object-cover ml-0 md:ml-2 rounded"
              src={tiffin}
              alt="Tiffin"
            />
          </div>

          <section className="mt-10 mb-30">
            <Plans setSelectedPlan={setSelectedPlan} />
          </section>

          {selectedPlan && (
            <section className="mt-20">
              <SelectedPlans
                selectPlan={selectedPlan}
                onAddToCart={handleAddToCart}
              />
            </section>
          )}

          
        </>
      )}
    </>
  );
}

export default Home;
