import { React, useState, useEffect } from "react";
import axios from "axios";
import "./LandlordProfile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { defaultPhoto, loading } from "../../assets/images";
import { UserProfileModal, AddAccoms, Unauthorized } from "../../molecules";
import {
	Container,
	Row,
	Col,
	Image,
	Button,
	// Dropdown,
	// DropdownButton,
} from "react-bootstrap";
import { CardListingAddRoom, NavBar } from "../../organisms";
import { Rating } from "@mui/material";
import { CardListing } from "../../organisms";
import { useLocation } from "react-router-dom";
import {
	isLoggedIn,
	getAuthUsername,
	getAuthType,
	getAuthName,
	getAuthMobile,
	getAuthEmail,
} from "../../auth";
import { noUnits } from "../../assets/images";
import config from "../../config";
const url = config.apiUrl;

const LandlordProfile = () => {
	const location = useLocation();

	const [editing, setEditing] = useState(false);
	const [rating, setRating] = useState(4);
	const [owned, setOwned] = useState([]);
	const [number, setNumber] = useState("");
	const [email, setEmail] = useState("");
	const [dp, setDP] = useState("");
	const [toggleState, setToggleState] = useState(1);
	const [modalShow1, setModalShow1] = useState(false);
	const [modalShow, setModalShow] = useState(false);
	const [load, setLoad] = useState(true);
	// const [number, setNumber] = useState(getAuthMobile());

	// function to toggle tabs
	const toggleTab = (index) => {
		setToggleState(index);
	};

	useEffect(() => {
		setLoad(true);

		console.log("Searching for ", location.state.username);
		axios
			.post(url + "/filter-users", {
				name: location.state.username,
				isStudent: false,
			})
			.then((res) => {
				console.log(res.data);
				setNumber(res.data.users[0].USER_CONTACTNUM);
				setEmail(res.data.users[0].USER_EMAIL);
			})
			.catch((err) => console.error(err));

		// get accoms here
		axios
			.post(url + "/accommodation/get-user-accommodations", {
				ownerName: location.state.username,
			})
			.then((res) => {
				if (res.data.result) setOwned(res.data.result);
				setLoad(false);
			})
			.catch((err) => {
				setLoad(false);
				console.error(err);
			});

		axios
			.post(url + "/owner/get-average-rating", {
				username: location.state.username,
			})
			.then((res) => {
				if (res.data.success) setRating(res.data.averageRating);
			})
			.catch((err) => console.error(err));

		axios
			.post(url + "/user/get-user-pic", { username: email })
			.then((res) => setDP(res.data.imageUrl))
			.catch((err) => console.error(err));
	}, [email, location.state.username]);

	return (
		<div>
			<NavBar />
			{isLoggedIn() ? (
				<div className="userProfile_Container">
					<div className="userProfile_Container_left">
						<div className="userProfile_Container_left_photo">
							<Image className="userPhoto" src={defaultPhoto} />
						</div>
						<div className="userProfile_Container_left_details">
							<p className="header4 userProfile_name">{getAuthName()}</p>
							<Rating
								className="rating-medium"
								readOnly
								value={2.5}
								precision={0.5}
								sx={{
									fontSize: "3rem",
									color: "#F0AF01",
								}}
							/>
							{getAuthMobile() === 0 ? (
								<p className="regular userProfile_number">{getAuthMobile()}</p>
							) : (
								<p></p>
							)}
							<p className="regular userProfile_email">{getAuthEmail()}</p>
							<Button
								className="userProfile_editButton"
								onClick={() => setModalShow1(true)}
							>
								Edit User Information
							</Button>
							<Button
								className="userProfile_editButton"
								onClick={() => setModalShow(true)}
							>
								Add Accomodation
							</Button>
							<AddAccoms show={modalShow} onHide={() => setModalShow(false)} />
							<UserProfileModal
								fname={getAuthName().split(" ")[0]}
								lname={getAuthName().split(" ")[1]}
								email={getAuthEmail()}
								number={getAuthMobile()}
								show={modalShow1}
								onHide={() => setModalShow1(false)}
							/>
						</div>
					</div>
					<div className="userProfile_Container_right">
						<p className="header4 addAccoms"> Units Owned </p>
						{load === true ? (
							<div className="loadingContainer">
								<img className="loading" src={loading} alt="loading" />
								<p className="header4 noResultText">loading...</p>
							</div>
						) : (
							<Row className="cardlist-list justify-content-md-center mt-4">
								{owned.length === 0 ? (
									<div className="noUnits">
										<img src={noUnits} alt="image" />
										<p className="regular">No Owned Units</p>
									</div>
								) : (
									owned.map((unit, index) => (
										<div className="cardlist-flex mb-5">
											<CardListing
												key={index}
												unit={unit}
												owner_username={location.state.username}
												name={unit.ACCOMMODATION_NAME}
												location={unit.ACCOMMODATION_LOCATION}
												description={unit.ACCOMMODATION_DESCRIPTION}
												amenities={unit.ACCOMMODATION_AMENITIES}
												address={unit.ACCOMMODATION_ADDRESS}
												max_price={unit.max_price}
												owner={""}
												rating={unit.rating}
												isArchived={unit.ACCOMMODATION_ISARCHIVED}
											/>
										</div>
									))
								)}
							</Row>
						)}
					</div>
				</div>
			) : (
				<Container>
					<Unauthorized />
				</Container>
			)}
		</div>
	);
};

export default LandlordProfile;
