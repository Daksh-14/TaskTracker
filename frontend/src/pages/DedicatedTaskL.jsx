import React, { useEffect, useState } from 'react';
import { useParams ,Link} from 'react-router-dom';
import axiosInstance from '../config/axiosconfig';
import parse from 'html-react-parser';
import '../style/DedicatedTaskL.css'

const DedicatedTaskL = () => {
  const [data, setData] = useState({});
  const { teamId, task } = useParams();
  const [iframeSrc, setIframeSrc] = useState(null);
  const [isLeader,setIsLeader]=useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`task/${task}`);
        const taskData = response.data[0];
      
      taskData.duedate = new Date(taskData.duedate).toLocaleString();
      taskData.assigndate = new Date(taskData.assigndate).toLocaleString();
      setData(taskData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [task]);

  useEffect(()=>{
    const checkStatus=async()=>{
      try{
        const response=await axiosInstance.get(`auth/check/${teamId}`);
        console.log(response.data);
        setIsLeader(response.data);
      }
      catch(error){
        console.log(error)
      }
    }
    checkStatus();
  },[teamId])
  const handleButtonClick = (url) => {
    setIframeSrc(url);
  };

  const handleCloseClick = () => {
    setIframeSrc(null);
  };
  console.log(data)
  const fileUrls = data.fileurls ? JSON.parse(data.fileurls) : [];
  const links = data.links ? JSON.parse(data.links) : [];
  
  return (
    <div className="task-detail">
      <div className='task-heading'><h2>{data.title}</h2></div>
      {isLeader && <div className='task-button-top'><Link to='edit'><button>Edit</button></Link></div>}
      {isLeader && <div className='task-button-top'><Link to='assign'><button>Assign</button></Link></div>}
      <div className='task-flex'>
        <div className='task-data'>
          {data.description && <div className="task-description">{parse(data.description)}</div>}
          {fileUrls.length > 0 && (
            <div >
              <div style={{marginBottom:'1vh'}}>Attachments:</div>
              <div className="file-buttons">
                {fileUrls.map((url, i) => (
                  <button key={i} onClick={() => handleButtonClick(url)}>
                    Open File {i + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
          {iframeSrc && (
            <div>
              <div className='task-fileClose'><button onClick={handleCloseClick}>Close</button></div>
              <iframe src={iframeSrc} width="100%" height="400" title="File Viewer"></iframe>
            </div>
          )}
          {links.length > 0 && (
            <div >
              <div style={{marginBottom:'1vh'}}>Attached Links</div>
              <div className="file-links">
                {links.map((url, i) => (
                  <a href={url} target="_blank" rel="noopener noreferrer">Link {i+1}</a>
                ))}
              </div>
            </div>
          )}
        </div>
        {
          data.assigndate && data.duedate &&
            <div className="task-meta">
              <p>Assigned Date: {data.assigndate}</p>
              <p>Due Date: {data.duedate}</p>
              <p>Created by: {data.firstname} {data.lastname}</p>
            </div>
        }
      </div>
      
    </div>
  );
};

export default DedicatedTaskL;
