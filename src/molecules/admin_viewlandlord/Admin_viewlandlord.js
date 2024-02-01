import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./admin_viewlandlord.css";
import { Image, Col, Row, Container } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";

function Admin_viewlandlord(props) {
  const { ownerInfo } = props;
  const {
    USER_ID,
    USER_FNAME,
    USER_LNAME,
    USER_EMAIL,
    USER_PASSWORD,
    USER_CONTACTNUM,
  } = ownerInfo;

  const [editOwner, setEditOwner] = React.useState(false);
  const [editAccomsRoom, setEditAccomsRoom] = React.useState(false);

  function editOwnerClicked() {
    setEditOwner(true);
  }

  function editAccomsRoomClicked() {
    setEditAccomsRoom(true);
  }

  function disableEditOwner() {
    setEditOwner(false);
  }

  function disableEditAccomsRoom() {
    setEditAccomsRoom(false);
  }

  function disableAllEdit() {
    setEditOwner(false);
    setEditAccomsRoom(false);
  }

  return (
    <Modal
      onExited={disableAllEdit}
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton />
      <Modal.Body>
        <div className="adminviewlandlord-container">
          <div className="adminviewlandlord-left">
            <div className="adminviewlandlord-top">
              <div></div>
              <Image
                className="adminviewlandlord-profileImage"
                src="https://pbs.twimg.com/profile_images/1564398871996174336/M-hffw5a_400x400.jpg"
                roundedCircle
                fluid
              />
            </div>
            <div className="adminviewlandlord-items">
              {/* Name */}
              <div className="adminviewlandlord-item">
                <p className="regular-bold">Name:</p>

                {editOwner ? (
                  <input placeholder={USER_FNAME + " " + USER_LNAME}></input>
                ) : (
                  <p className="regular">
                    {USER_FNAME} {USER_LNAME}
                  </p>
                )}
              </div>
              {/* Email */}
              <div className="adminviewlandlord-item">
                <p className="regular-bold">Email:</p>

                {editOwner ? (
                  <input placeholder={USER_EMAIL}></input>
                ) : (
                  <p className="regular">{USER_EMAIL}</p>
                )}
              </div>
              {/* Phone */}
              <div className="adminviewlandlord-item">
                <p className="regular-bold phone-number-input">Phone Number:</p>

                {editOwner ? (
                  <input
                    className="no-arrows"
                    placeholder={USER_CONTACTNUM}
                  ></input>
                ) : (
                  <p className="regular">{USER_CONTACTNUM}</p>
                )}
              </div>
              {/* Password */}
              <div className="adminviewlandlord-item">
                <p className="regular-bold">Password:</p>
                {editOwner ? (
                  <input type="password" placeholder="************"></input>
                ) : (
                  <p className="regular">************</p>
                )}
              </div>
              <div className="adminviewlandlord-btns-left">
                {editOwner ? (
                  <Button
                    className="adminsavelandlord"
                    onClick={disableEditOwner}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    className="admineditlandlord"
                    onClick={editOwnerClicked}
                  >
                    Edit
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="adminviewlandlord-right">
            <div className="adminviewlandlord-right-top">
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  className="small adminviewlandlord-filter-dropdown"
                >
                  Accomodations
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    className="small adminviewlandlord-filter-dropdown-item"
                    href="#/action-1"
                  >
                    Accom1
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="small adminviewlandlord-filter-dropdown-item"
                    href="#/action-2"
                  >
                    Accom2
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="small adminviewlandlord-filter-dropdown-item"
                    href="#/action-3"
                  >
                    Accom3
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="adminviewlandlord-right-bottom">
              {/* Accomodation Name */}
              <div className="adminviewlandlord-item">
                <p className="small-bold">Accomodation Name:</p>
                {editAccomsRoom ? (
                  <input placeholder="White House"></input>
                ) : (
                  <p className="small">White House</p>
                )}
              </div>

              {/* Accomodation Type */}
              <div className="adminviewlandlord-item">
                <p className="small-bold">Type</p>

                {editAccomsRoom ? (
                  <Dropdown>
                    <Dropdown.Toggle
                      id="dropdown-basic"
                      className="small adminviewlandlord-filter-dropdown-type"
                    >
                      Apartment
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item className="small" href="#/action-1">
                        Apartment
                      </Dropdown.Item>
                      <Dropdown.Item className="small" href="#/action-2">
                        Bedspace
                      </Dropdown.Item>
                      <Dropdown.Item className="small" href="#/action-3">
                        Dorm
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <p className="small">Apartment</p>
                )}
              </div>

              {/* Description */}
              <div className="adminviewlandlord-item">
                <p className="small-bold">Description</p>
                {editAccomsRoom ? (
                  <input placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non tempor mauris."></input>
                ) : (
                  <p className="small">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus non tempor mauris.
                  </p>
                )}
              </div>

              {/* Location */}
              <div className="adminviewlandlord-item">
                <p className="small-bold">Location:</p>
                {editAccomsRoom ? (
                  <input placeholder="Somewhere in Elbi"></input>
                ) : (
                  <p className="small">Somewhere in Elbi</p>
                )}
              </div>

              {/* Amenities */}
              <div className="adminviewlandlord-item">
                <p className="small-bold">Amenities:</p>
                {editAccomsRoom ? (
                  <input placeholder="Something Something"></input>
                ) : (
                  <p className="small">Something Something</p>
                )}
              </div>

              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  className="small adminviewlandlord-filter-dropdown-rooms"
                >
                  Rooms
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    className="small adminviewlandlord-filter-dropdown-item"
                    href="#/action-1"
                  >
                    Room1
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="small adminviewlandlord-filter-dropdown-item"
                    href="#/action-2"
                  >
                    Room2
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="small adminviewlandlord-filter-dropdown-item"
                    href="#/action-3"
                  >
                    Room3
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              {/* Room Name */}
              <div className="adminviewlandlord-item">
                <p className="small-bold">Room Name</p>
                {editAccomsRoom ? (
                  <input placeholder="Room 1"></input>
                ) : (
                  <p className="small">Room 1</p>
                )}
              </div>

              {/* Capacity */}
              <div className="adminviewlandlord-item">
                <p className="small-bold">Capacity:</p>
                {editAccomsRoom ? (
                  <input type="number" min="0" placeholder="1"></input>
                ) : (
                  <p className="small">1</p>
                )}
              </div>

              {/* Price */}
              <div className="adminviewlandlord-item">
                <p className="small-bold">Price</p>

                {editAccomsRoom ? (
                  <input type="number" min="0" placeholder="5000"></input>
                ) : (
                  <p className="small">5000</p>
                )}
              </div>

              {/* Button */}
              <div className="adminviewlandlord-btns">
                {editAccomsRoom ? (
                  <Button
                    className="adminsavelandlord"
                    onClick={disableEditAccomsRoom}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    className="admineditlandlord"
                    onClick={editAccomsRoomClicked}
                  >
                    Edit
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Admin_viewlandlord;
