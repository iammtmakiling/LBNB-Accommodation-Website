import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./addRooms.css";
import { Container, Row, Col } from "react-bootstrap";
import config from "../../config";
const url = config.apiUrl;

function AddRooms(props) {
	const [newName, setNewName] = useState("");
	const [newCapacity, setNewCapacity] = useState(0);
	const [newPrice, setNewPrice] = useState(0);
	const handleAdd = () => {
		if (!newName || !newCapacity || !newPrice) {
			window.alert("Invalid field!");
			return;
		}

		axios
			.post(url + "/accommodation/add-room", {
				name: newName,
				capacity: newCapacity,
				price: newPrice,
				accommodationName: props.accommodationName,
			})
			.then((res) => {
				console.log(res.data);
				window.location.reload();
			})
			.catch((err) => console.error(err));
	};

	return (
		<Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Header closeButton></Modal.Header>
			<Modal.Body>
				<Container className="add-accoms-container">
					<Row className="input-item">
						<Col>
							<p className="large-bold">Add Rooms</p>
						</Col>
					</Row>
					<Row className="input-item">
						<Col xs={4}>
							<p className="small light-green">Room Name</p>
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
							<p className="small light-green">Capacity</p>
						</Col>
						<Col>
							{" "}
							<input
								min={1}
								className="tiny input-add-accoms"
								type="Number"
								onChange={(e) => setNewCapacity(e.target.value)}
							/>
						</Col>
					</Row>
					<Row className="input-item">
						<Col xs={4}>
							<p className="small light-green">Price</p>
						</Col>
						<Col>
							{" "}
							<input
								min={1}
								className="tiny input-add-accoms"
								type="Number"
								onChange={(e) => setNewPrice(e.target.value)}
							/>
						</Col>
					</Row>
					<Row className="input-item">
						<Button onClick={handleAdd} className="add-accoms-btn">
							ADD ROOMS
						</Button>
					</Row>
				</Container>
			</Modal.Body>
		</Modal>
	);
}

export default AddRooms;
