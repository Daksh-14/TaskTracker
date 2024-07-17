import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../config/axiosconfig';
import parse from 'html-react-parser';

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
      <h2>{data.title}</h2>
      {data.description && <div className="task-description">{parse(data.description)}</div>}
      <div className="task-meta">
        <p>Due Date: {data.duedate}</p>
        <p>Assigned Date: {data.assigndate}</p>
        <p>Created by: {data.firstname} {data.lastname}</p>
      </div>
      {fileUrls.length > 0 && (
        <div className="file-buttons">
          {fileUrls.map((url, i) => (
            <button key={i} onClick={() => handleButtonClick(url)}>
              Open File {i + 1}
            </button>
          ))}
        </div>
      )}
      {iframeSrc && (
        <div>
          <button onClick={handleCloseClick}>Close</button>
          <iframe src={iframeSrc} width="100%" height="400" title="File Viewer"></iframe>
        </div>
      )}
      {links.length > 0 && (
        <div className="file-buttons">
          {links.map((url, i) => (
            <a href="url">Link {i+1}</a>
          ))}
        </div>
      )}
    </div>
  );
};

export default DedicatedTaskL;
