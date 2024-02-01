import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./notFound.css";
import { NavBar } from "../../organisms";

const NotFound = () => {
  return (
    <div>
        <NavBar/>
        <h1 className="header4 center-text">Error 404: The requested URL was not found.</h1>
    </div>
  );
};

export default NotFound;
