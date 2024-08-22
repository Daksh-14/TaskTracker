import React, { useEffect, useState } from 'react';
import { useParams ,Link} from 'react-router-dom';
import axiosInstance from '../config/axiosconfig';
import parse from 'html-react-parser';
import { useNavigate } from 'react-router-dom';
import '../style/DedicatedTaskL.css'
import Loader from '../components/Loader';

const DedicatedTaskL = () => {
  const [data, setData] = useState({});
  const { task } = useParams();
  const [isLeader,setIsLeader]=useState(false);
  const [loading, setLoading] = useState(false);

  const navigate=useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`task/${task}`);
        const taskData = response.data[0];
      
      taskData.duedate = new Date(taskData.duedate).toLocaleString();
      taskData.assigndate = new Date(taskData.assigndate).toLocaleString();
      setData(taskData);
      } catch (err) {
        console.log(err);
      }
      finally{
        setLoading(false)
      }
    };
    fetchData();
  }, [task]);

  useEffect(()=>{
    const checkStatus=async()=>{
      try{
        const response=await axiosInstance.get(`auth/checkTask/${task}`);
        setIsLeader(response.data);
      }
      catch(error){
        console.log(error)
      }
    }
    checkStatus();
  },[task])
  console.log(data)
  const fileUrls = data.fileurls ? JSON.parse(data.fileurls) : [];
  const links = data.links ? JSON.parse(data.links) : [];
  const deleteTask=async()=>{
    try{
      await axiosInstance.post('task/delete',{taskid:task});
      navigate(-1);
    }
    catch(error){

    }
  }
  return (
    <>
    {loading?<div style={{height:'100vh',width:'100vw',display:"flex",alignItems:'center',justifyContent:'center'}}>
        <Loader/>
        </div> : (
    <div className="task-detail">
      <div className='task-container'>
      {isLeader && <div className='task-button-top'><button  style={{backgroundColor:'#e31717', color:'white'} } onClick={deleteTask}>Delete</button></div>}
      <div className='task-heading'><h2>{data.title}</h2></div>
      {isLeader && <div className='task-button-top'><Link to='edit'><button>Edit</button></Link>
        <Link to='fileremove'><button>File Remove</button></Link>
      </div>}
      {isLeader && <div className='task-button-top'><Link to='assign'><button>Assign</button></Link>
        <Link to='deassign'><button>De-Assign</button></Link>
      </div>}

      <div className='task-flex'>
        <div className='task-data'>
          {data.description && <div className="task-description">{parse(data.description)}</div>}
          {fileUrls.length > 0 && (
            <div >
              <div style={{marginBottom:'1vh'}}>Attachments:</div>
              <div className="file-buttons">
                {fileUrls.map((url, i) => (
                  <a key={i} href={url} target="_blank" rel="noopener noreferrer"><button>
                  Open File {i + 1}
                </button></a>
                  
                ))}
              </div>
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
    </div>
        )}
    </>
  );
  
};

export default DedicatedTaskL;
