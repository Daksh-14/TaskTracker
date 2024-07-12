import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../config/axiosconfig";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import "../style/Tasks.css";

const TaskPage = () => {
  const { teamId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.get(`/team/${teamId}/tasks`);
        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Error fetching tasks", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [teamId]);

  return (
    <div className="Tasks-outer">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="Tasks-container">
          <h1 className="header">Tasks for Team {teamId}</h1>
          <TaskForm teamId={teamId} setTasks={setTasks} />
          <div className="Tasks-flex-container">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TaskCard key={task.id} title={task.title} description={task.description} />
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

export default TaskPage;
