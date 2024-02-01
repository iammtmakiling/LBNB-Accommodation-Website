import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./cardListing_addRoom.css";
import "../../index.css";
import Button from 'react-bootstrap/Button';
import { Col } from "react-bootstrap";
import { ViewMoreButton } from "../../atoms";
import { AddRooms } from "../../molecules";
const CardListing_addRoom = () => {
  // change these values
  const [modalShow, setModalShow] = React.useState(false);
  const image =
    "https://www.drivenbydecor.com/wp-content/uploads/2019/08/dorm-room-before.jpg";
  const name = "Casa de Felicidad";
  const location = "Los Banos, Laguna";
  const owner = "William";
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non tempor mauris. In hac habitasse platea dictumst. Phasellus consectetur posuere mattis. Nullam.";
  const price = "P8,000 - P16,000";
  const stars = "★★★★☆";
  const reviews = "(32 reviews)";

  return (
    <div className="card-listing-add-room">
      {/* fixed variable width column */}
      <Col md="auto">
        <div className="img-div">
          <img
            className="accommodation-img"
            src={image}
            alt="accommodation-img"
          ></img>
        </div>
      </Col>

      <Col xs={6}>
        <div className="middle-section add-padding">
          <div className="name-loc-section">
            <h1 className="large-bold accom-name">{name}</h1>
            <p className="small">
              <a style={{ textDecoration: "none" }} href="/LandlordProfile">
                leased by {owner}
              </a>
            </p>
            <p className="small">{location}</p>
          </div>
          <p className="small accom-desc">{description}</p>
        </div>
      </Col>

      <Col>
        <div className="right-section add-padding">
          <div className="price-section">
            <h2 className="large-bold price-range">{price}</h2>
            <div>
              <p className="small review-stars">{stars}</p>
              <p className="small review-num">{reviews}</p>
            </div>
          </div>
          <div className="button-section">
            <Button 
              className="small-bold addRoom-btn"
              onClick={(e) =>  setModalShow(true)}>
              Add Room
            </Button>
            <AddRooms
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
            <ViewMoreButton />
          </div>
        </div>
      </Col>
    </div>
  );
};

export default CardListing_addRoom;
