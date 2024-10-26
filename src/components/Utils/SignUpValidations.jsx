const validateSignUpForm = (data) => {
  const errors = {};

  const isValidString = (value) => /^[A-Za-z\s]+$/.test(value);

  // Validate Name
  if (!data.name) {
    errors.name = "Full Name is required";
  } else if (!/^[A-Za-z\s]*$/.test(data.name)) {
    errors.name = "Name should contain only letters and spaces";
  } else if (data.name.length > 40) {
    errors.name = "Name should not exceed 40 characters";
  }

  // validate phone
  if (!data.phone) {
    errors.phone = "Valid Mobile Number is required";
  } else if (data.phone.length < 10 || data.phone.length > 10) {
    errors.phone = "Mobile Number should be less equal to 10 digits";
  }

  // Validate Date of Birth
  if (!data.dob) {
    errors.dob = "Date of Birth is required";
  } else if (isNaN(Date.parse(data.dob))) {
    errors.dob = "Invalid Date of Birth";
  } else if (new Date(data.dob) > new Date()) {
    errors.dob = "Date of Birth cannot be in the future";
  }

  // Validate Gender
  if (!data.gender) {
    errors.gender = "Gender is required";
  }

  // Validate User Fields
  if (!data.user.username) {
    errors["user.username"] = "Username is required";
  } else if (!/^[A-Za-z0-9\s]*$/.test(data.user.username)) {
    errors["user.username"] =
      "Username must contain only characters and numbers";
  }

  if (!data.user.email) {
    errors["user.email"] = "Email is required";
  } else if (!/^[\w.-]+@[\w.-]+\.\w+$/.test(data.user.email)) {
    errors["user.email"] = "Email is invalid";
  } else if (/[^a-zA-Z0-9@._-]/.test(data.user.email)) {
    errors["user.email"] =
      "Email should only contain letters, numbers, @, . and -";
  }

  if (!data.address[0].addressLine1) {
    errors["address.addressLine1"] = "Address Line 1 is required";
  }

  if (!/^[A-Za-z0-9\s]*$/.test(data.address[0].landMark)) {
    errors["address.landMark"] =
      "Landmark must contain only letters and numbers";
  }

  if (!data.address[0].village) {
    errors["address.village"] = "Village is required";
  } else if (!isValidString(data.address[0].village)) {
    errors["address.village"] = "Village should not contain numbers";
  }

  if (!data.address[0].taluka) {
    errors["address.taluka"] = "Taluka is required";
  } else if (!isValidString(data.address[0].taluka)) {
    errors["address.taluka"] = "Taluka should not contain numbers";
  }

  if (!data.address[0].district) {
    errors["address.district"] = "District is required";
  } else if (!isValidString(data.address[0].district)) {
    errors["address.district"] = "District should not contain numbers";
  }

  if (!data.address[0].state) {
    errors["address.state"] = "State is required";
  } else if (!isValidString(data.address[0].state)) {
    errors["address.state"] = "State should not contain numbers";
  }

  if (!data.address[0].country) {
    errors["address.country"] = "Country is required";
  } else if (!isValidString(data.address[0].country)) {
    errors["address.country"] = "Country should not contain numbers";
  }

  if (!data.address[0].pincode) {
    errors["address.pincode"] = "Pincode is required";
  } else if (!/^\d{6}$/.test(data.address[0].pincode)) {
    errors["address.pincode"] = "Pincode must be 6 digits";
  }

  return errors;
};

export default validateSignUpForm;
