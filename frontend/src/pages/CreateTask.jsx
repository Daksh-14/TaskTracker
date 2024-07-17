import React, { useState, useRef } from 'react';
import axiosInstance from '../config/axiosconfig';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Editor from '../components/Editor';
import '../style/CreateTask.css';
import { useParams } from 'react-router-dom';

const CreateTask = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: new Date(),
    files: [],
    links: []
  });
  const fileInputRef = useRef(null);
  const [linkInput, setLinkInput] = useState('');
  const { teamId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('dueDate', formData.dueDate.toISOString());

    formData.files.forEach(file => {
      data.append('files', file);
    });

    formData.links.forEach(link => {
      data.append('links', link);
    });

    try {
      const response = await axiosInstance.post(`/task/${teamId}/create`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      await axiosInstance.post('/task/addtask',{taskid:response.data.id,uid:response.data.user})
      setFormData({
        title: '',
        description: '',
        dueDate: new Date(),
        files: [],
        links: []
      });

      fileInputRef.current.value = null;
    } catch (error) {
      console.error('Error adding task', error);
    }
  };

  const onChangeHandler = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFormData((prevData) => ({
      ...prevData,
      files: [...prevData.files, ...newFiles]
    }));
  };

  const handleRemoveFile = (index) => {
    const newFiles = formData.files.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      files: newFiles
    }));
    if (newFiles.length === 0) {
      fileInputRef.current.value = null;
    }
  };

  const handleAddLink = () => {
    if (linkInput) {
      setFormData((prevData) => ({
        ...prevData,
        links: [...prevData.links, linkInput]
      }));
      setLinkInput('');
    }
  };

  const handleRemoveLink = (index) => {
    const newLinks = formData.links.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      links: newLinks
    }));
  };

  return (
    <div className="CreateTask_outer">
      <div className="CreateTask_layout">
        <h1>Add a New Task</h1>
        <form onSubmit={handleSubmit}>
          <div className="CreateTask_data">
            <div className="CreateTask_title">
              <label htmlFor="title">Title</label>
              <input
                className='task_input'
                type="text"
                name="title"
                onChange={(e) => onChangeHandler('title', e.target.value)}
                value={formData.title}
                placeholder="Task Title"
                required
              />
            </div>
            <div className="CreateTask_desc">
              <label htmlFor="description">Description</label>
              <Editor formData={formData} setFormData={setFormData} />
            </div>
            <div className="CreateTask_date">
              <label htmlFor="dueDate">Due Date</label>
              <DatePicker
                selected={formData.dueDate}
                onChange={(date) => onChangeHandler('dueDate', date)}
                className="task_input"
              />
            </div>
            <div className="CreateTask_files">
              <label htmlFor="files">Upload Files</label>
              <input type="file" name="files" multiple onChange={handleFileChange} ref={fileInputRef} />
              <div>
                {
                  formData.files.map((file, index) => (
                    <div key={index}>
                      <span>{file.name}</span>
                      <button type="button" onClick={() => handleRemoveFile(index)}>Remove</button>
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="CreateTask_links">
              <label htmlFor="links">Add Links</label>
              <input
                type="text"
                value={linkInput}
                onChange={(e) => setLinkInput(e.target.value)}
                placeholder="Enter URL and click Add"
              />
              <button type="button" onClick={handleAddLink}>Add Link</button>
              <div className="links_preview">
                {formData.links.map((link, index) => (
                  <div key={index} className="link_item">
                    <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                    <button type="button" onClick={() => handleRemoveLink(index)}>Remove</button>
                  </div>
                ))}
              </div>
            </div>
            <div className="button_container">
              <button className="task_submit" type="submit">Add Task</button>
            </div>
            <div>
              
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
