import {React, axios} from "react";
import { Drawer, Box, Button, Divider, IconButton } from "@mui/material";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

function Profile({ open, setOpen }) {
  const navigate = useNavigate();

  const onClose = () => {
    setOpen(false);
    navigate("/home");
  };

  const handleProfileClick = () => {
    setOpen(false);
    navigate("/UpdateProfile");
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => setOpen(false)} // Close drawer when clicked outside
    >
      <Box
        p={2}
        width="280px"
        height="50vh" // Set height to half of the viewport height
        textAlign="center"
        sx={{ overflowY: "auto" }} // Add scroll if content exceeds height
      >
        <IconButton
          onClick={onClose}
          style={{ position: "absolute", top: "10px", right: "10px" }}
        >
          <RxCross1 />
        </IconButton>

        <div className="mt-10">
          <li className="flex justify-start">
            <Divider />
            <Button onClick={handleProfileClick}>Profile</Button>
            <Divider />
          </li>
          <li className="flex justify-start">
            <Button>Coupons</Button>
          </li>
          <li className="flex justify-start">
            <Button onClick={() =>  navigate("/")}>Sign Out</Button>
          </li>
        </div>
      </Box>
    </Drawer>
  );
}

export default Profile;
