import React, { useState, useContext } from "react";
import { RxCross1 } from "react-icons/rx";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserNameContext } from "../../context/UserName.jsx";
import googleSymbol from "../../assets/signIn_Assets/google.png";
import facebookSymbol from "../../assets/signIn_Assets/facebook.png";
import { Navigate } from "react-router-dom";
import SignInContext from "../../context/SignInType.jsx";

const SignIn = ({ onClose }) => {
  const { setUserName } = useContext(UserNameContext);
  const {setSignInType} = useContext(SignInContext)


  const [openSignIn, setOpenSignIn] = useState(true);
  const [message, setMessage] = useState("");
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8181/auth/login",
        data
      );

      if (response.status === 200) {
        setUserName(data.username);

        // Get the JWT token from response.data
        const token = response.data;
        console.log("Token : ", token);

        // Optionally store the token (e.g., in localStorage)
        localStorage.setItem("jwtToken", token);

        toast.success("Logged in Successfully");
        setOpenSignIn(false);
        navigate("/home");
      } else {
        toast.error("Log In failed");
      }
    } catch (error) {
      if (error.response) {
        // If there is a response from the server with an error
        setMessage("Error: " + error.response.data);
        toast.error(`Log In failed: ${error.response.data}`);
      } else {
        // If the error occurred while sending the request
        setMessage("Error: " + error.message);
        toast.error(`Log In failed: ${error.message}`);
      }
    }
  };

  const handleClose = () => {
    setOpenSignIn(false);
    navigate("/home");
  };

  return (
    <Modal open={openSignIn} onClose={handleClose}>
      <div className="flex  items-center justify-center min-h-screen w-full">
        <div className="relative w-full max-w-md p-6  bg-white rounded-lg shadow-lg max-h-screen">
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-2 right-2 text-black bg-white"
          >
            <RxCross1 />
          </button>
          <section className="mt-10">
            <div className="flex justify-center">
              <h4 className="text-black text-2xl mb-5">Sign In</h4>
            </div>
            <form id="signInForm" className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label
                  className="mb-3 font-medium outline-none text-gray-900"
                  htmlFor="email"
                >
                  User Name
                </label>
                <input
                  type="text"
                  name="username"
                  value={data.username}
                  onChange={handleInputChange}
                  placeholder="Your UserName"
                  className="w-full mt-1 p-2 border-b-2 border-black bg-white text-black"
                />
              </div>
              <div className="col-span-2">
                <label
                  className="mb-3 font-medium text-gray-900"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  name="password"
                  value={data.password}
                  onChange={handleInputChange}
                  type="password"
                  placeholder="Your Password"
                  className="w-full mt-1 p-2 border-b-2 border-black bg-white text-black"
                />
              </div>
            </form>

            <div className="flex justify-between mt-5 ">
              <div>
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="Bike"
                />
                <label className="text-black" for="vehicle1">
                  {" "}
                  Remember Me
                </label>
              </div>

              <div>
                {/* <h2>Forgot Password?</h2> */}
                <a
                  className="underline underline-offset-8 hover:text-blue-500	"
                  href=""
                >
                  Forgot Password?
                </a>
              </div>
            </div>
            <div className="flex justify-center mt-5">
              <button
                type="submit"
                form="signInForm" // Corrected form ID
                onClick={handleSubmit}
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-semibold text-white rounded-lg w-5/6 h-8"
              >
                Sign In
              </button>
            </div>

            <div className="mt-3 h-1 ">
              <hr />
            </div>

            <div className="flex justify-center mt-3">
              <h3>Or Sign In with </h3>
            </div>

            <div className="symbols flex justify-center mt-5 ">
              <img
                src={googleSymbol}
                alt=""
                height={20}
                width={20}
                className="mx-1 hover:cursor-pointer"
              />
              <img
                src={facebookSymbol}
                alt=""
                height={20}
                width={20}
                className="mx-1 hover:cursor-pointer"
              />
            </div>

            <div className="mt-3 h-1 ">
              <hr />
            </div>

            <div className="flex justify-center mt-2">
              <h3>
                Don't have account?{" "}
                <a
                  onClick={() => {
                    navigate("/options");
                  }}
                  className="text-black	hover:text-blue-600 cursor-pointer font-semibold"
                >
                  SignUp Now
                </a>{" "}
              </h3>
            </div>
          </section>
        </div>
      </div>
    </Modal>
  );
};

export default SignIn;
