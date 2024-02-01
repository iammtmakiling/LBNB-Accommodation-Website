import { useNavigate } from "react-router-dom"; // Add this
import React from "react";

import "./chatButton.css";

const ChatButton = ({ username, setUsername, room, setRoom, socket }) => {
	const navigate = useNavigate(); // Add this
	const joinRoom = () => {
		if (room !== "" && username !== "") {
			console.log(`Joining room ${room} with username ${username}`);
			socket.emit("join_room", { username, room });
		}
		// Redirect to /chat
		navigate("/chat", { replace: true }); // Add this
	};

	return (
		<button className="chat-button" onClick={joinRoom}>
			Chatroom 💬
		</button>
	);
};

export default ChatButton;
