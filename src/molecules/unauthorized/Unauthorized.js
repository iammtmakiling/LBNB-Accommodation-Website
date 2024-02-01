import React, { useState, useEffect } from "react";
import "./unauthorized.css";
import { unauthorized } from "../../assets/images";
const Unauthorized = () => {

  return (
    <div className="unauthorized-container">
      <img src={unauthorized} alt="My Image" />
      <p className="header4 addAccoms">Unauthorized Route</p>
    </div>
  );
};

export default Unauthorized;
