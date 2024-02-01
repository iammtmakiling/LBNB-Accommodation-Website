import { React, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./listing_details.css";
import LoadingScreenPage from "../../atoms/loadingScreenPage/LoadingScreenPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Button, Row, Col, Container } from "react-bootstrap";
import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import { MdReportGmailerrorred } from "react-icons/md";
import { Rating } from "@mui/material";
import { ReportModal } from "../../molecules";
import axios from "axios";
import ChatButton from "../../atoms/chatButton/chatButton";

import { isLoggedIn, getAuthUsername, getAuthType } from "../../auth";
import config from "../../config";
const url = config.apiUrl;
import { logo } from "../../assets/images";

const ListingDetails = (props) => {
	const socket = props.socket;
	const userName = getAuthUsername();
	const ownerName = props.props.USER_FNAME + " " + props.props.USER_LNAME;
	const accommName = props.props.ACCOMMODATION_NAME;
	const address = props.props.ACCOMMODATION_ADDRESS;
	const location_place = props.props.ACCOMMODATION_LOCATION;
	const rating = props.props.rating;
	const description = props.props.ACCOMMODATION_DESCRIPTION;
	const amenities = props.props.ACCOMMODATION_AMENITIES;
	const separator = "|";
	const [modalShow, setModalShow] = useState(false);
	const [rooms, setRooms] = useState([]);

	const [isFavorite, setIsFavorite] = useState(false);
	const [photo, setPhoto] = useState(logo);
	const [loading, setLoading] = useState(true);

	const image =
		"https://www.drivenbydecor.com/wp-content/uploads/2019/08/dorm-room-before.jpg";

	useEffect(() => {
		const fetchData = async (photo) => {
			try {
				const response = await axios.post(
					url + "/accommodation/get-accommodation-pic",
					{ accommodationName: photo }
				);
				if (response.data.success === true) {
					setPhoto(response.data.imageUrl);
					setLoading(false);
				} else {
					setPhoto(image);
					setLoading(false);
				}
				// return response.data.accommodation;
			} catch (error) {
				console.error(error);
				setLoading(false);
				// return [];
			}
		};
		// console.log("Name: ", topApartments.ACCOMMODATION_NAME);
		fetchData(accommName);
	}, []);

	// load if favorite
	useEffect(() => {
		if (isLoggedIn() && getAuthType() === "Student") {
			axios
				.post(url + "/accommodation/is-favorite", {
					username: getAuthUsername(),
					accommodationName: accommName,
				})
				.then((res) => {
					setIsFavorite(res.data.isFavorite);
				})
				.catch((err) => console.error(err));
		} else {
		}
	}, []);

	const handleFavorite = () => {
		if (!isFavorite) {
			axios
				.post(url + "/accommodation/add-to-favorites", {
					userName: getAuthUsername(),
					accommName: accommName,
				})
				.then((res) => {
					console.log("Added to favorites of", getAuthUsername());
					console.log(res.data);
				})
				.catch((err) => console.error(err));
		} else {
			axios
				.post(url + "/accommodation/remove-from-favorites", {
					userName: getAuthUsername(),
					accommName: accommName,
				})
				.then((res) => {
					console.log("Removed from favorites of", getAuthUsername());
					console.log(res.data);
				})
				.catch((err) => console.error(err));
		}
		setIsFavorite(!isFavorite);
	};

	useEffect(() => {
		axios
			.post(url + "/accommodation/get-rooms", {
				accommodationName: accommName,
			})
			.then(function (response) {
				if (response.data.success) {
					setRooms(response.data.rooms);
				}
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
	}, [accommName]);

	const [max_price, setPrice] = useState(props.props.max_price);
	const [capacity, setCapacity] = useState(props.props.max_capacity);

	const handleClick = (room) => {
		setPrice(room.ROOM_PRICE);
		setCapacity(String(room.ROOM_CAPACITY));

		//to fetch room image
		// axios
		//   .post(url + "/room/get-room-pic", {
		//     roomName: room.ROOM_NAME,
		//     accommodationName: accommName,
		//   })
		//   .then(function (response) {
		//     if (response.data.success) {
		//       setRoomPIc(response.data.imageUrl);
		//     }
		//     console.log(response);
		//   })
		//   .catch(function (error) {
		//     console.log(error);
		//   });
	};

	const roomItems = rooms.map((room) => {
		return (
			<button
				key={room.ROOM_ID}
				className="roomsbtn r-add-style"
				onClick={() => handleClick(room)}
			>
				{" "}
				{room.ROOM_NAME}
			</button>
		);
	});

	// const [modalShow, setModalShow] = useState(false);

	return (
		<Container>
			{loading === true ? (
				<div className="centeredSpinner">
					<LoadingScreenPage size={80} color={"#4f4a47"} loading={loading} />
				</div>
			) : (
				<div>
					<Row className="listing-detials">
						<div className="room-img-div">
							<img
								className="room-img"
								src={photo}
								alt="accommodation-img"
							></img>
							<div>
								{isLoggedIn() && getAuthType() === "Student" ? (
									isFavorite ? (
										<RiHeart3Fill
											onClick={handleFavorite}
											className="heart-icon heart-button"
										/>
									) : (
										<RiHeart3Line
											onClick={handleFavorite}
											className="heart-icon heart-button"
										/>
									)
								) : (
									<></>
								)}
							</div>
						</div>
						<Col>
							<div className="name-location-div">
								<div className="name-location-section">
									<h1 className="headings">{accommName}</h1>
									<h7 className="headings">
										{address} - {location_place}
									</h7>
									<div class="star-separator-capacity-div">
										<p className="star-separator-capacity-text">
											{!rating ? (
												<p className="rate-text small">Not Rated</p>
											) : (
												<div>
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
												</div>
											)}
											{separator}{" "}
										</p>
										<p className="star-separator-capacity">
											{capacity} Capacity
										</p>
									</div>
									{!max_price ? (
										<p></p>
									) : (
										<h2 className="headings-price">₱{max_price}</h2>
									)}
									<p></p>
									<p>{description}</p>
									<p>{amenities}</p>
								</div>
								<div className="room-buttons">
									<div>{roomItems}</div>
								</div>
								{isLoggedIn() &&
								(getAuthType() === "Student" || getAuthType() === "Owner") ? (
									<ChatButton
										username={userName}
										room={accommName}
										socket={socket}
									/>
								) : (
									<></>
								)}
							</div>
						</Col>
						<Col className="heart-icon-col">
							{getAuthType() === "Student" ? (
								<Button
									className="report-button"
									onClick={() => setModalShow(true)}
								>
									<MdReportGmailerrorred className="icon report-icon" />
								</Button>
							) : (
								<p></p>
							)}
						</Col>
					</Row>
					<ReportModal show={modalShow} onHide={() => setModalShow(false)} />
				</div>
			)}
		</Container>
	);
};

export default ListingDetails;
