import React, { useEffect, useState } from "react";
import { useParams,Link, useLocation,useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosconfig";
import CreateTask from "./CreateTask";
import Loader from "../components/Loader.jsx";
import TaskCard from "../components/TaskCard.jsx";
import '../style/LeaderTask.css'

const LeaderTask = () => {
  const { teamId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joinCode,setJoinCode]=useState();
  const location=useLocation();
  const navigate=useNavigate();
  const [isLeader,setIsLeader]=useState(false);
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/task/${teamId}/all`);
        console.log(response.data);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [teamId]);
  useEffect(()=>{
    const checkStatus=async()=>{
      setLoading(true);
      try{
        const response=await axiosInstance.get(`auth/checkTeam/${teamId}`);
        const res2=await axiosInstance.get(`team/${teamId}/joincode`);
        setJoinCode(res2.data.jc.joincode);
        setIsLeader(response.data);
      }
      catch(error){
        console.log(error)
      }
      finally{
        setLoading(false);
      }
    }
    checkStatus();
  },[teamId])

  const deleteTeam=async()=>{
    try{
      await axiosInstance.delete(`/team/delete/${teamId}`);
      navigate('../../created');
    }
    catch{
      console.log(error);
    }
  }
  return (
    <div className="Tasks-outer">
      {loading ? (
        <div style={{height:'100vh',width:'100vw',display:"flex",alignItems:'center',justifyContent:'center'}}>
        <Loader/>
        </div>
      ) : (
        <div className="Tasks-container">
          {isLeader && <div className="Button"><button onClick={deleteTeam} style={{backgroundColor:'#e31717',color:'white'}} >Delete Team</button></div>}
          <div className="Heading"><h1 className="header">Tasks for Team {teamId}</h1></div>
          {isLeader && <div className="Button"><div style={{border:'2px solid', display:"flex", padding:'8px', borderRadius:'5px', margin:'2vh 0', backgroundColor:'#dee8f2'}}>Join Code:<div className="jc">{joinCode}</div></div></div>}
          {isLeader && <div className="Button"><Link to='create'><button>Create Task</button></Link></div>}
          <div className="Tasks-flex-container">
            {tasks? (
              tasks.map((task) => (
                <TaskCard key={task.taskid} title={task.title} taskid={task.taskid} firstname={task.firstname} lastname={task.lastname} duedate={task.duedate} />
              ))
            ) : (
              <p>No tasks found</p>
            )}
          </div>
        </div>
      )}
    </div>
    
  );
};

export default LeaderTask;