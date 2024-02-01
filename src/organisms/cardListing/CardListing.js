import { useState, useEffect, React } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./cardListing.css";
import "../../index.css";
import LoadingScreenPage from "../../atoms/loadingScreenPage/LoadingScreenPage";
import config from "../../config";
import { Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { isLoggedIn, getAuthType, getAuthUsername } from "../../auth";
import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import { AddRooms } from "../../molecules";
import { useNavigate } from "react-router-dom";
import { logo } from "../../assets/images";
const url = config.apiUrl;

const CardListing = (props) => {
	let navigate = useNavigate();
	const [modalShow, setModalShow] = useState(false);
	const [loading, setLoading] = useState(true);
	const [isFavorite, setIsFavorite] = useState(false);
	const [photo, setPhoto] = useState(logo);

	const image =
		"https://www.drivenbydecor.com/wp-content/uploads/2019/08/dorm-room-before.jpg";
	const name = props.name ? props.name : "";
	const location = props.location;
	const owner = props.owner ? props.owner : "";
	const address = props.address;
	const description = props.description ? props.description : "";
	const amenities = props.amenities ? props.amenities : "";
	const price = props.max_price ? "Up to ₱" + props.max_price : "";
	const stars = "";

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
					setPhoto(image);
				}
				// return response.data.accommodation;
			} catch (error) {
				console.error(error);
				setPhoto(image);
			}
		};
		fetchData(props.name);
	}, []);

	const handleArchive = () => {
		axios
			.post(url + "/archive-accommodation", {
				name: props.name,
				isArchived: props.isArchived ? 0 : 1,
			})
			.then((res) => {
				window.location.reload();
			})
			.catch((err) => console.error(err));
	};

	const handleFavorite = () => {
		if (!isFavorite && props.name) {
			axios
				.post(url + "/accommodation/add-to-favorites", {
					userName: getAuthUsername(),
					accommName: props.name,
				})
				.then((res) => {
					console.log("Added to favorites of", getAuthUsername());
				})
				.catch((err) => console.error(err));
		} else if (props.name) {
			console.log("Removing from", getAuthUsername());
			axios
				.post(url + "/accommodation/remove-from-favorites", {
					userName: getAuthUsername(),
					accommName: props.name,
				})
				.then((res) => {
					console.log("Removed from favorites of", getAuthUsername());
				})
				.catch((err) => console.error(err));
		}
		setIsFavorite(!isFavorite);
	};

	useEffect(() => {
		if (isLoggedIn() && getAuthType() === "Student") {
			axios
				.post(url + "/accommodation/is-favorite", {
					username: getAuthUsername(),
					accommodationName: props.name,
				})
				.then((res) => {
					setIsFavorite(res.data.isFavorite);
					setLoading(false);
				})
				.catch((err) => console.error(err));
		} else {
			setLoading(false);
		}
	}, [props.name]);

	const newClass = `card-listing zoom-in-effect ${
		props.isArchived ? "archived" : ""
	}`;

	return (
		<div className={newClass}>
			{/* fixed variable width column */}
			<Col md="auto">
				<div className="img-div">
					<img
						className="accommodation-img"
						src={photo}
						alt="accommodation-img"
					></img>
					<div className="heart-button">
						{isLoggedIn() && getAuthType() === "Student" ? (
							isFavorite ? (
								<RiHeart3Fill onClick={handleFavorite} className="heart-icon" />
							) : (
								<RiHeart3Line onClick={handleFavorite} className="heart-icon" />
							)
						) : (
							<></>
						)}
					</div>
				</div>
			</Col>

			<Col xs={6}>
				<div className="middle-section add-padding">
					<div className="name-loc-section">
						<h1 className="large-bold accom-name">{name}</h1>
						{props.owner ? (
							<p className="small">
								<Link
									to="/landlordprofile"
									state={{ name: owner, username: props.owner_username }}
								>
									leased by {owner}
								</Link>
							</p>
						) : (
							<></>
						)}
						<p className="small">
							{location} - {address}
						</p>
					</div>
					<p className="small accom-desc">
						{description + ". " + amenities + "."}
					</p>
				</div>
			</Col>

			<Col>
				<div className="right-section add-padding">
					<div className="price-section">
						<h2 className="large-bold price-range">{price}</h2>
						<div>
							<p className="small review-stars">
								{props.rating ? (
									<Rating
										className="rating-medium"
										name="read-only"
										value={props.rating}
									/>
								) : (
									stars
								)}
							</p>
						</div>
					</div>
					{getAuthUsername() === props.owner_username ? (
						<div>
							<Button
								className="small-bold carousel-btn"
								onClick={(e) => setModalShow(true)}
							>
								Add Room
							</Button>
							<AddRooms
								show={modalShow}
								accommodationName={name}
								onHide={() => setModalShow(true)}
							/>
						</div>
					) : (
						<></>
					)}
					{getAuthUsername() === props.owner_username ? (
						<div>
							<Button
								className="small-bold carousel-btn"
								onClick={(e) => handleArchive()}
							>
								{props.isArchived ? "Unarchive" : "Archive"}
							</Button>
						</div>
					) : (
						<></>
					)}
					<Button
						className="small-bold carousel-btn"
						onClick={() =>
							navigate("/details", { state: { props: props.unit } })
						}
					>
						View More
					</Button>
				</div>
			</Col>
		</div>
	);
};

export default CardListing;
