import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./room_buttons.css";

const RoomButtons = () => {
  const num__of_rooms = 3;

  return <div>{getButtonsUsingForLoop(num__of_rooms)}</div>;
};

const getButtonsUsingForLoop = (num) => {
  const array = [];

  for (var i = 1; i <= num; i++) {
    array.push(<button className="r-add-style"> Room for {i}</button>);
  }

  return array;
};

export default RoomButtons;
