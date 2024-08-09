import React, { useEffect, useState } from "react";
import { useParams,Link, useLocation } from "react-router-dom";
import axiosInstance from "../config/axiosconfig";
import CreateTask from "./CreateTask";
import TaskCard from "../components/TaskCard.jsx";
import '../style/LeaderTask.css'

const LeaderTask = () => {
  const { teamId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const location=useLocation();
  const [isLeader,setIsLeader]=useState(false);
  useEffect(() => {
    const fetchTasks = async () => {
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
      try{
        const response=await axiosInstance.get(`auth/checkTeam/${teamId}`);
        console.log(response.data);
        setIsLeader(response.data);
      }
      catch(error){
        console.log(error)
      }
    }
    checkStatus();
  },[teamId])
  return (
    <div className="Tasks-outer">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="Tasks-container">
          <div className="Heading"><h1 className="header">Tasks for Team {teamId}</h1></div>
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