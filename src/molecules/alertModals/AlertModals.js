import { React, useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./alertModals.css";
import {
  isLoggedIn,
  getAuthUsername,
  getAuthType,
  getAuthName,
  getAuthMobile,
  getAuthEmail,
} from "../../auth";
import config from "../../config";
const url = config.apiUrl;

function AlertModals(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        <div className="content">
          <div className="report-container">
           <p className="report large-bold">Alert!</p>
           <p className="small">{props.alert}</p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AlertModals;
