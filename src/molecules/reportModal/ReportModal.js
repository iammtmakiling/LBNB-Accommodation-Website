import { React, useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./reportModal.css";
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

function ReportModal(props) {
	const [toggleState, setToggleState] = useState(1);
	const [missingReport, setMissingReport] = useState(false);
	const [report, setReport] = useState("");

	const toggleTab = (index) => {
		setToggleState(index);
	};

	useEffect(() => {
		toggleTab(1);
	}, []);

	const handleReport = () => {
		if (report === "") {
			setMissingReport(true);
			return;
		}

		axios
			.post(url + "/add-report", {
				report: report,
				username: getAuthUsername(),
				accommodationName: props.ACCOMMODATION_NAME
					? props.ACCOMMODATION_NAME
					: "Parkside Residences",
			})
			.then(function (response) {
				if (!response.data) {
					setMissingReport(true);
				} else {
					console.log(response.data);
				}
			})
			.catch(function (error) {
				console.log(error);
			});
		toggleTab(2);
	};

	return (
		<Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Header closeButton>
				<p className="report large-bold">Report Accomodation</p>
			</Modal.Header>
			<Modal.Body>
				{/* Log-in */}
				<div className={toggleState === 1 ? "content" : "inactive-content"}>
					<div className="report-container">
						<p className="reason-text regular-bold">Reason</p>
						<p className="tiny">
							Your report is anonymous, so feel comfortable reporting to make
							LBNB safe for everyone.
						</p>
						<textarea
							onChange={(e) => setReport(e.target.value)}
							className="report-textarea"
							placeholder="Help us understand the problem..."
						/>
						<Button className="report-btn" onClick={handleReport}>
							Submit Report
						</Button>
						{missingReport ? (
							<div
								className="tiny text-center"
								style={{ fontStyle: "italic", color: "red" }}
							>
								Empty field!
							</div>
						) : (
							<div></div>
						)}
					</div>
				</div>
				<div className={toggleState === 2 ? "content" : "inactive-content"}>
					<div className="report-container">
						<p className="reason-text-2 regular-bold">
							Thank you for Submitting
						</p>
						<p className="tiny center-text">
							We take reports seriously and after a thorough review. <br />
							We will take action.
						</p>
						<Button
							className="report-btn-2"
							// onClick=}
							onClick={() => window.location.reload()}
						>
							Close this window
						</Button>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default ReportModal;
