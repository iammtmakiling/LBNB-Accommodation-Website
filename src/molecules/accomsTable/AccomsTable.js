import React, { useEffect, useState } from "react";
import "./accomsTable.css";
import config from "../../config";
import { Table, Button } from "react-bootstrap";
import { AlertModals } from "../../molecules";
import axios from "axios";
const url = config.apiUrl;

function AccomsTable(props) {
	const [modalAlertShow, setModalAlertShow] = useState(false);
	const [alert, setAlert] = useState("");
	const [accomBackend, setAccomBackend] = useState([{}]);
	const [selectedAccom, setSelectedAccom] = useState(null);

	const handleCloseModal = () => {
		setSelectedAccom(null);
	};

	const handleDelete = (accom) => {
		axios
			.post(url + "/delete-accommodation", {
				name: accom.ACCOMMODATION_NAME,
			})
			.then((res) => {
				if (res.data.success) {
					setAlert(`Successfully deleted ${accom.ACCOMMODATION_NAME}!`);
					setModalAlertShow(true);
					setTimeout(() => window.location.reload(), 1000);
				} else {
					setAlert(
						`Cannot delete ${accom.ACCOMMODATION_NAME}. Check your Internet connection or server connection.`
					);
					setModalAlertShow(true);
				}
			})
			.catch((err) => console.error(err));
	};

	// fetch all accoms
	useEffect(() => {
		axios
			.post(url + "/filter-accommodation", {
				filters: {
					name: "",
					address: "",
					location: "",
					type: "",
					priceFrom: "",
					priceTo: "",
					capacity: "",
					max_price: "",
				},
			})
			.then(function (response) {
				setAccomBackend(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

	return (
		<div>
			<Table striped hover>
				{/* Header */}
				<thead>
					<tr>
						<th>
							<p className="small-bold">Name</p>
						</th>
						<th>
							<p className="small-bold">Type</p>
						</th>
						<th>
							<p className="small-bold">Description</p>
						</th>
						<th>
							<p className="small-bold">Location</p>
						</th>
						<th>
							<p className="small-bold">Action</p>
						</th>
					</tr>
				</thead>

				<tbody>
					{typeof accomBackend.accommodations === "undefined" ? (
						<p>Loading...</p>
					) : (
						accomBackend.accommodations.map((accom) => {
							const {
								ACCOMMODATION_ID,
								ACCOMMODATION_NAME,
								ACCOMMODATION_TYPE,
								ACCOMMODATION_DESCRIPTION,
								ACCOMMODATION_LOCATION,
							} = accom;
							return (
								<tr key={ACCOMMODATION_ID}>
									<td>
										<p>{ACCOMMODATION_NAME}</p>
									</td>

									<td>
										<p>{ACCOMMODATION_TYPE}</p>
									</td>

									<td>
										<p>{ACCOMMODATION_DESCRIPTION}</p>
									</td>

									<td>
										<p>{ACCOMMODATION_LOCATION}</p>
									</td>

									<td>
										<Button
											className="small admin-delete-btn"
											onClick={() => {
												handleDelete(accom);
											}}
										>
											Delete
										</Button>
									</td>
								</tr>
							);
						})
					)}
				</tbody>
			</Table>

			<AlertModals
				alert={alert}
				show={modalAlertShow}
				onHide={() => setAlertModalShow(false)}
			/>

			{/* ONLY RENDER IF THERE IS A SELECTED STUDENT
        {selectedStudent && (
            <AdminViewUser
            studentInfo={selectedStudent}
            show={true}
            onHide={handleCloseModal}
            />
        )} */}
		</div>
	);
}

export default AccomsTable;
