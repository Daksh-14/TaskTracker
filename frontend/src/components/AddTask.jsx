import React, { useEffect, useState } from 'react';
import axiosInstance from '../config/axiosconfig';
import { useParams } from 'react-router-dom';

const AddTask = (props) => {
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const { teamId } = useParams();
  const taskId = 1;
  const [searchMode, setSearchMode] = useState('name'); // 'name' or 'email'
  const [searchQuery, setSearchQuery] = useState('');

  let duplicate=[]
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axiosInstance.get(`team/${teamId}/member`);
        const arr=response.data.members;
        const { data } = await axiosInstance.post('team/assigned', { taskId });
        duplicate=data;
        const inimem = new Set(duplicate);
        const mem=arr.filter(m=>(!inimem.has(m.id)));
        console.log(arr);
        console.log(data)
        setMembers(mem);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMembers();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectMember = (member) => {
    setMembers((prevMembers) => prevMembers.filter(m => m.email !== member.email));
    setSelectedMembers((prevSelected) => [...prevSelected, member]);
  };

  const handleRemoveMember = (member) => {
    setSelectedMembers((prevSelected) => prevSelected.filter(m => m.email !== member.email));
    setMembers((prevMembers) => [...prevMembers, member]);
  };
  const filteredMembers = members.filter(member => {
    const name=member.firstname+" "+member.lastname;
    if (searchMode === 'name') {
       return name.toLowerCase().includes(searchQuery.toLowerCase());
    } else {
      return member.email.toLowerCase().includes(searchQuery.toLowerCase());
    }
  });

  const handleClick=()=>{
    selectedMembers.forEach(m=>{
        const id=m.id;
        try{
            axiosInstance.post('task/addtask',{uid:id,taskid:taskId});
        }
        catch(err){
            console.log(err);
        }
    })
    setSelectedMembers([]);
  }

  return (
    <div className="task-assignment">
      <div className="search-bar">
        <label>
          Search by:
          <select value={searchMode} onChange={(e) => setSearchMode(e.target.value)}>
            <option value="name">Name</option>
            <option value="email">Email</option>
          </select>
        </label>
        <input
          type="text"
          placeholder={`Search by ${searchMode}`}
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="members-list">
        <h3>All Members</h3>
        <ul>
          {filteredMembers.map(member => (
            <li key={member.email}>
              {member.name} ({member.email}) <button onClick={() => handleSelectMember(member)}>Select</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="selected-members-list">
        <h3>Selected Members</h3>
        <ul>
          {selectedMembers.map(member => (
            <li key={member.email}>
              {member.name} ({member.email}) <button onClick={() => handleRemoveMember(member)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleClick}>Assign</button>
    </div>
  );
};

export default AddTask;
