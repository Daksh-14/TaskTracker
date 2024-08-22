import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axiosconfig";
import TeamCard from "../components/TeamCard";
import { Link,useLocation,Outlet} from "react-router-dom";
import Loader from "../components/Loader";
import "../style/Teams.css"

const CreatedTeams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const location=useLocation()
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
        <div style={{height:'100vh',width:'100vw',display:"flex",alignItems:'center',justifyContent:'center'}}>
        <Loader/>
        </div>
      ) : (
        <>
        
          <div className="Team-container">
            <div className="HeadingCreate">
              <Link to="../createteam"><button>Create a team</button></Link>
            </div>
            <h1 className="header">Teams You Have Created</h1>
            <div className="Teams-flex-container">
              
              { teams.length>0 ? teams.map((team) => (
                <TeamCard key={team.id} link={team.id} TeamName={team.teamname} Role="Leader" created={true} />
              )) : <p style={{fontSize:'1.3rem'}}>You haven't created any Teams </p>}
            </div>
          </div>
        
        </>
      )}
    </div>
  );
};

export { CreatedTeams };