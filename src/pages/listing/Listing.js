import React from "react";
import "./listing.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar } from "../../organisms";
import { CardListing } from "../../organisms";

const Listing = () => {
  return (
    <div className="list-page-main-div">
      <NavBar />

      <div className="cardlist-flex">
        <CardListing />
        <CardListing />
        <CardListing />
      </div>
    </div>
  );
};

export default Listing;
