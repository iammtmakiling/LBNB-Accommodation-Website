import { React, useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import LoadingScreenPage from "../../atoms/loadingScreenPage/LoadingScreenPage";
import Terms from "../terms/Terms";
import "./login.css";
import Form from "react-bootstrap/Form";
import { encryptToken } from "../../auth";
import config from "../../config";
const url = config.apiUrl;

function Login(props) {
	const [toggleState, setToggleState] = useState(1);
	const [loading, setLoading] = useState(false);

	const [missingLogin, setMissingLogin] = useState(false);
	const [wrongLogin, setWrongLogin] = useState(false);

	const [loginErrorMessage, setLoginErrorMessage] = useState("");
	const [signupErrorMessage, setSignupErrorMessage] = useState("");
	const [radioClicked, setRadioClicked] = useState(false);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repassword, setRePassword] = useState("");
	const [fname, setFname] = useState("");
	const [lname, setLname] = useState("");
	const [isBusinessAccount, setIsBusinessAccount] = useState(false);

	const [checked, setChecked] = useState(false);

	const toggleTab = (index) => {
		setToggleState(index);
		setLoginErrorMessage("");
		setSignupErrorMessage("");
	};

	useEffect(() => {
		toggleTab(1);
	}, []);

	const handleCheckboxChange = () => {
		setChecked(!checked);
	};

	const handleSignUp = () => {
		setLoading(true);

		if (
			email === "" ||
			password === "" ||
			repassword === "" ||
			fname === "" ||
			lname === ""
		) {
			setSignupErrorMessage("At least one field is missing or invalid!");
			setLoading(false);
			return;
		}

		const regexPattern = /^[\w\d_\.]+@[\w\d]+\.[\w\d.]*[\w\d]+$/;
		const emailMatch = regexPattern.test(email);

		if (!emailMatch) {
			setSignupErrorMessage("Invalid email!");
			setLoading(false);
			return;
		}

		// TODO: check if email exists

		const passwordPattern = /^[a-zA-Z0-9]{8,}$/;
		const passwordMatch = passwordPattern.test(password);

		if (password !== repassword) {
			setSignupErrorMessage("Password do not match!");
			setLoading(false);
			return;
		}

		if (!passwordMatch) {
			setSignupErrorMessage(
				"Password must contain at least 8 alphanumeric characters"
			);
			setLoading(false);
			return;
		}

		if (!radioClicked) {
			setSignupErrorMessage("Click one type of account!");
			setLoading(false);
			return;
		}

		if (!checked) {
			setSignupErrorMessage("Please read the terms and conditions");
			setLoading(false);
			return;
		}

		axios
			.post(url + "/signUp", {
				email: email,
				password: password,
				username: email,
				firstName: fname,
				lastName: lname,
				contactNum: 0,
				isBusinessAccount: isBusinessAccount,
				isPersonalAccount: !isBusinessAccount,
			})
			.then(function (response) {
				if (response.data.message === "Email is already registered.") {
					setSignupErrorMessage("Email is already registered.");
					setLoading(false);
					return;
				}

				handleLogin();

				setSignupErrorMessage("");
				setRadioClicked(false);
				console.log(response.data);
				success = true;
				console.log("user signed up");
				window.location.reload();
				setLoading(false);
			})
			.catch(function (error) {
				console.log("Error!!!");
				console.log(error);
				setLoading(false);
			});
	};

	const handleLogin = () => {
		setLoading(true);

		if (email === "" || password === "") {
			// setMissingLogin(true);
			setLoginErrorMessage("At least one field is missing or invalid!");
			setLoading(false);
			return;
		}

		const regexPattern = /^[\w\d_\.]+@[\w\d]+\.[\w\d.]*[\w\d]+$/;
		const emailMatch = regexPattern.test(email);

		if (!emailMatch) {
			setLoginErrorMessage("Invalid email!");
			setLoading(false);
			return;
		}

		axios
			.post(url + "/login", {
				email: email,
				password: password,
			})
			.then(function (response) {
				if (!response.data) {
					setMissingLogin(true);
					setLoading(false);
				} else if (response.data.success) {
					setLoginErrorMessage("");

					let date = new Date();
					date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
					document.cookie = `authCookie=${encryptToken(
						response.data
					)}; path=/; expires=${date.toUTCString()}`;
					window.location.reload();
					setLoading(false);
				} else if (!response.data.success) {
					setLoginErrorMessage("Wrong credentials!");
					setLoading(false);
				} else {
					setLoading(false);
				}
			})
			.catch(function (error) {
				setLoading(false);
			});
	};

	return (
		<Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Body>
				{/* Log-in */}
				<div className={toggleState === 1 ? "content" : "inactive-content"}>
					<div className="login-container">
						<p className="large-bold">User Login</p>
						<div className="login-container-createAccount">
							<p className="italic">Don't have an account?</p>
							<Button
								className="small-bold createButton"
								onClick={() => toggleTab(2)}
							>
								CREATE AN ACCOUNT
							</Button>
						</div>
						<input
							required
							className="tiny"
							placeholder="Email Address"
							type="text"
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							required
							className="tiny"
							placeholder="Password"
							type="password"
							onChange={(e) => setPassword(e.target.value)}
						/>

						{loading ? (
							<Button className="login-btn" disabled onClick={handleLogin}>
								loading
							</Button>
						) : (
							<Button className="login-btn" onClick={handleLogin}>
								SIGN IN
							</Button>
						)}

						{loginErrorMessage !== "" && (
							<div
								className="tiny text-center"
								style={{ fontStyle: "italic", color: "red" }}
							>
								{loginErrorMessage}
							</div>
						)}

						{/* {missingLogin ? (
              <div
                className="tiny text-center"
                style={{ fontStyle: "italic", color: "red" }}
              >
                At least one field is missing or invalid!
              </div>
            ) : (
              <div></div>
            )}

            {/* Check if invalid email */}
						{/* {invalidEmail && <div
                className="tiny text-center"
                style={{ fontStyle: "italic", color: "red" }}
              >
                Invalid email!
              </div>} */}
					</div>
				</div>
				<div className={toggleState === 2 ? "content" : "inactive-content"}>
					<div className="signup-container">
						<p className="large-bold center">CREATE ACCOUNT</p>
						<div className="fullname-container">
							<input
								required
								className="tiny"
								placeholder="First Name"
								type="text"
								onChange={(e) => setFname(e.target.value)}
							/>
							<input
								required
								className="tiny"
								placeholder="Surname"
								type="text"
								onChange={(e) => setLname(e.target.value)}
							/>
						</div>
						<input
							required
							className="tiny"
							placeholder="Email Address"
							type="text"
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							required
							className="tiny"
							placeholder="Password"
							type="password"
							onChange={(e) => setPassword(e.target.value)}
						/>
						<input
							required
							className="tiny"
							placeholder="Retype Password"
							type="password"
							onChange={(e) => setRePassword(e.target.value)}
						/>
						{/* <input required className="tiny" placeholder='Retype Password' type="password"/> */}

						<Form>
							{["radio"].map((type) => (
								<div key={`inline-${type}`} className="mb-3">
									<Form.Check
										className="tiny"
										inline
										label="Personal Account"
										name="group1"
										type={type}
										id={`inline-${type}-1`}
										onClick={(e) => {
											setIsBusinessAccount(false);
											setRadioClicked(true);
										}}
									/>
									<Form.Check
										className="tiny"
										inline
										label="Business Account"
										name="group1"
										type={type}
										id={`inline-${type}-2`}
										onChange={(e) => setIsBusinessAccount(true)}
										onClick={(e) => setRadioClicked(true)}
									/>

									<div className="terms-div">
										<Terms />
										<Form.Check
											className="tiny"
											type="checkbox"
											id="exampleCheckbox"
											label="I agree to the terms and conditions"
											checked={checked}
											onChange={handleCheckboxChange}
										/>
									</div>
								</div>
							))}
						</Form>

						{loading ? (
							<Button className="login-btn" disabled onClick={handleSignUp}>
								loading
							</Button>
						) : (
							<Button className="login-btn" onClick={handleSignUp}>
								SIGN UP
							</Button>
						)}

						{signupErrorMessage !== "" && (
							<div
								className="tiny text-center"
								style={{ fontStyle: "italic", color: "red" }}
							>
								{signupErrorMessage}
							</div>
						)}

						{/* {missingLogin ? (
              <div
                className="tiny text-center"
                style={{ fontStyle: "italic", color: "red" }}
              >
                At least one field is missing or invalid!
              </div>
            ) : (
              <div></div>
            )}
            {wrongLogin ? (
              <div
                className="tiny text-center"
                style={{ fontStyle: "italic", color: "red" }}
              >
                Incorrect credentials!
              </div>
            ) : (
              <div></div>
            )} */}
						<Button
							className="tiny italic signinButton"
							onClick={() => toggleTab(1)}
						>
							Already have an account?
						</Button>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default Login;
