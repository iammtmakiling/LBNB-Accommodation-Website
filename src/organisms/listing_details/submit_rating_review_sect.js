import { React, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./submit_rating_review_sect.css";
import { Row, Container } from "react-bootstrap";
// import {MUIStarRating, CommentTextField, SubmitButton} from '../../atoms'
import {
	Rating,
	TextField,
	Table,
	TableRow,
	TableCell,
	InputAdornment,
	tableCellClasses,
} from "@mui/material";
import axios from "axios";
import {
	isLoggedIn,
	getAuthUsername,
	getAuthType,
	getAuthName,
	getAuthEmail,
} from "../../auth";
import config from "../../config";
import { AlertModals } from "../../molecules";
const url = config.apiUrl;

const SubmitRatingReviewSect = (props) => {
	const [comment, setComment] = useState("");
	const [rateVal, setRateVal] = useState(0);
	const [alert, setAlert] = useState("");
	const [modalShow, setModalShow] = useState(false);
	const accommName = props.props.ACCOMMODATION_NAME;

	const handleSubmit = () => {
		if (!isLoggedIn() || getAuthType() !== "Student") {
			setModalShow(true);
			return;
		}

		if (!rateVal) {
			console.log("no rating");
			setAlert("Add a rating first!");
			setModalShow(true);
			return;
		}

		const timestamp = new Date(
			new Date().toString().split("GMT")[0] + " UTC"
		).toISOString();

		if (rateVal != 0) {
			axios
				.post(url + "/accommodation/add-review", {
					comment: comment,
					userName: getAuthUsername(),
					timestamp: timestamp,
					accommName: accommName,
					rating: rateVal,
				})
				.then(function (response) {
					console.log(response);
					if (response.success) {
						setAlert("Review successfully submitted!");
						setModalShow(true);
						setTimeout(() => window.location.reload(), 1000);
					} else {
						setAlert(
							"Review unsuccessful. Check your internet or server connection."
						);
						setModalShow(true);
					}
				})
				.catch(function (error) {
					console.log(error);
				});
		}
		setComment("");
		setRateVal(0);
	};

	return (
		<Container className="comment-star-container">
			<h4 className="write-review-header">Write a Review</h4>
			<Row>
				<div className="star-div">
					<Table
						sx={{
							[`& .${tableCellClasses.root}`]: {
								borderBottom: "none",
							},
							width: "10%",
						}}
					>
						<TableRow>
							<TableCell align="left">
								<Rating
									className="rating-medium"
									// defaultValue={3.5}
									precision={0.5}
									// disabled={isLoggedIn() && getAuthType === "Student" ? false : true}
									sx={{
										fontSize: "2rem",
										color: "#1C3103",
									}}
									onChange={(newValue) =>
										setRateVal(parseFloat(newValue.target.value))
									}
									value={rateVal}
								/>
							</TableCell>
						</TableRow>
					</Table>
					<textarea
						className="comment-textfield"
						// sx={{
						//   width: 950,
						// }}
						id="fullWidth"
						placeholder="Got something else to say? Type here!"
						multiline
						// disabled={!(isLoggedIn() && getAuthType === "Student")}
						maxRows={4}
						onChange={(newValue) => setComment(newValue.target.value)}
						value={comment}
					/>
					<button className="submit-button" onClick={handleSubmit}>
						{" "}
						Submit{" "}
					</button>
					<AlertModals
						alert={alert}
						show={modalShow}
						onHide={() => setModalShow(false)}
					/>
					{/* {isLoggedIn() && getAuthType() === "Student" ? (
	return (
		<Container className="comment-star-container">
			<h4 className="write-review-header">Write a Review</h4>
			<Row>
				<div className="star-div">
					<Table
						sx={{
							[`& .${tableCellClasses.root}`]: {
								borderBottom: "none",
							},
							width: "10%",
						}}
					>
						<TableRow>
							<TableCell align="left">
								<Rating
									className="rating-medium"
									// defaultValue={3.5}
									precision={0.5}
									// disabled={isLoggedIn() && getAuthType === "Student" ? false : true}
									sx={{
										fontSize: "2rem",
										color: "#1C3103",
									}}
									onChange={(newValue) =>
										setRateVal(parseFloat(newValue.target.value))
									}
									value={rateVal}
								/>
							</TableCell>
						</TableRow>
					</Table>
					<textarea
						className="comment-textfield"
						// sx={{
						//   width: 950,
						// }}
						id="fullWidth"
						placeholder="Got something else to say? Type here!"
						multiline
						// disabled={!(isLoggedIn() && getAuthType === "Student")}
						maxRows={4}
						onChange={(newValue) => setComment(newValue.target.value)}
						value={comment}
					/>
					<button className="submit-button" onClick={handleSubmit}>
						{" "}
						Submit{" "}
					</button>
					<AlertModals
						alert={alert}
						show={modalShow}
						onHide={() => setModalShow(false)}
					/>
					{/* {isLoggedIn() && getAuthType() === "Student" ? (
          ) : (
            <button className="submit-button" disabled>
              {" "}
              Submit{" "}
            </button>
          )} */}
				</div>
			</Row>
		</Container>
	);
};

export default SubmitRatingReviewSect;
