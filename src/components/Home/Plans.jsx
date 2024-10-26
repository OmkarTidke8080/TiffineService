import React from "react";
import Thali from "../../assets/FoodImage.jpg";

function Plans({ setSelectedPlan }) {
  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <>
      <div className="flex justify-center ">
        <h1 className="text-4xl font-bold text-center text-gray-800 my-6">
          Our Plans
        </h1>
      </div>

      <section className="w-full h-auto mb-20">
        <div className="flex flex-col sm:flex-row justify-center">
          <div className="w-full sm:w-1/2 lg:w-1/3 m-5 h-40 sm:h-60 rounded-xl border-2 border-solid border-black">
            <div className="flex justify-center items-center h-full">
              <img src={Thali} alt="Thali" className="h-full w-full rounded" />
            </div>
            <div className="flex justify-center mt-5">
              <button
                onClick={() => handlePlanSelect("Regular Plan")}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
              >
                Regular Plan
              </button>
            </div>
          </div>

          <div className="w-full sm:w-1/2 lg:w-1/3 m-5 h-40 sm:h-60 rounded-xl border-2 border-solid border-black">
            <div className="flex justify-center items-center h-full">
              <img src={Thali} alt="Thali" className="h-full w-full rounded" />
            </div>
            <div className="flex justify-center mt-5">
              <button
                onClick={() => handlePlanSelect("Premium Plan")}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
              >
                Premium Plan
              </button>
            </div>
          </div>

          <div className="w-full sm:w-1/2 lg:w-1/3 m-5 h-40 sm:h-60 rounded-xl border-2 border-solid border-black">
            <div className="flex justify-center items-center h-full">
              <img src={Thali} alt="Thali" className="h-full w-full rounded" />
            </div>
            <div className="flex justify-center mt-5">
              <button
                onClick={() => handlePlanSelect("Super Premium Plan")}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
              >
                Super Premium Plan
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Plans;
