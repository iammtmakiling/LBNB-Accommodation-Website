import React, { useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import './hotels_carousel.css';
import {Hotels} from '../../molecules';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

const Hotels_carousel = ({topHotels}) =>  {
    const [index, setIndex] = useState(0);
    const nextButton = () => {
        return (
          <span
            aria-hidden="true"
            className="hotels-next-button"
          >
            <GrFormNext className="icon"/>
          </span>
        );
      };

      const prevButton = () => {
        return (
          <span
            aria-hidden="true"
            className="hotels-prev-button"
          >
            <GrFormPrevious className="icon"/>
          </span>
        );
      };
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
    return (
        <div className="hotel-carousel-container">
            <p className="header3 title">Hotels</p>
            <p className="small subtitle">Experience budget-friendly hotels that doesn't compromise on comfort. </p>
            <Carousel 
                activeIndex={index}
                onSelect={handleSelect}
                interval={null}
                nextIcon={nextButton()}
                prevIcon={prevButton()}
        
            >
                <Carousel.Item>
                    <Hotels
                      topHotels = {topHotels[0]}
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <Hotels
                      topHotels = {topHotels[1]}
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <Hotels
                      topHotels = {topHotels[2]}
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <Hotels
                      topHotels = {topHotels[3]}
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <Hotels
                      topHotels = {topHotels[4]}
                    />
                </Carousel.Item>
            </Carousel>
        </div>
    );
  }



export default Hotels_carousel;