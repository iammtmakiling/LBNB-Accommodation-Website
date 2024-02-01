import React, { useState, useEffect } from "react";
import "./apartment.css";
import config from "../../config";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { banner1 } from "../../assets/images";
import { Rating } from "@mui/material";
// import { StarRating } from "../../atoms";
import axios from "axios";
import { logo } from "../../assets/images";
const url = config.apiUrl;

const Apartment = ({ topApartments }) => {
	const [photo, setPhoto] = useState(null);
	let navigate = useNavigate();

	useEffect(() => {
		const fetchData = async (photo) => {
			try {
				const response = await axios.post(
					url + "/accommodation/get-accommodation-pic",
					{ accommodationName: photo }
				);
				if (response.data.success === true) {
					setPhoto(response.data.imageUrl);
				} else {
					setPhoto(banner1);
				}
				// return response.data.accommodation;
			} catch (error) {
				console.error(error);
				// return [];
			}
		};

		// console.log("Name: ", topApartments.ACCOMMODATION_NAME);
		fetchData(topApartments.ACCOMMODATION_NAME);
	}, []);
	return (
		<div className="apartment-carousel-container">
			<div className="shine-div carousel-container">
				<div className="carousel-upper">
					<img
						className="d-block w-100"
						src={photo}
						alt="First slide"
						loading="lazy"
					/>
				</div>
				<div className="carousel-lower">
					<div className="carousel-lowerleft">
						<p className="apartment-title large-bold">
							{topApartments.ACCOMMODATION_NAME}
						</p>
						<Rating
							name="read-only"
							readOnly
							value={topApartments.AVERAGE_RATING}
						/>
						<p className="small">{topApartments.ACCOMMODATION_DESCRIPTION}</p>
					</div>
					<div className="carousel-lowerright">
						<Button
							className="small-bold carousel-btn"
							// onClick={(
							//   props = {topApartments}
							//   ) => {
							//   window.location.href += "details";
							//   // Additional code logic that uses props
							// }}
							onClick={() => {
								console.log(topApartments);
								navigate("/details", { state: { props: topApartments } });
							}}
						>
							{" "}
							View More{" "}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Apartment;
