import { useState, useEffect } from "react";
import StatusChart from "../components/StatusChart";
import MyCalendar from "./MyCalender";
import axiosInstance from "../config/axiosconfig";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const DashBoard = () => {

    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [len,setLen]=useState({leader:0,joined:0})
    useEffect(() => {
        const fetchCreatedTeams = async () => {
            try {
                const response = await axiosInstance.get('/team/all/created');
                const response2 = await axiosInstance.get('/team/all/joined');
                const arr = [...response.data.teams, ...response2.data.teams];
                setLen({leader:response.data.teams.length,joined:response2.data.teams.length})
                console.log(arr)
                setTeams(arr);
            } catch (error) {
                console.error('Error fetching created teams', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCreatedTeams();
    }, []);

    useEffect
    const filteredTeams = teams.filter(team => {
        console.log('here');
        return team.teamname.toLowerCase().includes(searchQuery.toLowerCase());
    });
    console.log(teams);
    

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    if(loading)return (<div style={{height:'100vh',width:'100vw',display:"flex",alignItems:'center',justifyContent:'center'}}>
        <Loader/>
        </div>)

    return (
        <div style={{
            width: '100vw',
            minHeight: '100vh',
            backgroundColor: '#f0f4f8',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            boxSizing: 'border-box'
        }}>
            <div style={{fontSize:'2rem',fontWeight:'bold'}}>
                DashBoard
            </div>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                marginTop: '4vh',
                width: '93vw',
                justifyContent: 'space-evenly',
                gap: '20px',
                backgroundColor: '#ffffff',
                padding: '10px',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                boxSizing: 'border-box',
                marginBottom:'2vh'
            }}>
                <div style={{ minWidth: '300px' }}>
                    <StatusChart />
                </div>
                <div style={{width:'1px', backgroundColor:'black'}}></div>
                <div style={{
                    minWidth: '300px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '20px',
                    borderRadius: '10px',
                    gap:'2vh',
                    // boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}>
                    <div style={{fontSize:'1.5rem',fontWeight:'bold'}}>Team Section</div>
                    <div style={{fontSize:'1.2rem'}}>Team(with leader position) : {len.leader}</div>
                    <div style={{fontSize:'1.2rem'}}>Team(with joined position) : {len.joined}</div>
                    <input
                        type="text"
                        placeholder={`Search by Team name`}
                        value={searchQuery}
                        onChange={handleSearchChange}
                        style={{ fontSize: '1.05rem' }}
                    />
                    <div style={{ overflowX: 'scroll', whiteSpace: 'nowrap', width: '70%', overflowY: 'scroll', maxHeight: '100px' }}>
                        <ul>
                            {filteredTeams.map(team => (
                                <li key={team.id}>
                                    <Link to={`../team/${team.id}`}>
                                    <button style={{width:'100%'}} ><div style={{ display: 'flex', alignItems: 'center', width:'80%' }}
                                    >{team.teamname}</div></button>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* <div>{TeamCount}</div> */}
                </div>
            </div>
            <div style={{
                width: '93vw',
                marginTop: '20px',
                backgroundColor: '#ffffff',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                boxSizing: 'border-box',
                marginBottom: '4vh'
            }}>
                <MyCalendar />
            </div>
        </div>
    );
}

export default DashBoard;
