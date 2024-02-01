import { React, useState, useEffect } from "react";
import cookie from "cookie";
import "./adminPanel.css";
import "../../index.css";
import {
	UserTable,
	LandlordTable,
	AccomsTable,
	ReportsTable,
} from "../../molecules";

import { isLoggedIn, getAuthType } from "../../auth";

const AdminPanel = () => {
	const [toggleState, setToggleState] = useState(1);
	const [modalShow, setModalShow] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);

	// function to toggle tabs
	const toggleTab = (index) => {
		setToggleState(index);
	};

	useEffect(() => {
		// Check if authToken exists in cookie
		if (isLoggedIn() && getAuthType() === "Admin") {
			setIsAdmin(true);
		} else {
			setIsAdmin(false);
		}
	}, []);

	return (
		<div className="admin-panel-div">
			{isAdmin ? (
				<div>
					<h1 className="large-bold">ADMIN PANEL</h1>

					{/* Tabs */}
					<div className="bloc-tabs">
						{/* User Tab */}
						<div
							className={
								toggleState === 1
									? "tabs small-bold active-tabs"
									: "tabs small-bold"
							}
							onClick={() => toggleTab(1)}
						>
							Users
						</div>

						{/* Owner Tab */}
						<div
							className={
								toggleState === 2
									? "tabs small-bold active-tabs"
									: "tabs small-bold"
							}
							onClick={() => toggleTab(2)}
						>
							Owners
						</div>

						{/* Accoms Tab */}
						<div
							className={
								toggleState === 3
									? "tabs small-bold active-tabs"
									: "tabs small-bold"
							}
							onClick={() => toggleTab(3)}
						>
							Accoms
						</div>

						{/* Reports Tab */}
						<div
							className={
								toggleState === 4
									? "tabs small-bold active-tabs"
									: "tabs small-bold"
							}
							onClick={() => toggleTab(4)}
						>
							Reports
						</div>
					</div>
					<div className="tab-header active-tabs"></div>

					{/* Content */}
					<div className="content-tabs">
						{/* Content 1 */}
						<div
							className={
								toggleState === 1
									? "tcontent active-content"
									: "tcontent inactive-content"
							}
						>
							<UserTable />
						</div>

						{/* Content 2 */}
						<div
							className={
								toggleState === 2
									? "tcontent active-content"
									: "tcontent inactive-content"
							}
						>
							<LandlordTable />
						</div>

						{/* Content 3 */}
						<div
							className={
								toggleState === 3
									? "tcontent active-content"
									: "tcontent inactive-content"
							}
						>
							<AccomsTable />
						</div>

						{/* Content 3 */}
						<div
							className={
								toggleState === 4
									? "tcontent active-content"
									: "tcontent inactive-content"
							}
						>
							<ReportsTable />
						</div>
					</div>
				</div>
			) : (
				<div>Unauthorized route.</div>
			)}
		</div>
	);
};

export default AdminPanel;
