import React, { useState, useEffect } from "react";
import "./hotels.css";
import Button from "react-bootstrap/Button";
import { banner1 } from "../../assets/images";
import { useNavigate } from "react-router-dom";
// import { StarRating } from "../../atoms";
import { Rating } from "@mui/material";
import axios from "axios";
import config from "../../config";
import { logo } from "../../assets/images";
const url = config.apiUrl;

const Hotels = ({ topHotels }) => {
	let navigate = useNavigate();
	const [photo, setPhoto] = useState(null);

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
			} catch (error) {
				console.error(error);
				setPhoto(banner1);
			}
		};

		fetchData(topHotels.ACCOMMODATION_NAME);
	}, []);
	return (
		<div className="hotels-carousel-container">
			<div className=" hotels-carousel">
				<div className="hotels-carousel-left">
					<img
						className="shine-div d-block w-100 photo"
						src={photo}
						alt="First slide"
						loading="lazy"
					/>
				</div>
				<div className="hotels-carousel-right">
					<p className="large-bold">{topHotels.ACCOMMODATION_NAME}</p>
					<Rating name="read-only" readOnly value={topHotels.AVERAGE_RATING} />
					<p className="small">{topHotels.ACCOMMODATION_DESCRIPTION}</p>
					<Button
						className="small-bold carousel-btn"
						onClick={() => {
							navigate("/details", { state: { props: topHotels } });
						}}
					>
						{" "}
						View More{" "}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Hotels;
