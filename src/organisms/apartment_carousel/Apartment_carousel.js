import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./apartment_carousel.css";
import { Apartment } from "../../molecules";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const Apartment_carousel = ({ topApartments }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const nextButton = () => {
    return (
      <span aria-hidden="true" className="next-button">
        <GrFormNext className="icon" />
      </span>
    );
  };

  const prevButton = () => {
    return (
      <span aria-hidden="true" className="prev-button">
        <GrFormPrevious className="icon" />
      </span>
    );
  };

  return (
    <div className="apartment-carousel-container">
      <p className="header3 title">Elbi's Best</p>
      <p className="small subtitle">You deserve a home away from home. </p>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        interval={null}
        nextIcon={nextButton()}
        prevIcon={prevButton()}
      >
        {topApartments.map((apt, index) => (
          <Carousel.Item key={index}>
            <Apartment key={topApartments.id} topApartments={apt}></Apartment>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Apartment_carousel;
