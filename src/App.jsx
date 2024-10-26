import React, { useState, useEffect } from "react";
import Home from "./components/Home/Home";
import "./App.css";
import Navbar from "./components/Home/Navbar.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout.jsx";
import SignIn from "./components/Authentication/SignIn.jsx";
import SignUp from "./components/Authentication/SignUp.jsx";
import AboutUs from "./components/Home/AboutUs.jsx";
import UserSignUpType from "./context/UserSignUpType.jsx"; // Existing context provider
import UserName from "./context/UserName.jsx"; // Import the UserName context provider
import Options from "./components/Authentication/Options.jsx";
import { ToastContainer } from "react-toastify";
import UpdateProfile from "./components/Profile/UpdateProfile.jsx";
import Lottie from "lottie-react";
import tiffin from "./assets/tiffin.json";
import LandingPage from "./components/Buttons/LandingPage.jsx";
import Cart from "./components/Home/Cart/Cart.jsx";

function App() {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showAnimation ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#fff",
          }}
        >
          <Lottie
            animationData={tiffin}
            style={{ width: "300px", height: "300px" }}
          />
        </div>
      ) : (
        <>
          <UserName>
            {" "}
            {/* Wrap with UserName context provider */}
            <UserSignUpType>
              {" "}
              {/* Existing provider */}
              <BrowserRouter>
                {/* <Navbar />  */}
                <Routes>
                  <Route path={"/options"} element={<Options />} />
                  <Route path={"/home"} element={<Home />} />
                  <Route path={"/about-us"} element={<AboutUs />} />
                  <Route path={"sign-in"} element={<SignIn />} />
                  <Route path={"sign-up"} element={<SignUp />} />
                  <Route path={"UpdateProfile"} element={<UpdateProfile />} />
                  <Route path={"/cart"} element={<Cart />} />

                  <Route path="/" element={<LandingPage />} />
                </Routes>
              </BrowserRouter>
            </UserSignUpType>
          </UserName>
          <ToastContainer />
        </>
      )}
    </>
  );
}

export default App;
