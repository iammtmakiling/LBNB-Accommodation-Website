import { React, useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./signup.css";
import { Login } from "../../molecules";
import Form from "react-bootstrap/Form";
import config from "../../config";
const url = config.apiUrl;

function Signup(props) {
	const [modalShow, setModalShow] = useState(false);
	const [fname, setFname] = useState("");
	const [lname, setLname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isBusinessAccount, setIsBusinessAccount] = useState(false);
	const [invalidLogin, setInvalidLogin] = useState(false);

	const handleSignUp = () => {
		if (email === "" || password === "" || fname === "" || lname === "") {
			setInvalidLogin(true);
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
				window.location.reload();
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	return (
		<Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Body>
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
									onClick={(e) => setIsBusinessAccount(false)}
								/>
								<Form.Check
									className="tiny"
									inline
									label="Business Account"
									name="group1"
									type={type}
									id={`inline-${type}-2`}
									onChange={(e) => setIsBusinessAccount(true)}
								/>
							</div>
						))}
					</Form>
					<Button className="signup-btn" onClick={handleSignUp}>
						SIGN UP
					</Button>
					{invalidLogin ? (
						<div
							className="tiny text-center"
							style={{ fontStyle: "italic", color: "red" }}
						>
							At least one field is invalid!
						</div>
					) : (
						<div></div>
					)}
					<Button
						className="tiny italic signinButton"
						onClick={() => setModalShow(true)}
					>
						Already have an account?
					</Button>
				</div>
				<Login show={modalShow} onHide={() => setModalShow(false)} />
			</Modal.Body>
		</Modal>
	);
}

export default Signup;
