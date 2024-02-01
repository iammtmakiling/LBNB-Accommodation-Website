import { React, useState, useEffect } from "react";
import "./devPage.css";
import { NavBar, Banner, Footer, DevTile } from "../../organisms";
import {
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11,
  image12,
  image13,
} from "../../assets/images";
const DevPage = () => {
  return (
    <div className="devpage-container">
      <NavBar />
      <div className="member_section">
        <p className="header1 bold light-green">DEVELOPER'S PAGE</p>
        <p className="header3 bold">Project Manager</p>
        <DevTile
          nickname={"Russ"}
          name={"Rey Russel Dayahan"}
          team={"Backend Developer"}
          email={"rrdayahan@up.edu.ph"}
          photo={image2}
          github={"https://github.com/remedey"}
          linkedin={""}
        />
        <div className="team-members-list">
          <p className="header3 bold">Team Heads</p>
          <div className="team-list">
            <DevTile
              nickname={"Gen"}
              name={"Genesis Topinio"}
              team={"Backend Developer"}
              email={"gntopinio@up.edu.ph"}
              photo={image11}
              github={"https://github.com/gtopinio"}
              linkedin={"https://www.linkedin.com/in/mark-genesis-topinio/"}
            />
            <DevTile
              nickname={"Garchi"}
              name={"Leonard Garchitorena"}
              team={"Database Developer"}
              email={"lpgarchitorena@up.edu.ph"}
              photo={image5}
              github={"https://github.com/LeonardGarchi"}
              linkedin={
                "https://www.linkedin.com/in/leonard-paul-garchitorena-826203276/"
              }
            />
            <DevTile
              nickname={"Bob"}
              name={"Albrave Albayda"}
              team={"Frontend Developer"}
              email={"abalbayda@up.edu.ph"}
              photo={image13}
              github={"https://github.com/aalbayda"}
              linkedin={""}
            />
          </div>
        </div>
        <div className="team-members-list">
          <p className="header3 bold">Front End Developers</p>
          <div className="team-list">
            <DevTile
              nickname={"Mark"}
              name={"Mark Lewis Damalerio"}
              team={"Frontend Developer"}
              email={"mldamalerio@up.edu.ph"}
              photo={image7}
              github={"https://github.com/Markeryy"}
              linkedin={"https://www.linkedin.com/in/marklewisdamalerio/"}
            />
            <DevTile
              nickname={"Gnet"}
              name={"Gwyneth Balucio"}
              team={"DB & Frontend Developer"}
              email={"gnbalucio@up.edu.ph"}
              photo={image8}
              github={"https://github.com/GwynethBalucio"}
              linkedin={""}
            />
            <DevTile
              nickname={"Kael"}
              name={"Michael Jay Makiling"}
              team={"Frontend Developer"}
              email={"mrmakiling@up.edu.ph"}
              photo={image1}
              github={"https://github.com/Kael-Makiling"}
              linkedin={"https://www.linkedin.com/in/iammtmakiling/"}
            />
            <DevTile
              nickname={"Jra"}
              name={"Jramae Gallos"}
              team={"Frontend Developer"}
              email={"jmgallos@up.edu.ph"}
              photo={image3}
              github={"https://github.com/JramaeGallos"}
              linkedin={""}
            />
          </div>
        </div>
        <div className="team-members-list">
          <p className="header3 bold">Back End Developers</p>
          <div className="team-list">
            <DevTile
              nickname={"Lyco"}
              name={"Lyco Sheen Lacuesta"}
              team={"Backend Developer"}
              email={"lslacuesta@up.edu.ph"}
              photo={image9}
              github={"https://github.com/llacuesta"}
              linkedin={""}
            />
            <DevTile
              nickname={"Kyle"}
              name={"Kyle Martin Villagen"}
              team={"Backend Developer"}
              email={"kmvillagen@up.edu.ph"}
              photo={image12}
              github={"https://github.com/kayluuuuuu"}
              linkedin={"https://www.linkedin.com/in/kyle-villagen/"}
            />
          </div>
          <div className="team-listb">
            <DevTile
              nickname={"Brian"}
              name={"Loria Brian"}
              team={"DB & Backend Developer"}
              email={"bnloria@up.edu.ph"}
              photo={image4}
              github={"https://github.com/la-plumaa"}
              linkedin={
                "https://www.linkedin.com/in/brian-angelo-loria-4a9930258/"
              }
            />
            <DevTile
              nickname={"Dale"}
              name={"Alesundreau Ratuiste"}
              team={"DB & Backend Developer"}
              email={"adratuiste@up.edu.ph"}
              photo={image10}
              github={"http://github.com/14admr"}
              linkedin={
                "https://www.linkedin.com/in/alesundreau-dale-ratuiste/"
              }
            />
            <DevTile
              nickname={"Kyle"}
              name={"Kyle Sotto"}
              team={"DB & Backend Developer"}
              email={"klsotto@up.edu.ph"}
              photo={image6}
              github={"https://github.com/sttkyle"}
              linkedin={""}
            />
          </div>
        </div>
        {/* <div className="team-members-list">
                    <p className="header3 bold">Database Developers</p>
                    <div className="team-list">
                    </div>
                </div> */}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default DevPage;
