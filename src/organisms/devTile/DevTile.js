import { React } from "react";
import "./devTile.css";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
const DevTile = ({ nickname, name, email, team, photo, github, linkedin }) => {
  return (
    <div className="devtile-container">
      <div className="devtile-card">
        <div className="devtile-card-upper">
          <img className="photo d-block w-100" src={photo} alt="First slide" />
        </div>
        <div className="devtile-card-lower">
          <p className="header4 center">{nickname}</p>
          <p className="regular-bold center">{name}</p>
          <p className="small center team">{team}</p>
          <p className="small center">{email}</p>
          <div className="devtile_links">
            <p>Socials</p>
            <div className="devtile_logos">
              <a href={github} className="link">
                <AiFillGithub className="devtile_icon" />
              </a>
              {linkedin !== "" ? (
                <a href={linkedin} className="link">
                  <AiFillLinkedin className="devtile_icon" />
                </a>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevTile;
