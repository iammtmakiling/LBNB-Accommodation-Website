import React from "react";
import "./footer.css";
import Button from "react-bootstrap/Button";

const Home = () => {
  return (
    <div>
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-top-left">
            <p className="large-bold">AboutUS</p>
            <p className="small footer-text-left">
              Driven by our passion for technology and social impact, we are
              dedicated to creating innovative applications that serve the needs
              of society.
            </p>
            <Button
              onClick={() => {
                window.location.href = "/devPage";
              }}
              className="tiny-bold footer-btn"
            >
              Know the Devs
            </Button>
          </div>
          <div className="footer-top-right">
            <p className="small footer-text-right">
              Find Your Perfect Stay in Los Baños with LBNB. Discover cozy
              accommodations tailored for students and travelers. Browse and
              relax. Your stress-free stay awaits. Welcome to LBNB!
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="tiny">LBNB © 2023 | CMSC 128 - E1L</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
