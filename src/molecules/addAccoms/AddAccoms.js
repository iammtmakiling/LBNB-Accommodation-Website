import React, { useState } from "react";
import axios from "axios";
import FormData from "form-data";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./addAccoms.css";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import { getAuthId } from "../../auth";
import config from "../../config";
import AlertModals from "../alertModals/AlertModals";
const url = config.apiUrl;

function AddAccoms(props) {
	const [newLocation, setNewLocation] = useState("Within Campus");
	const [newName, setNewName] = useState("");
	const [newType, setNewType] = useState("Dorm");
	const [newAddress, setNewAddress] = useState("");
	const [newDescription, setNewDescription] = useState("");
	const [newAmenities, setNewAmenities] = useState("");
	const [fileStream, setFileStream] = useState(null);
	const [modalShow, setModalShow] = useState(false);
	const [selectedImage, setSelectedImage] = useState(null);

	const handleImageUpload = (event) => {
		const file = event.target.files[0];
		setFileStream(file);
		setSelectedImage(URL.createObjectURL(file));
	};

	const handleAdd = () => {
		if (
			newName === "" ||
			newType === "" ||
			newAddress === "" ||
			!newDescription === ""
		) {
			setModalShow(true);
			return;
		}

		const newAccom = {
			name: newName,
			type: newType,
			address: newAddress,
			location: newLocation,
			description: newDescription,
			amenities: newAmenities,
			userId: getAuthId(),
		};

		const formData = new FormData();
		formData.append("accommodationName", newName);
		formData.append("data", fileStream);

		axios
			.post(url + "/add-accommodation", newAccom)
			.then((res) => {
				console.log(res.data);

				axios
					.post(url + "/accommodation/upload-accommodation-pic", formData, {
						headers: { "Content-Type": "multipart/form-data" },
					})
					.then((res) => {
						formData.forEach((v, k) => {
							console.log(`${k}: ${v}`);
						});

						console.log(res.data);
						// window.location.reload();
					})
					.catch((err) => console.error(err));
			})
			.catch((err) => console.error(err));
	};

	return (
		<Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Header closeButton></Modal.Header>
			<Modal.Body className="addAccomsModal">
				<Container className="add-accoms-container">
					<Row className="input-item">
						<Col>
							<p className="large-bold">Add Acccommodation</p>
						</Col>
					</Row>
					<Row className="input-item">
						{/* <div className="userProfileModal_detail">
              <p className="small userProfileModal_text">Number</p>
              <input
                required
                className="tiny userProfileInput"
                placeholder="09XXXXXXXX"
                type="text"
                onChange={(e) => setNewnumber(e.target.value)}
              /> 
            </div> */}
						<Col xs={4}>
							<p className="small light-green addAccoms">Name</p>
						</Col>
						<Col>
							{" "}
							<input
								className="tiny input-add-accoms"
								type="text"
								onChange={(e) => setNewName(e.target.value)}
							/>
						</Col>
					</Row>
					<Row className="input-item">
						<Col xs={4}>
							<p className="small light-green addAccoms">Type</p>
						</Col>
						<Col>
							<Form.Check
								className="custom-radio tiny"
								inline
								label="Dorm"
								name="group1"
								type="radio"
								checked={newType === "Dorm"}
								id={`inline-radio-1`}
								onClick={() => setNewType("Dorm")}
							/>
						</Col>
						<Col>
							<Form.Check
								className="custom-radio tiny"
								inline
								label="Apartment"
								name="group1"
								type="radio"
								checked={newType === "Apartment"}
								onClick={() => {
									setNewType("Apartment");
								}}
								id={`inline-radio-2`}
							/>
						</Col>
						<Col>
							<Form.Check
								className="custom-radio tiny"
								inline
								label="Hotel"
								name="group1"
								type="radio"
								checked={newType === "Hotel"}
								onClick={() => {
									setNewType("Hotel");
								}}
								id={`inline-radio-3`}
							/>
						</Col>
						<Col>
							<Form.Check
								className="custom-radio tiny"
								inline
								label="Bedspace"
								name="group1"
								type="radio"
								checked={newType === "Bedspace"}
								onClick={() => {
									setNewType("Bedspace");
								}}
								id={`inline-radio-4`}
							/>
						</Col>
					</Row>
					<Row className="input-item">
						<Col xs={4}>
							<p className="small light-green addAccoms">Address</p>
						</Col>
						<Col>
							{" "}
							<input
								className="tiny input-add-accoms"
								type="text"
								onChange={(e) => setNewAddress(e.target.value)}
							/>
						</Col>
					</Row>
					<Row className="input-item">
						<Col xs={4}>
							<p className="small light-green addAccoms">Location</p>
						</Col>
						<Col>
							<Form.Check
								className="custom-radio tiny"
								inline
								label="Inside Campus"
								name="group2"
								type="radio"
								checked={newLocation === "Within Campus"}
								id={`inline-radio-5`}
								onClick={() => setNewLocation("Within Campus")}
							/>
						</Col>
						<Col>
							<Form.Check
								className="custom-radio tiny"
								inline
								label="Outside Campus"
								name="group2"
								type="radio"
								checked={newLocation === "Outside Campus"}
								onClick={() => {
									setNewLocation("Outside Campus");
								}}
								id={`inline-radio-6`}
							/>
						</Col>
					</Row>
					<Row className="input-item">
						<Col xs={4}>
							<p className="small light-green addAccoms">Description</p>
						</Col>
						<Col>
							{" "}
							<textarea
								className="tiny input-add-accoms description"
								onChange={(e) => setNewDescription(e.target.value)}
							/>
						</Col>
					</Row>
					<Row className="input-item">
						<Col xs={4}>
							<p className="small light-green addAccoms">Amenities</p>
						</Col>
						<Col>
							{" "}
							<input
								className="tiny input-add-accoms"
								type="text"
								onChange={(e) => setNewAmenities(e.target.value)}
							/>
						</Col>
					</Row>
					<div className="userProfileModal_detail changePhoto">
						<input
							className="addPhotobtn"
							type="file"
							accept="image/*"
							onChange={handleImageUpload}
						/>
						{selectedImage && (
							<div className="userProfileCenter">
								<div className="userProfile_Container_left_photoAddAccom">
									<img
										className="userPhotoAddAccom"
										src={selectedImage}
										alt="Uploaded"
										style={{ width: "200px" }}
									/>
								</div>
							</div>
						)}
					</div>
					<Row className="input-item">
						<Button onClick={handleAdd} className="add-accoms-btn">
							ADD ACCOMMODATION
						</Button>
						<AlertModals
							show={modalShow}
							onHide={() => setModalShow(false)}
							alert={"Missing fields!"}
						/>
					</Row>
				</Container>
			</Modal.Body>
		</Modal>
	);
}

export default AddAccoms;
