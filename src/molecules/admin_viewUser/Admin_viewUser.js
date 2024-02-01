import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Row, Col, Container } from "react-bootstrap";
import "./admin_viewUser.css";
import { Image } from "react-bootstrap";

function Admin_viewUser(props) {
  const { studentInfo } = props;
  const { USER_ID, USER_FNAME, USER_LNAME, USER_EMAIL, USER_PASSWORD } =
    studentInfo;

  const [editUser, setEditUser] = React.useState(false);

  function editUserClicked() {
    setEditUser(true);
  }

  function disableEdit() {
    setEditUser(false);
  }

  return (
    <Modal
      onExited={disableEdit}
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton />
      <Modal.Body>
        <div className="adminviewuser-container">
          <div className="adminviewuser-top">
            <div></div>
            <Image
              className="adminviewuser-profileImage"
              src="https://pbs.twimg.com/profile_images/1564398871996174336/M-hffw5a_400x400.jpg"
              roundedCircle
              fluid
            />
          </div>
          <div className="adminviewuser-items">
            {/* USER NAME */}
            <div className="adminviewuser-item">
              <p className="regular-bold">Name:</p>

              {editUser ? (
                <input placeholder={USER_FNAME + " " + USER_LNAME}></input>
              ) : (
                <p className="regular">
                  {USER_FNAME} {USER_LNAME}
                </p>
              )}
            </div>

            {/* USER EMAIL */}
            <div className="adminviewuser-item">
              <p className="regular-bold">Email:</p>

              {editUser ? (
                <input placeholder={USER_EMAIL}></input>
              ) : (
                <p className="regular">{USER_EMAIL}</p>
              )}
            </div>

            {/* USER PASSWORD */}
            <div className="adminviewuser-item">
              <p className="regular-bold">Password:</p>

              {editUser ? (
                <input placeholder="************"></input>
              ) : (
                <p className="regular">************</p>
              )}
            </div>
          </div>

          {editUser ? (
            <Row>
              <Col>
                <Button onClick={disableEdit} className="adminedituser">
                  Save
                </Button>
              </Col>

              <Col>
                <Button
                  variant="outline-danger"
                  onClick={disableEdit}
                  className="admincancel"
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          ) : (
            <Button onClick={editUserClicked} className="adminedituser">
              Edit
            </Button>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Admin_viewUser;
