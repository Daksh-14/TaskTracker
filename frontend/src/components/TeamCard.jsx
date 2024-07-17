import React from "react";
import { Link } from 'react-router-dom';
import { GiProgression } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import "../style/TeamCard.css";

const TeamCard = ({link, TeamName, TeamLeader, created }) => {
  return (
    <div className="TeamCard_outer">
      <Link to={`${link}`}>
        <div className="TeamCard_bg">
          <div className="Card_bg_text">
            <p>Team Name: {TeamName}</p>
            <p>Created By: {TeamLeader}</p>
          </div>
        </div>
      </Link>
      <div className="TeamCreated_icon">
        {created ? <GiProgression size="24px" /> : <CgProfile size="24px" />}
      </div>
    </div>
  );
};

export default TeamCard;
