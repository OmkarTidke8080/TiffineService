import { React, useEffect, useState } from "react";
import { useContext } from "react";
import { Box, Card, Grid, TextField, Typography } from "@mui/material";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";


import Button from "@mui/material/Button";
import { UserSignUpTypeContext } from "../../context/UserSignUpType";
// import Drawer from "@mui/material/Drawer";
import { UserNameContext } from "../../context/UserName.jsx";
import axios from "axios";
import SignInContext from "../../context/SignInType.jsx";

import { useNavigate } from "react-router-dom";

function UpdateProfile() {
  const [openPasswordChange, setOpenPasswordChange] = useState(false);
  const { selectedType, setSelectedType } = useContext(UserSignUpTypeContext);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    // Add other properties as needed
  });
  const [address, setAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    landMark: "",
    village: "",
    taluka: "",
    district: "",
    state: "",
    country: "",
    pincode: "",
  });

  const { userName } = useContext(UserNameContext);
  const { setSignInType } = useContext(SignInContext);

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handlePasswordChangeCheck = (event) => {
    if (event.target.checked) {
      setOpenPasswordChange(true);
    } else {
      setOpenPasswordChange(false);
    }
  };

  const handleUpdateProfile = () => {};
  const navigate = useNavigate();

  const handleUserInputChange = (event) => {
    const { name, value } = event.target;

    // Handle user-specific fields
    if (name === "username" || name === "email") {
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const updateProfile = async () => {
    try {
      const token = localStorage.getItem("jwtToken");

      // Check if token exists
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      const response = await axios.put(
        "http://localhost:8181/auth/profile/update",
        userData, // Send the user data as the request body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use Bearer token for authorization
            "Content-Type": "application/json", // Set content type
          },
        }
      );

      setUserData(response.data);
    } catch (error) {
      console.error("Error updating profile:", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
    }
  };

  const updateAddress = async () => {
    try {
      const token = localStorage.getItem("jwtToken");

      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      console.log("Updating address with data:", address); // Log the address data

      const response = await axios.post(
        "http://localhost:8181/auth/address/update",
        address,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Address updated successfully:", response.data);
      setAddress(response.data); // Ensure response.data has the updated address format
    } catch (error) {
      console.error("Error updating address:", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
    }
  };

  const getUserDetails = async () => {
    try {
      // Correctly retrieve the token from localStorage using the key
      const token = localStorage.getItem("jwtToken");

      // Check if token exists
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      const response = await axios.get(
        "http://localhost:8181/consumer/getDetails",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use Bearer token for authorization
          },
        }
      );

      setUserData({
        username: response.data.user.username || "",
        email: response.data.user.email || "",
      });

      console.log(response.data.user.roles);

      // setSignInType(response.data.)
    } catch (error) {
      console.error("Error fetching user details:", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
    }
  };
  const getUserAddress = async () => {
    try {
      const token = localStorage.getItem("jwtToken");

      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      const response = await axios.get(
        "http://localhost:8181/auth/address/getAddress",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.length > 0) {
        const addr = response.data[0]; // Get the first address object

        setAddress({
          addressLine1: addr.addressLine1 || "",
          addressLine2: addr.addressLine2 || "",
          landMark: addr.landMark || "",
          village: addr.village || "",
          taluka: addr.taluka || "",
          district: addr.district || "",
          state: addr.state || "",
          country: addr.country || "",
          pincode: addr.pincode || "",
        });
      }
    } catch (error) {
      console.error("Error fetching user details:", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  useEffect(() => {
    getUserDetails();
    getUserAddress();
  }, []); // Empty dependency array ensures this runs only once on component mount

  return (
    <>
      <div className="flex flex-col items-center p-5">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate("/home")}
            className="absolute top-4 right-4  text-black bg-white"
          >
            <RxCross1 />
          </button>{" "}
        </div>
        <div className="bg-white shadow-md rounded-lg w-full max-w-lg p-6 mb-4">
          <h2 className="text-lg font-semibold mb-4">User Profile</h2>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="username"
              placeholder="User Name"
              className="border rounded-md p-2 w-full  text-gray-500"
              value={userData.username}
              onChange={(e) => handleUserInputChange(e)}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border rounded-md p-2 w-full  text-gray-500"
              value={userData.email}
              onChange={(e) => handleUserInputChange(e)}
            />
            <div className="flex justify-end">
              <input
                type="checkbox"
                onChange={handlePasswordChangeCheck}
                className="mr-2"
              />
              <label>Reset Password</label>
            </div>
            {openPasswordChange && (
              <div className="flex flex-col gap-4 mt-3 ">
                <h3 className="text-md font-semibold">Reset Password</h3>
                <label
                  htmlFor="currentPassword"
                  className="text-md font-medium"
                >
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    name="oldPassword"
                    placeholder="Old Password"
                    className="border rounded-md p-2 w-full text-gray-500"
                  />
                  <button
                    type="button"
                    onClick={toggleOldPasswordVisibility}
                    className="absolute right-2 top-3"
                  >
                    {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <label htmlFor="newPassword" className="text-md font-medium">
                  New Password
                </label>
                <div className="relative  flex justify-between items-center">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    placeholder="New Password"
                    className="border rounded-md p-2 w-full text-gray-500"
                  />
                  <button
                    type="button"
                    onClick={toggleNewPasswordVisibility}
                    className="absolute right-2 top-3"
                  >
                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div className="flex justify-center  mt-3">
                  <button
                    className="bg-gray-300 text-black py-2 px-4 mx-3 rounded-md"
                    onClick={() => setOpenPasswordChange(false)}
                  >
                    Cancel
                  </button>
                  <button className="bg-blue-500 text-white py-2 mx-3 px-4 rounded-md">
                    Update
                  </button>
                </div>
              </div>
            )}

            {!openPasswordChange ? (
              <button
                onClick={() => {
                  handleUpdateProfile();
                  getUserDetails();
                }}
                className="bg-blue-500 text-white py-2 px-4 rounded-md"
              >
                Update
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
        <h2 className="text-lg font-semibold mb-4">Update Address</h2>
        <div className="bg-white shadow-md rounded-lg w-full max-w-lg p-6">
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="addressLine1" className="text-md font-medium">
                Address Line 1
              </label>
              <input
                type="text"
                name="addressLine1"
                id="addressLine1"
                className="border rounded-md p-2 w-full  text-gray-500"
                value={address.addressLine1}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="addressLine2" className="text-md font-medium">
                Address Line 2
              </label>
              <input
                type="text"
                name="addressLine2"
                id="addressLine2"
                placeholder="Address Line 2"
                className="border rounded-md p-2 w-full  text-gray-500"
                value={address.addressLine2}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="landMark" className="text-md font-medium">
                  Landmark
                </label>
                <input
                  type="text"
                  name="landMark"
                  id="landMark"
                  placeholder="LandMark"
                  className="border rounded-md p-2 w-full  text-gray-500"
                  value={address.landMark}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="village" className="text-md font-medium">
                  Village
                </label>
                <input
                  type="text"
                  name="village"
                  id="village"
                  placeholder="Village"
                  className="border rounded-md p-2 w-full  text-gray-500"
                  value={address.village}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="taluka" className="text-md font-medium">
                  Taluka
                </label>
                <input
                  type="text"
                  name="taluka"
                  id="taluka"
                  placeholder="Taluka"
                  className="border rounded-md p-2 w-full  text-gray-500"
                  value={address.taluka}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="district" className="text-md font-medium">
                  District
                </label>
                <input
                  type="text"
                  name="district"
                  id="district"
                  placeholder="District"
                  className="border rounded-md p-2 w-full  text-gray-500"
                  value={address.district}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="state" className="text-md font-medium">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  placeholder="State"
                  className="border rounded-md p-2 w-full  text-gray-500"
                  value={address.state}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="country" className="text-md font-medium">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  id="country"
                  placeholder="Country"
                  className="border rounded-md p-2 w-full  text-gray-500"
                  value={address.country}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="pincode" className="text-md font-medium">
                Pin Code
              </label>
              <input
                type="text"
                name="pincode"
                id="pincode"
                placeholder="PinCode"
                className="border rounded-md p-2 w-full text-gray-500"
                value={address.pincode}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-center items-center mt-3">
              <button
                onClick={() => navigate("/home")}
                className="bg-gray-300 text-black py-2 mx-3 px-4 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  updateAddress();
                }}
                className="bg-blue-500 text-white mx-3 py-2 px-4 rounded-md"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateProfile;
