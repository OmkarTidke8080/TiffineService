const validateRestSignUpForm = (data) => {
  const errors = {};

  const isValidString = (value) => /^[A-Za-z\s]+$/.test(value);

  // Validate Name
  if (!data.name) {
    errors.name = "Name is required";
  } else if (!/^[A-Za-z\s]*$/.test(data.name)) {
    errors.name = "Name should contain only letters and spaces";
  } else if (data.name.length > 40) {
    errors.name = "Name should not exceed 40 characters";
  }

  // Validate Date of Birth
  if (!data.dob) {
    errors.dob = "Date of Birth is required";
  } else if (isNaN(Date.parse(data.dob))) {
    errors.dob = "Invalid Date of Birth";
  } else if (new Date(data.dob) > new Date()) {
    errors.dob = "Date of Birth cannot be in the future";
  }

  // Validate Phone Number
  if (!data.phone) {
    errors.phone = "Phone number is required";
  } else if (!/^\d{10}$/.test(data.phone)) {
    errors.phone = "Phone number must be 10 digits";
  }

  // Validate Gender
  if (!data.gender) {
    errors.gender = "Gender is required";
  }

  // Validate User Fields
  if (!data.user.username) {
    errors["user.username"] = "Username is required";
  } else if (!/^[A-Za-z0-9\s]*$/.test(data.user.username)) {
    errors["user.username"] = "Username must contain only letters and numbers";
  }

  if (!data.user.email) {
    errors["user.email"] = "Email is required";
  } else if (!/^[\w.-]+@[\w.-]+\.\w+$/.test(data.user.email)) {
    errors["user.email"] = "Email is invalid";
  } else if (/[^a-zA-Z0-9@._-]/.test(data.user.email)) {
    errors["user.email"] =
      "Email should only contain letters, numbers, @, . and -";
  }

  if (!data.user.password) {
    errors["user.password"] = "Password is required";
  } else if (data.user.password.length < 6) {
    errors["user.password"] = "Password must be at least 6 characters long";
  }

  // Validate Address Fields
  if (!data.address[0].name) {
    errors["address.name"] = "Address Name is required";
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

  // Validate Business Name
  if (!data.bussiness_name) {
    errors.bussiness_name = "Business name is required";
  } else if (!/^[A-Za-z\s]*$/.test(data.bussiness_name)) {
    errors.bussiness_name =
      "Business name should contain only letters and spaces";
  } else if (data.bussiness_name.length > 40) {
    errors.bussiness_name = "Business name should not exceed 40 characters";
  }

  // Validate Business Address Fields
  if (!data.bussiness_address[0].name) {
    errors["bussiness_address.name"] = "Business Address Name is required";
  }

  if (!data.bussiness_address[0].addressLine1) {
    errors["bussiness_address.addressLine1"] =
      "Business Address Line 1 is required";
  }

  if (!/^[A-Za-z0-9\s]*$/.test(data.bussiness_address[0].landMark)) {
    errors["bussiness_address.landMark"] =
      "Business Landmark must contain only letters and numbers";
  }

  if (!data.bussiness_address[0].village) {
    errors["bussiness_address.village"] = "Business Village is required";
  } else if (!isValidString(data.bussiness_address[0].village)) {
    errors["bussiness_address.village"] =
      "Business Village should not contain numbers";
  }

  if (!data.bussiness_address[0].taluka) {
    errors["bussiness_address.taluka"] = "Business Taluka is required";
  } else if (!isValidString(data.bussiness_address[0].taluka)) {
    errors["bussiness_address.taluka"] =
      "Business Taluka should not contain numbers";
  }

  if (!data.bussiness_address[0].district) {
    errors["bussiness_address.district"] = "Business District is required";
  } else if (!isValidString(data.bussiness_address[0].district)) {
    errors["bussiness_address.district"] =
      "Business District should not contain numbers";
  }

  if (!data.bussiness_address[0].state) {
    errors["bussiness_address.state"] = "Business State is required";
  } else if (!isValidString(data.bussiness_address[0].state)) {
    errors["bussiness_address.state"] =
      "Business State should not contain numbers";
  }

  if (!data.bussiness_address[0].country) {
    errors["bussiness_address.country"] = "Business Country is required";
  } else if (!isValidString(data.bussiness_address[0].country)) {
    errors["bussiness_address.country"] =
      "Business Country should not contain numbers";
  }

  if (!data.bussiness_address[0].pincode) {
    errors["bussiness_address.pincode"] = "Business Pincode is required";
  } else if (!/^\d{6}$/.test(data.bussiness_address[0].pincode)) {
    errors["bussiness_address.pincode"] = "Business Pincode must be 6 digits";
  }

  return errors;
};

export default validateRestSignUpForm;
