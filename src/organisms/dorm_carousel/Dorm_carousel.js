import React, { useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import './dorm_carousel.css';
import {Dorm} from '../../molecules';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

const Dorm_carousel = ({topDorms}) =>  {
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

    const nextButton = () => {
        return (
          <span
            aria-hidden="true"
            className="next-button"
          >
            <GrFormNext className="icon"/>
          </span>
        );
      };

      const prevButton = () => {
        return (
          <span
            aria-hidden="true"
            className="prev-button"
          >
            <GrFormPrevious className="icon"/>
          </span>
        );
      };
  
    return (
        <div className="dorm-carousel-container">
            <p className="header3 title">Dorm</p>
            <p className="small subtitle">
                    Experience student-friendly dormitories,
                    designed to cater the needs of budget-conscious students
                    <br/> seeking comfortable and conducive learning environment. </p>
            <Carousel 
                activeIndex={index}
                onSelect={handleSelect}
                interval={null}
                nextIcon={nextButton()}
                prevIcon={prevButton()}
        
            >
                <Carousel.Item>
                    <div className="dorm-item">
                        <Dorm 
                          topDorms = {topDorms[0]}
                        />
                        <Dorm
                          topDorms = {topDorms[1]}
                        />
                        <Dorm
                          topDorms = {topDorms[2]}
                        />
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="dorm-item">
                        <Dorm
                          topDorms = {topDorms[3]}
                        />
                        <Dorm
                          topDorms = {topDorms[4]}
                        />
                        {/* <Dorm
                          topDorms = {topDorms[5]}
                        /> */}
                    </div>
                </Carousel.Item>
            </Carousel>
        </div>
    );
  }



export default Dorm_carousel;