import { Outlet } from "react-router-dom";
import Navbar from "./components/Home/Navbar";
import Home from "./components/Home/Home";

const Layout = () => {
  return (
    <>
    
      <Navbar>
        <Outlet />
      </Navbar>
    </>
  );
};

export default Layout;
