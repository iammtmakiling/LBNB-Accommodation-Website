import React, { useState } from "react";
import "./landlordHome.css";
import { AddAccomsButton } from "../../atoms";
import {
  NavBar,
  Banner,
  Footer,
  ApartmentCarousel,
  Multilayerfilter,
} from "../../organisms";
const LandlordHome = () => {
  return (
    <div className="landlordhome-container">
      <AddAccomsButton />
      <div className="home-container">
        <NavBar />
        <Banner />
        <Multilayerfilter />
        <ApartmentCarousel />
        <Footer />
      </div>
    </div>
  );
};

export default LandlordHome;

// import React, {useState} from "react";
// import './landlordHome.css';
// import { Home } from "../../pages";
// import { AddAccoms } from "../../molecules";
// import Fab from '@mui/material/Fab';
// import {IoMdAddCircle} from 'react-icons/io';

// const LandlordHome = () => {
//   const [modalShow, setModalShow] = useState(false);
//   <div>
//     <p>HATDOG</p>
//     {/* <div className="whole-screen">
//         <Fab
//           aria-label="add"
//           sx={{
//             width: "90px",
//             height: "90px"
//           }}
//           onClick={(e) =>  setModalShow(true)}
//         >
//           <IoMdAddCircle className="icon-add"/>
//         </Fab>
//         <AddAccoms
//               show={modalShow}
//               onHide={() => setModalShow(false)}
//         />
//       </div>
//     <Home/> */}
//   </div>
// }

// export default LandlordHome
