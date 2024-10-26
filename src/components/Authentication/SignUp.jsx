import { React, useContext, useState } from "react";

import { Box, Card, Grid, TextField, Typography } from "@mui/material";
import { UserSignUpTypeContext } from "../../context/UserSignUpType";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import validateSignUpForm from "../Utils/SignUpValidations.jsx";
import { toast, ToastContainer } from "react-toastify";
import validateRestSignUpForm from "../Utils/RestSignUpValidate.jsx";

const SignUp = () => {
  const navigate = useNavigate();

  const { selectedType, setSelectedType } = useContext(UserSignUpTypeContext);
  const [errors, setErrors] = useState({});

  const [message, setMessage] = useState("");
  const [data, setData] = useState({
    name: "",
    dob: "",
    gender: "",
    phone: "",
    user: {
      username: "",
      email: "",
      password: "",
    },
    address: [
      {
        name: "",
        addressLine1: "",
        addressLine2: "",
        landMark: "",
        village: "",
        taluka: "",
        district: "",
        state: "",
        country: "",
        pincode: "",
      },
    ],
  });
  const [restdata, setRestData] = useState({
    name: "",
    dob: "",
    phone: "",
    gender: "",
    profPic: "",
    user: {
      username: "",
      email: "",
      password: "",
    },
    address: [
      {
        name: "",
        addressLine1: "",
        addressLine2: "",
        landMark: "",
        village: "",
        taluka: "",
        district: "",
        state: "",
        country: "",
        pincode: "",
      },
    ],
    bussiness_name: "",
    bussiness_address: [
      {
        name: "",
        addressLine1: "",
        addressLine2: "",
        landMark: "",
        village: "",
        taluka: "",
        district: "",
        state: "",
        country: "",
        pincode: "",
      },
    ],
  });

  // Handle Input Change for nested structure
  const handleRestUserInputChange = (event) => {
    const { name, value } = event.target;
    const keys = name.split(".");

    setRestData((prevState) => {
      const newData = { ...prevState };
      let temp = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        temp = temp[keys[i]];
      }

      temp[keys[keys.length - 1]] = value || null;
      return newData;
    });
  };

  const Genders = ["Male", "Female", "Others"];

  const handleUserInputChange = (event) => {
    const { name, value } = event.target;

    // Check if the field is part of the 'user' or 'address' object
    if (name.startsWith("user.")) {
      const userField = name.split(".")[1]; // e.g., "email"
      setData((prevData) => ({
        ...prevData,
        user: {
          ...prevData.user,
          [userField]: value,
        },
      }));
    } else if (name.startsWith("address.")) {
      const addressField = name.split(".")[1]; // e.g., "addressLine1"
      setData((prevData) => ({
        ...prevData,
        address: [
          {
            ...prevData.address[0],
            [addressField]: value,
          },
        ],
      }));
    } else {
      // Handle non-nested fields (e.g., name, phone)
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    const validationErrors = validateSignUpForm(data);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      Object.values(validationErrors).forEach((errorMsg) => {
        toast.error(errorMsg);
      });
      return;
    }

    try {
      // Send data to the backend
      const response = await axios.post(
        "http://localhost:8181/auth/consumer/signup",
        data
      );

      // Show success message
      navigate("/sign-in");
      toast.success("Sign up successful!");
      setMessage("Sign up successful");
      setErrors({});
    } catch (error) {
      setMessage("Error: " + (error.response?.data?.message || error.message));

      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err) => {
          toast.error(`Error: ${err.msg}`); // Show each server-side error
        });
      } else {
        // Show general error message if specific errors are not available
        toast.error("Something went wrong!");
      }
    }
  };

  const handleRestUserSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateRestSignUpForm(restdata); // Get validation errors

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      Object.keys(validationErrors).forEach((key) => {
        toast.error(validationErrors[key]);
      });
      return; // Stop form submission if validation fails
    }

    try {
      const response = await axios.post(
        "http://localhost:8181/auth/producer/signup",
        restdata
      );
      toast.success("Sign Up successful");
      setMessage(response.data.message || "Sign up successful");
      navigate("/home");
      setErrors({});
    } catch (error) {
      setMessage("Error: " + (error.response?.data?.message || error.message));
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err) => {
          toast.error(`Error: ${err.msg}`);
        });
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  const handleBClose = () => {
    console.log(restdata);
  };

  const handleClose = () => {
    console.log(data);
    navigate("/home");
  };

  const handleSignInClick = () => {
    navigate("/sign-in");
  };
  return (
    <>
      <ToastContainer></ToastContainer>
      {selectedType === "Customer" ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Card sx={{ width: { xs: "60vw", sm: "50vw" }, p: 5, mb: 3 }}>
            <Typography variant="h5" sx={{ mb: 5 }}>
              User Details
            </Typography>
            <Box
              sx={{
                width: "40vw",
                gap: 3,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Consumer Name */}
              <TextField
                name="name"
                value={data.name}
                onChange={handleUserInputChange}
                fullWidth
                variant="outlined"
                label="Full Name"
              />

              {/* Date of Birth */}
              <TextField
                name="dob"
                value={data.dob}
                onChange={handleUserInputChange}
                fullWidth
                variant="outlined"
                label="Date of Birth"
                type="date"
                InputLabelProps={{ shrink: true }}
              />

              {/* Gender */}
              {/* <TextField
                name="gender"
                value={data.gender}
                onChange={handleUserInputChange}
                fullWidth
                variant="outlined"
                label="Gender"
              /> */}
              <label htmlFor="gender">Gender</label>
              <select
                name="gender"
                value={data.gender}
                onChange={handleUserInputChange}
              >
                <option value="">Select Gender</option>
                {Genders.map((gender, index) => (
                  <option key={index} value={gender}>
                    {gender} {/* This will display the gender name */}
                  </option>
                ))}
              </select>

              {/* Phone */}
              <TextField
                type="number"
                name="phone"
                value={data.phone}
                onChange={handleUserInputChange}
                fullWidth
                variant="outlined"
                label="Phone"
              />

              {/* Username */}
              <TextField
                name="user.username"
                value={data.user.username}
                onChange={handleUserInputChange}
                fullWidth
                variant="outlined"
                label="Username"
              />

              {/* Email */}
              <TextField
                name="user.email"
                value={data.user.email}
                onChange={handleUserInputChange}
                fullWidth
                variant="outlined"
                label="Email"
              />

              {/* Password */}
              <TextField
                name="user.password"
                value={data.user.password}
                onChange={handleUserInputChange}
                fullWidth
                variant="outlined"
                label="Password"
                type="password"
              />

              {/* Address Fields */}
              <TextField
                name="address.addressLine1"
                value={data.address[0].addressLine1}
                onChange={handleUserInputChange}
                fullWidth
                variant="outlined"
                label="Address Line 1"
              />

              <TextField
                name="address.addressLine2"
                value={data.address[0].addressLine2}
                onChange={handleUserInputChange}
                fullWidth
                variant="outlined"
                label="Address Line 2"
              />

              {/* LandMark & Village */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="address.landMark"
                    value={data.address[0].landMark}
                    onChange={handleUserInputChange}
                    fullWidth
                    variant="outlined"
                    label="LandMark"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="address.village"
                    value={data.address[0].village}
                    onChange={handleUserInputChange}
                    fullWidth
                    variant="outlined"
                    label="Village"
                  />
                </Grid>
              </Grid>

              {/* Taluka & District */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="address.taluka"
                    value={data.address[0].taluka}
                    onChange={handleUserInputChange}
                    fullWidth
                    variant="outlined"
                    label="Taluka"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="address.district"
                    value={data.address[0].district}
                    onChange={handleUserInputChange}
                    fullWidth
                    variant="outlined"
                    label="District"
                  />
                </Grid>
              </Grid>

              {/* State & Country */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="address.state"
                    value={data.address[0].state}
                    onChange={handleUserInputChange}
                    fullWidth
                    variant="outlined"
                    label="State"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="address.country"
                    value={data.address[0].country}
                    onChange={handleUserInputChange}
                    fullWidth
                    variant="outlined"
                    label="Country"
                  />
                </Grid>
              </Grid>

              {/* PinCode */}
              <TextField
                type="number"
                name="address.pincode"
                value={data.address[0].pincode}
                onChange={handleUserInputChange}
                fullWidth
                variant="outlined"
                label="PinCode"
              />

              {/* Submit Button */}
              <Button onClick={handleUserSubmit} variant="contained">
                Sign Up
              </Button>
            </Box>
          </Card>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Card
            sx={{
              width: { xs: "60vw", sm: "50vw" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 5,
              mb: 3,
            }}
          >
            <Typography variant="h5" sx={{ mb: 5 }}>
              User Details
            </Typography>
            <Box
              sx={{
                width: "40vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
              }}
            >
              <TextField
                name="name"
                value={restdata.name}
                onChange={handleRestUserInputChange}
                fullWidth
                variant="outlined"
                label="Name"
              />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="dob"
                    value={restdata.dob}
                    onChange={handleRestUserInputChange}
                    fullWidth
                    variant="outlined"
                    label="Date of Birth"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="phone"
                    value={restdata.phone}
                    onChange={handleRestUserInputChange}
                    fullWidth
                    variant="outlined"
                    label="Phone"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="gender"
                    value={restdata.gender}
                    onChange={handleRestUserInputChange}
                    fullWidth
                    variant="outlined"
                    label="Gender"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="profPic"
                    value={restdata.profPic}
                    onChange={handleRestUserInputChange}
                    fullWidth
                    variant="outlined"
                    label="Profile Picture"
                  />
                </Grid>
              </Grid>

              <Box
                sx={{
                  width: "40vw",
                  gap: 3,
                  display: "flex",
                  flexDirection: "column",
                }}
              ></Box>
              <TextField
                name="user.username"
                value={restdata.user.username}
                onChange={handleRestUserInputChange}
                fullWidth
                variant="outlined"
                label="Username"
              />

              <TextField
                name="user.email"
                value={restdata.user.email}
                onChange={handleRestUserInputChange}
                fullWidth
                variant="outlined"
                label="Email"
              />

              <TextField
                name="user.password"
                value={restdata.user.password}
                onChange={handleRestUserInputChange}
                fullWidth
                variant="outlined"
                label="Password"
                type="password"
              />
            </Box>
          </Card>

          <Card
            sx={{
              width: { xs: "60vw", sm: "50vw" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 5,
              mb: 3,
            }}
          >
            <Box
              sx={{
                width: "40vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
              }}
            >
              <Typography variant="h5" sx={{ mb: 1 }}>
                Address Details
              </Typography>

              <TextField
                name="address.0.name"
                value={restdata.address[0].name}
                onChange={handleRestUserInputChange}
                fullWidth
                variant="outlined"
                label="Name"
              />

              <TextField
                name="address.0.addressLine1"
                value={restdata.address[0].addressLine1}
                onChange={handleRestUserInputChange}
                fullWidth
                variant="outlined"
                label="Address Line 1"
              />

              <TextField
                name="address.0.addressLine2"
                value={restdata.address[0].addressLine2}
                onChange={handleRestUserInputChange}
                fullWidth
                variant="outlined"
                label="Address Line 2"
              />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="address.0.landMark"
                    value={restdata.address[0].landMark}
                    onChange={handleRestUserInputChange}
                    fullWidth
                    variant="outlined"
                    label="Landmark"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="address.0.village"
                    value={restdata.address[0].village}
                    onChange={handleRestUserInputChange}
                    fullWidth
                    variant="outlined"
                    label="Village"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="address.0.taluka"
                    value={restdata.address[0].taluka}
                    onChange={handleRestUserInputChange}
                    fullWidth
                    variant="outlined"
                    label="Taluka"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="address.0.district"
                    value={restdata.address[0].district}
                    onChange={handleRestUserInputChange}
                    fullWidth
                    variant="outlined"
                    label="District"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="address.0.state"
                    value={restdata.address[0].state}
                    onChange={handleRestUserInputChange}
                    fullWidth
                    variant="outlined"
                    label="State"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="address.0.country"
                    value={restdata.address[0].country}
                    onChange={handleRestUserInputChange}
                    fullWidth
                    variant="outlined"
                    label="Country"
                  />
                </Grid>
              </Grid>

              <TextField
                type="number"
                name="address.0.pincode"
                value={restdata.address[0].pincode}
                onChange={handleRestUserInputChange}
                fullWidth
                variant="outlined"
                label="Pin Code"
              />

              <Typography variant="h6">Business Address</Typography>

              {/* Business Address fields */}
              <TextField
                name="bussiness_name"
                value={restdata.bussiness_name}
                onChange={handleRestUserInputChange}
                fullWidth
                variant="outlined"
                label="Business Name"
              />

              <TextField
                name="bussiness_address.0.name"
                value={restdata.bussiness_address[0].name}
                onChange={handleRestUserInputChange}
                fullWidth
                variant="outlined"
                label="Business Address Name"
              />

              <TextField
                name="bussiness_address.0.addressLine1"
                value={restdata.bussiness_address[0].addressLine1}
                onChange={handleRestUserInputChange}
                fullWidth
                variant="outlined"
                label="Business Address Line 1"
              />

              <TextField
                name="bussiness_address.0.addressLine2"
                value={restdata.bussiness_address[0].addressLine2}
                onChange={handleRestUserInputChange}
                fullWidth
                variant="outlined"
                label="Business Address Line 2"
              />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="bussiness_address.0.landMark"
                    value={restdata.bussiness_address[0].landMark}
                    onChange={handleRestUserInputChange}
                    fullWidth
                    variant="outlined"
                    label="Business Landmark"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="bussiness_address.0.village"
                    value={restdata.bussiness_address[0].village}
                    onChange={handleRestUserInputChange}
                    fullWidth
                    variant="outlined"
                    label="Business Village"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="bussiness_address.0.taluka"
                    value={restdata.bussiness_address[0].taluka}
                    onChange={handleRestUserInputChange}
                    fullWidth
                    variant="outlined"
                    label="Business Taluka"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="bussiness_address.0.district"
                    value={restdata.bussiness_address[0].district}
                    onChange={handleRestUserInputChange}
                    fullWidth
                    variant="outlined"
                    label="Business District"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="bussiness_address.0.state"
                    value={restdata.bussiness_address[0].state}
                    onChange={handleRestUserInputChange}
                    fullWidth
                    variant="outlined"
                    label="Business State"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="bussiness_address.0.country"
                    value={restdata.bussiness_address[0].country}
                    onChange={handleRestUserInputChange}
                    fullWidth
                    variant="outlined"
                    label="Business Country"
                  />
                </Grid>
              </Grid>

              <TextField
                type="number"
                name="bussiness_address.0.pincode"
                value={restdata.bussiness_address[0].pincode}
                onChange={handleRestUserInputChange}
                fullWidth
                variant="outlined"
                label="Business PinCode"
              />

              <Button onClick={handleRestUserSubmit} variant="contained">
                Sign Up
              </Button>
            </Box>
          </Card>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default SignUp;
