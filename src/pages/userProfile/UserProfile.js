import { React, useState, useEffect } from "react";
import axios from "axios";
import "./userProfile.css";
import "../../index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Image, Carousel, Button } from "react-bootstrap";
import { CardListing, NavBar } from "../../organisms";
import { defaultPhoto } from "../../assets/images";
import { UserProfileModal, Unauthorized } from "../../molecules";
// import { Dorm } from "../../molecules";
import {
  isLoggedIn,
  getAuthUsername,
  getAuthType,
  getAuthName,
  getAuthMobile,
  getAuthEmail,
} from "../../auth";
import config from "../../config";
import { noUnits, loading } from "../../assets/images";
const url = config.apiUrl;

// const topDorms = {
//   Title: 'Oak Hall',
//   description: 'Oak Hall is a modern and spacious dormitory located in the heart of the university campus.'
// };

const UserProfile = () => {
  const [editing, setEditing] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [dp, setDP] = useState("");
  const [toggleState, setToggleState] = useState(1);
  const [modalShow, setModalShow] = useState(false);
  const [load, setLoad] = useState(true);
  const [number, setNumber] = useState(getAuthMobile());

  // function to toggle tabs
  const toggleTab = (index) => {
    setToggleState(index);
    console.log("toggle: ", toggleState)
  };

  // const handleClick = () => {
  //   if (editing && !newpassword) {
  //     window.alert(
  //       "Invalid password! If you want the same password, enter your current password."
  //     );
  //     return;
  //   }

  //   if (editing) {
  //     axios
  //       .post(url + "/edit-user", {
  //         email: getAuthEmail(),
  //         newUsername: newemail ? newemail : getAuthEmail(),
  //         newFirstName: newemail ? newemail : getAuthEmail(),
  //         // newFirstName: newname
  //         //   ? newname.split(" ")[0]
  //         //   : getAuthName().split(" ")[0],
  //         // newLastName: newname
  //         //   ? newname.split(" ")[1]
  //         //   : getAuthName().split(" ")[1],
  //         newContactNum: newnumber ? newnumber : getAuthMobile(),
  //         newPassword: newpassword,
  //       })
  //       .then((res) => {
  //         console.log(res.data);
  //         console.log("Success edit");
  //         document.cookie =
  //           "authCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  //         window.location.href = "/";
  //       })
  //       .catch((err) => console.error(err));
  //   }

  //   setEditing(!editing);
  // };

  useEffect(() => {
    setLoad(true);
    axios
      .post(url + "/user/get-all-favorites", { username: getAuthUsername() })
      .then((res) => {
        setFavorites(res.data.favorites);
        setLoad(false);
      })
      .catch((err) => console.error(err));

    axios
      .post(url + "/user/get-user-pic", { username: getAuthUsername() })
      .then((res) => setDP(res.data.imageUrl))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <NavBar></NavBar>

      {isLoggedIn() && getAuthType() === "Student" ? (
        <div className="userProfile_Container">
          <div className="userProfile_Container_left">
            <div className="userProfile_Container_left_photo">
              <Image 
                className="userPhoto"
                src={defaultPhoto}
              />
            </div>
            <div className="userProfile_Container_left_details">
              <p className="header4 userProfile_name">{getAuthName()}</p>
              {getAuthMobile() === 0 ? (
                <p className="regular userProfile_number">{getAuthMobile()}</p>
              ) : (
                <p></p>
              )}
              <p className="regular userProfile_email">{getAuthEmail()}</p>
              <Button className="userProfile_editButton"  onClick={() => setModalShow(true)}>
                Edit User Information
              </Button>
              <UserProfileModal 
                fname = {getAuthName().split(" ")[0]}
                lname = {getAuthName().split(" ")[1]}
                email = {getAuthEmail()}
                number = {getAuthMobile()}
                show={modalShow} 
                onHide={() => setModalShow(false)} 
              />
            </div>
          </div>
          <div className="userProfile_Container_right">
            <div className="userProfile_Container_right_carrousel">
            <p className="header4 addAccoms">Favorites</p>
            {load === true ? 
              (
                <div className="loadingContainer">
                  <img className="loading" src={loading} alt="loading" />
                  <p className="header4 noResultText">loading...</p>
                </div>
              )
              :
              (
            <Row className="cardlist-list justify-content-md-center mt-4">
            {favorites.length === 0 ? (
              <div className="noUnits">
                 <img src={noUnits} alt="image" />
                <p className="regular">No Favorites</p>
              </div>
            ) : (
              favorites.map((f, index) => (
                <div className="cardlist-flex mb-5">
                  <CardListing
                      key={index}
                       unit={f}
                       name={f.ACCOMMODATION_NAME}
                       location={f.ACCOMMODATION_LOCATION}
                       description={f.ACCOMMODATION_DESCRIPTION}
                       amenities={f.ACCOMMODATION_AMENITIES}
                       address={f.ACCOMMODATION_ADDRESS}
                       max_price={f.max_price}
                       owner={""}
                       rating={f.rating}
                  />
                </div>
              ))
            )}
            </Row>
            )}
            </div>
          </div>
        </div>
        // <Container>
        //   <Row className="justify-content-md-center">
        //     <Image
        //       src={
        //         dp
        //           ? dp
        //           : "https://img.freepik.com/free-icon/user_318-804790.jpg?w=2000"
        //       }
        //       roundedCircle
        //       fluid
        //       style={{ width: 400 }}
        //     />
        //   </Row>
        //   <Col className="text-center mt-5">
        //     {editing ? "🪪" : ""}{" "}
        //     {editing ? (
        //       <input
        //         placeholder="New Name"
        //         onChange={(e) => setNewname(e.target.value)}
        //       ></input>
        //     ) : (
        //       <h1 className="header1">{newname ? newname : getAuthName()}</h1>
        //     )}
        //   </Col>

        //   <Col className="text-center">
        //     <h1 className="small">
        //       📞{" "}
        //       {editing ? (
        //         <input
        //           placeholder="New Number"
        //           onChange={(e) => setNewnumber(e.target.value)}
        //         ></input>
        //       ) : newnumber ? (
        //         newnumber
        //       ) : (
        //         getAuthMobile()
        //       )}
        //     </h1>
        //     <h1 className="small">
        //       📬{" "}
        //       {editing ? (
        //         <input
        //           placeholder="New Email"
        //           onChange={(e) => setNewemail(e.target.value)}
        //         ></input>
        //       ) : newemail ? (
        //         newemail
        //       ) : (
        //         getAuthEmail()
        //       )}
        //     </h1>
        //     {editing ? "🔑" : <></>}

        //     {editing ? (
        //       <input
        //         placeholder="New Password"
        //         type="password"
        //         onChange={(e) => setNewpassword(e.target.value)}
        //       ></input>
        //     ) : (
        //       <></>
        //     )}
        //   </Col>

        //   <Col className="text-center mt-5">
        //     <Button onClick={handleClick} className="small-bold carousel-btn">
        //       {editing ? "Save" : "Edit Details"}
        //     </Button>
        //   </Col>

        //   <Col>
        //     <h1 className="mt-5 text-center header2">🌟 Favorites 🌟</h1>
        //     <Carousel variant="dark" className="mt-4 mb-5">
        //       {/* {favorites.map((f, index) => (
        //         <Carousel.Item>
        //           <div className="ml-4">
        //             <CardListing
        //               key={index}
        //               unit={f}
        //               name={f.ACCOMMODATION_NAME}
        //               location={f.ACCOMMODATION_LOCATION}
        //               description={f.ACCOMMODATION_DESCRIPTION}
        //               amenities={f.ACCOMMODATION_AMENITIES}
        //               address={f.ACCOMMODATION_ADDRESS}
        //               max_price={f.max_price}
        //               owner={f.USER_FNAME + " " + f.USER_LNAME}
        //               rating={f.rating}
        //             />
        //           </div>
        //         </Carousel.Item>
        //       ))} */}
        //     </Carousel>
        //   </Col>
        // </Container>
      ) : (
        <Container>
          <Unauthorized />
        </Container>
      )}
    </div>
  );
};

export default UserProfile;
