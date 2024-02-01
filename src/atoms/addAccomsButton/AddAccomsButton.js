import React, { useState } from "react";
import "./addAccomsButton.css";
import { AddAccoms } from "../../molecules";
import Fab from "@mui/material/Fab";
import { IoMdAddCircle } from "react-icons/io";
const AddAccomsButton = () => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <div className="whole-screen">
      <Fab
        aria-label="add"
        sx={{
          width: "100px",
          height: "100px",
        }}
        onClick={(e) => setModalShow(true)}
      >
        <IoMdAddCircle className="icon-add" />
      </Fab>
      <AddAccoms show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
};

export default AddAccomsButton;
