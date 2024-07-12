import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axiosconfig";
import TeamCard from "../components/TeamCard";
import { Link } from 'react-router-dom';
import "../style/Teams.css";

const JoinedTeams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJoinedTeams = async () => {
      try {
        const response = await axiosInstance.get('/team/all/joined');
        setTeams(response.data.teams);
      } catch (error) {
        console.error('Error fetching joined teams', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJoinedTeams();
  }, []);

  return (
    <div className="Team-outer">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="Team-container">
          <div>
            <Link to="../jointeam"><button>Join a team</button></Link>
          </div>
          <h1 className="header">Teams You Have Joined</h1>
          <div className="Teams-flex-container">
            {teams.length > 0 ? (
              teams.map((team) => {
                const name = `${team.fname} ${team.lname}`;
                return <TeamCard key={`${team.id}-${team.teamname}`} TeamName={team.teamname} TeamLeader={name} created={false} />;
              })
            ) : (
              <p>You haven't joined any Teams</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export { JoinedTeams };
