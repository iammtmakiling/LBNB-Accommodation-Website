import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Suspense, lazy } from "react";
import "./App.css";
import io from "socket.io-client";

import { getAuthUsername } from "./auth";

import { Home } from "./pages";
import LoadingScreenPage from "./atoms/loadingScreenPage/LoadingScreenPage";

const socket = io.connect("https://chat-remote-server.herokuapp.com");

const AccomsPage = lazy(() => import("./pages/accomsPage/AccomsPage.js"));
const AdminPage = lazy(() => import("./pages/adminPage/AdminPage.js"));
// const Home = lazy(()=> import("./pages/home/Home.js"));
const LandlordHome = lazy(() => import("./pages/landlordHome/LandlordHome.js"));
const LandlordProfile = lazy(() =>
	import("./pages/landlord_profile/LandlordProfile.js")
);
const Listing = lazy(() => import("./pages/listing/Listing.js"));
const UserProfile = lazy(() => import("./pages/userProfile/UserProfile.js"));
const Details = lazy(() => import("./pages/detailsPage/details.js"));
const Chat = lazy(() => import("./pages/chatPage/chat.js"));
const DevPage = lazy(() => import("./pages/devPage/DevPage.js"));
const NotFound = lazy(() => import("./pages/notFound/NotFound.js"));

const App = () => {
	const userName = getAuthUsername();
	const [room, setRoom] = useState("");
	const handleDataReceivedForChat = (data) => {
		// Access and utilize the data received from the child component
		console.log("Handle Data Received for Chat:");
		const accommName = data.ACCOMMODATION_NAME;
		setRoom(accommName);
	};

	return (
		<Suspense fallback={<LoadingScreenPage />}>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/AccomsPage"
					element={
						<div>
							<AccomsPage />
						</div>
					}
				/>
				<Route
					path="/AdminPage"
					element={
						<div>
							<AdminPage />
						</div>
					}
				/>
				<Route
					path="/LandlordHome"
					element={
						<div>
							<LandlordHome />
						</div>
					}
				/>
				<Route
					path="/LandlordProfile"
					element={
						<div>
							<LandlordProfile />
						</div>
					}
				/>
				<Route
					path="/Listing"
					element={
						<div>
							<Listing />
						</div>
					}
				/>
				<Route
					path="/UserProfile"
					element={
						<div>
							<UserProfile />
						</div>
					}
				/>
				<Route
					path="/Details"
					element={
						<div>
							<Details
								onDataReceived={handleDataReceivedForChat}
								socket={socket}
							/>
						</div>
					}
				/>
				<Route
					path="/chat"
					element={<Chat username={userName} room={room} socket={socket} />}
				/>
				<Route
					path="/DevPage"
					element={
						<div>
							<DevPage />
						</div>
					}
				/>
				{/* Undefined route  */}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Suspense>
	);
};

export default App;
