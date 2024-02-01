import { React, useState, useEffect } from "react";
import axios from "axios";
import FormData from "form-data";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import "./userProfileModal.css";
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

function UserProfileModal(props) {
	const [toggleState, setToggleState] = useState(1);
	const [newFname, setNewFname] = useState("");
	const [newLname, setNewLname] = useState("");
	const [newnumber, setNewnumber] = useState("");
	const [newemail, setNewemail] = useState("");
	const [password, setpassword] = useState("");
	const [newpassword, setNewpassword] = useState("");
	const [retypepassword, setretypepassword] = useState("");
	const [isChecked, setIsChecked] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [fileStream, setFileStream] = useState(null);
	const [selectedImage, setSelectedImage] = useState(null);

	const handleImageUpload = (event) => {
		const file = event.target.files[0];
		setFileStream(file);
		setSelectedImage(URL.createObjectURL(file));
	};

	const handleCheckboxChange = () => {
		setIsChecked(!isChecked);
	};

	const toggleTab = (index) => {
		setToggleState(index);
	};

	useEffect(() => {
		toggleTab(1);
	}, []);

	const handleClick = () => {
		setLoading(true);

		if (isChecked === false) {
			if (password === "") {
				setError("Password Field is Empty!");
				console.log(error);
				setLoading(false);
				return;
			}

			const formData = new FormData();
			formData.append("username", getAuthUsername());
			formData.append("data", fileStream);

			axios
				.post(url + "/edit-user", {
					email: getAuthEmail(),
					newUsername: newemail ? newemail : getAuthEmail(),
					newFirstName: newFname ? newFname : getAuthName().split(" ")[0],
					newLastName: newLname ? newLname : getAuthName().split(" ")[1],
					newContactNum: newnumber ? newnumber : getAuthMobile(),
					newPassword: newpassword ? newpassword : "",
					password: password,
				})
				.then((res) => {
					if (res.data.success === false) {
						setError("Invalid Password");
						setLoading(false);
					} else {
						console.log("Success edit");
						setError("");
						setLoading(false);
						toggleTab(2);

						axios
							.post(url + "/user/upload-user-pic", formData, {
								headers: { "Content-Type": "multipart/form-data" },
							})
							.then(window.location.reload())
							.catch((err) => console.error(err));
					}
				})
				.catch((err) => console.error(err));
		} else {
			const passwordPattern = /^[a-zA-Z0-9]{8,}$/;
			const passwordMatch = passwordPattern.test(newpassword);

			if (password === "") {
				setError("Old Password Field is Empty!");
				setLoading(false);
				return;
			}

			if (!passwordMatch) {
				setError("Password must contain at least 8 alphanumeric characters");
				setLoading(false);
				return;
			}

			if (newpassword !== retypepassword) {
				setError("New Password does not match!");
				setLoading(false);
				return;
			}

			if (newpassword === retypepassword) {
				axios
					.post(url + "/edit-user", {
						email: getAuthEmail(),
						newUsername: newemail ? newemail : getAuthEmail(),
						newFirstName: newFname ? newFname : getAuthName().split(" ")[0],
						newLastName: newLname ? newLname : getAuthName().split(" ")[1],
						newContactNum: newnumber ? newnumber : getAuthMobile(),
						newPassword: newpassword ? newpassword : "",
						password: password,
					})
					.then((res) => {
						console.log(res.data);
						if (res.data.success === false) {
							setLoading(false);
						} else {
							setError("");
							setLoading(false);
							toggleTab(2);
							window.location.reload();
						}
					})
					.catch((err) => console.error(err));
			} else {
				setError("New Password did not match!");
			}
		}
	};

	return (
		<Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Header closeButton></Modal.Header>
			<Modal.Body>
				{/* Log-in */}
				<div className={toggleState === 1 ? "content" : "inactive-content"}>
					<div className="report-container">
						<p className="report large-bold">Edit User Info</p>
						<div className="userProfileModal_detail">
							<p className="small userProfileModal_text">First Name</p>
							<input
								required
								className="tiny userProfileInput"
								placeholder={props.fname}
								type="text"
								onChange={(e) => setNewFname(e.target.value)}
							/>
						</div>
						<div className="userProfileModal_detail">
							<p className="small userProfileModal_text">Surname</p>
							<input
								required
								className="tiny userProfileInput"
								placeholder={props.lname}
								type="text"
								onChange={(e) => setNewLname(e.target.value)}
							/>
						</div>
						<div className="userProfileModal_detail">
							<p className="small userProfileModal_text">Number</p>
							<input
								required
								className="tiny userProfileInput"
								placeholder="09XXXXXXXX"
								type="text"
								onChange={(e) => setNewnumber(e.target.value)}
							/>
						</div>
						<div className="userProfileModal_detail">
							<p className="small userProfileModal_text">Email</p>
							<input
								required
								className="tiny userProfileInput"
								placeholder={props.email}
								type="text"
								onChange={(e) => setNewemail(e.target.value)}
							/>
						</div>
						<div className="userProfileModal_detail changePhoto">
							<input
								className="addPhotobtn"
								type="file"
								accept="image/*"
								onChange={handleImageUpload}
							/>
							{selectedImage && (
								<div className="userProfileCenter">
									<div
										className="userProfile_Container_left_photo"
										style={{ margin: "20px" }}
									>
										<img className="userPhoto" src={selectedImage} />
									</div>
									{/* <div className="userProfile_Container_left_photoAddAccom">
                    <img
                      className="userPhotoAddAccom"
                      src={selectedImage}
                      alt="Uploaded"
                      style={{ width: "200px" }}
                    />
                  </div> */}
								</div>
							)}
						</div>
						{isChecked === true ? (
							<div>
								<div className="userProfileModal_detail">
									<p className="small userProfileModal_text">Old Password</p>
									<input
										required
										className="tiny userProfileInput"
										placeholder="********"
										type="password"
										onChange={(e) => setpassword(e.target.value)}
									/>
								</div>
								<div className="userProfileModal_detail">
									<p className="small userProfileModal_text">New Password</p>
									<input
										required
										className="tiny userProfileInput"
										placeholder="********"
										type="password"
										onChange={(e) => setNewpassword(e.target.value)}
									/>
								</div>
								<div className="userProfileModal_detail">
									<p className="small userProfileModal_text">
										Retype New Password
									</p>
									<input
										required
										className="tiny userProfileInput"
										placeholder="********"
										type="password"
										onChange={(e) => setretypepassword(e.target.value)}
									/>
								</div>
							</div>
						) : (
							<div>
								<div className="userProfileModal_detail">
									<p className="small userProfileModal_text">Password</p>
									<input
										required
										className="tiny userProfileInput"
										placeholder="********"
										type="password"
										onChange={(e) => setpassword(e.target.value)}
									/>
								</div>
							</div>
						)}
						<div className="userProfileModal_detail">
							<Form.Check
								className="userProfile_checkbox"
								type="checkbox"
								label="Change Password"
								state={isChecked}
								style={{ "--bs-input-checked-bg": "#9caa64" }} // Change color here
								onClick={handleCheckboxChange}
							/>
						</div>
						{loading ? (
							<Button
								className="userProfileModal_Button"
								disabled
								onClick={handleClick}
							>
								loading...
							</Button>
						) : (
							<Button className="userProfileModal_Button" onClick={handleClick}>
								Save Changes
							</Button>
						)}
						{{ error } !== "" ? (
							<p className="small errorPrompt">{error}</p>
						) : (
							<p></p>
						)}
					</div>
				</div>
				<div className={toggleState === 2 ? "content" : "inactive-content"}>
					<div className="report-container">
						<p className="reason-text-2 regular-bold">User Info Updated</p>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default UserProfileModal;
