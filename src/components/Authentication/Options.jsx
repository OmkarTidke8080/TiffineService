import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconButton,
  Dialog,
  DialogTitle,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  DialogContent,
} from "@mui/material";
import { RxCross1 } from "react-icons/rx";
import { UserSignUpTypeContext } from "../../context/UserSignUpType";

function Options() {
  const { selectedType, setSelectedType } = useContext(UserSignUpTypeContext);
  const navigate = useNavigate();

  const handleSelection = (event) => {
    setSelectedType(event.target.value);
  };

  const onClose = () => {
    navigate("/home");
  };

  const handleConfirm = () => {
    if (selectedType) {
      if (selectedType === "Customer") {
        navigate("/sign-up");
      } else if (selectedType === "Restaurant") {
        navigate("/sign-up");
      }
    } else {
      alert("Please select an option before proceeding.");
    }
  };

  return (
    <Dialog open maxWidth="xs" fullWidth>
      <DialogTitle>
        Select Sign Up Type
        <IconButton
          onClick={onClose}
          style={{ position: "absolute", top: "10px", right: "10px" }}
        >
          <RxCross1 />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <RadioGroup value={selectedType} onChange={handleSelection}>
          <FormControlLabel
            value="Customer"
            control={<Radio />}
            label="Customer"
          />
          <FormControlLabel
            value="Restaurant"
            control={<Radio />}
            label="Restaurant"
          />
        </RadioGroup>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "20px" }}
        >
          Continue
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default Options;
