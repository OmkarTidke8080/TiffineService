import React from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../Authentication/Profile.jsx";
import { useState } from "react";
import { useContext } from "react";
// import Drawer from "@mui/material/Drawer";
import { UserNameContext } from "../../context/UserName.jsx";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/icons-material/Menu";
import "./Home.css";
import icon from "../../assets/ProfileI.png";
import foodBag from "../../assets/food-bag.png";

function Navbar() {
  const navigate = useNavigate();
  const { userName } = useContext(UserNameContext);
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className=" navbar-color container mx-auto  flex flex-wrap p-3 flex-col md:flex-row items-center border-b-2 border-black">
      <a className="flex font-serif font-bold items-center text-gray-900 mb-4 md:mb-0">
        <h1>Taicha Dabba</h1>{" "}
      </a>
      <div class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
        <button onClick={() => navigate("/home")} className="mr-5">
          Home
        </button>
        <button onClick={() => navigate("/about-us")} className="mr-5">
          About Us
        </button>
        <button className="mr-5">Plans</button>
        <button className="mr-5">Contact Us</button>
        <button onClick={() =>{
          navigate("/cart")
        }} className="mr-5">Cart</button>
      </div>
      <button className="inline-flex items-center  border-0 py-1 px-3 mt-4 md:mt-0">
        <img src={icon} alt="" height={25} width={25} />
        <div className="ml-2"> {userName}</div>
      </button>
      <IconButton onClick={() => setShowSidebar(true)}>
        <Menu />{" "}
      </IconButton>
      <Profile open={showSidebar} setOpen={setShowSidebar} />
    </div>
  );
}

export default Navbar;
