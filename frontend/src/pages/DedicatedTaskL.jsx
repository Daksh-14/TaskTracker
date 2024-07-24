import React, { useEffect, useState } from 'react';
import { useParams ,Link} from 'react-router-dom';
import axiosInstance from '../config/axiosconfig';
import parse from 'html-react-parser';
import '../style/DedicatedTaskL.css'

const DedicatedTaskL = () => {
  const [data, setData] = useState({});
  const { teamId, task } = useParams();
  const [iframeSrc, setIframeSrc] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`task/${task}`);
        setData(response.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [task]);

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
      {location.pathname.includes('created') && <div className='task-button-top'><Link to='edit'><button>Edit</button></Link></div>}
      {location.pathname.includes('created') && <div className='task-button-top'><Link to='assign'><button>Assign</button></Link></div>}
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
              <p>Assigned Date: {data.assigndate.slice(0,10)}</p>
              <p>Due Date: {data.duedate.slice(0,10)}</p>
              <p>Created by: {data.firstname} {data.lastname}</p>
            </div>
        }
      </div>
      
    </div>
  );
};

export default DedicatedTaskL;
