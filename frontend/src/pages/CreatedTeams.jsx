import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axiosconfig";
import TeamCard from "../components/TeamCard";
import { Link } from "react-router-dom";
import "../style/Teams.css"

const CreatedTeams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreatedTeams = async () => {
      try {
        const response = await axiosInstance.get('/team/all/created');
        setTeams(response.data.teams);
      } catch (error) {
        console.error('Error fetching created teams', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCreatedTeams();
  }, []);

  return (
    <div className="Team-outer">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="Team-container">
          <div>
            <Link to="../createteam"><button>Join a team</button></Link>
          </div>
          <h1 className="header">Teams You Have Created</h1>
          <div className="Teams-flex-container">
            
            { teams.length>0 ? teams.map((team) => (
              <TeamCard key={team.id} TeamName={team.teamname} TeamLeader="You" created={true} />
            )) : <p>You haven't created any Teams </p>}
          </div>
        </div>
      )}
    </div>
  );
};

export { CreatedTeams };
