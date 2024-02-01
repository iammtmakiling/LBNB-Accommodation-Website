import Carousel from "react-bootstrap/Carousel";
import "./banner.css";
import { banner1, banner2, banner3 } from "../../assets/images";

function Banner() {
  return (
    <div className="carousel-body">
      <Carousel fade={true} controls={false}>
        <Carousel.Item>
          <img className="d-block w-100" src={banner1} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={banner2} alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={banner3} alt="Third slide" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Banner;
