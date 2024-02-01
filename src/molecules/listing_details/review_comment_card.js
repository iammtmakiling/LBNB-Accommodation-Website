import { React, useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./review_comment_card.css";
import { Row, Col, Container } from "react-bootstrap";
import { Rating } from "@mui/material";
const url = "https://elbnb-server.herokuapp.com";

//TODO: fetch user image, implement toggle of stars

const ReviewCommentCard = (props) => {
	const comment = props.comment ? props.comment : "good";
	const user_name = props.userName ? props.userName : "student2";
	const rating = props.rating ? props.rating : 3;

	return (
		<Container className="review-comment-card">
			<Row>
				<Col>
					<div className="name-rating-div">
						<h6 className="name-rating-text">{user_name}</h6>
						<h6 className="name-rating-text">
							<Rating
								className="rating-medium"
								defaultValue={rating}
								precision={0.5}
								readOnly={true}
								sx={{
									fontSize: "1rem",
									color: "#1C3103",
									mr: 1,
								}}
							/>
						</h6>
					</div>
				</Col>
			</Row>
			<Row>
				<div className="comment-div">
					<p> {comment}</p>
				</div>
			</Row>
		</Container>
	);
};

export default ReviewCommentCard;
