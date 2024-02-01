import React from "react";
import { useEffect } from "react";
import "./details.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  NavBar,
  ListingDetails,
  RatingReviewSection,
  SubmitRatingReviewSect,
} from "../../organisms";
import { useLocation } from "react-router-dom";

const Details = ({onDataReceived, socket}) => {
  const location = useLocation();
  const { props } = location.state;

  useEffect(() => {
    onDataReceived(props)
  }, []);

  return (
    <div className="detials-page-main-div">
      <NavBar />
      <ListingDetails props={props} socket={socket}/>
      <RatingReviewSection props={props} />
      <SubmitRatingReviewSect props={props} />
    </div>
  );
};

export default Details;
