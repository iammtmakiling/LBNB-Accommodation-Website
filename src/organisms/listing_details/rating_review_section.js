import { React, useState, useEffect } from "react";
import "./rating_review_section.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadingScreenPage from "../../atoms/loadingScreenPage/LoadingScreenPage";
import { Container } from "react-bootstrap";
import { ReviewHeaders, ReviewCommentCard } from "../../molecules";
import axios from "axios";
import config from "../../config";
const url = config.apiUrl;

const RatingReviewSection = (props) => {
	const accommName = props.props.ACCOMMODATION_NAME;
	const userName = props.props.userName;
	const [loading, setLoading] = useState(false);
	// const userName = getAuthEmail();

	//to fetch review from the backend
	const [reviews, setReviews] = useState([]);

	const reviewItems = reviews.map((review) => {
		return (
			<ReviewCommentCard
				key={review.REVIEW_ID}
				rating={review.REVIEW_RATING}
				comment={review.REVIEW_COMMENT}
				date={review.REVIEW_DATE}
				user_id={review.USER_ID}
				accom_id={review.ACCOMMODATION_ID}
				userName={userName}
			/>
		);
	});

	const [reviewRating, setReviewRating] = useState("all");

	const handleToggle = (rating) => {
		setReviewRating(rating);

		axios
			.post(url + "/accommodation/get-reviews", {
				accommodationName: accommName,
			})
			.then(function (response) {
				if (response.data.success) {
					setLoading(false);
					const review_data = response.data.reviews;
					if (rating === "all") {
						setReviews(review_data);
					} else {
						const filterRevs = review_data.filter((data) => {
							if (Math.floor(data.REVIEW_RATING) === parseInt(rating)) {
								return data;
							}
						});
						setReviews(filterRevs);
					}
				} else {
					setLoading(true);
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	return (
		<Container className="review-section-div">
			<ReviewHeaders handleToggle={handleToggle} />
			<div className="rev-comm-card-div">{reviewItems}</div>
		</Container>
	);
};

export default RatingReviewSection;
