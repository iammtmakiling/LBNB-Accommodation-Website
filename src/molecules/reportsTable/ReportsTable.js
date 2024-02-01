import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import config from "../../config";
// import { AdminViewUser, AdminViewLandlord } from "../../molecules";
import axios from "axios";
const url = config.apiUrl;

function ReportsTable(props) {
	// const [modalShow, setModalShow] = useState(false);
	const [reports, setReports] = useState([]);
	const [selectedReport, setSelectedReport] = useState(null);

	const readableDateTime = (dateString) => {
		const date = new Date(dateString);
		const options = {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
			second: "numeric",
			timeZone: "UTC",
		};
		const readableTime = date.toLocaleTimeString("en-US", options);
		return readableTime;
	};

	// fetch all accoms
	useEffect(() => {
		axios
			.get(url + "/view-all-reports")
			.then(function (response) {
				setReports(response.data.results);
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
							<p className="small-bold">Date</p>
						</th>
						<th>
							<p className="small-bold">Accom Name</p>
						</th>
						<th>
							<p className="small-bold">Reporter</p>
						</th>
						<th>
							<p className="small-bold">Report</p>
						</th>
					</tr>
				</thead>

				<tbody>
					{typeof reports === "undefined" ? (
						<p>Loading...</p>
					) : (
						reports.map((report) => {
							const {
								REPORT_DATE,
								ACCOMMODATION_NAME,
								USER_FNAME,
								USER_LNAME,
								REPORT_DETAILS,
							} = report;

							return (
								<tr>
									<td>
										<p>{readableDateTime(REPORT_DATE)}</p>
									</td>

									<td>
										<p>{ACCOMMODATION_NAME}</p>
									</td>

									<td>
										<p>{USER_FNAME + " " + USER_LNAME}</p>
									</td>

									<td>
										<p>{REPORT_DETAILS}</p>
									</td>
								</tr>
							);
						})
					)}
				</tbody>
			</Table>

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

export default ReportsTable;
