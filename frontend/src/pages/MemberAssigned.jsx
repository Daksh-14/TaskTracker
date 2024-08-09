import React, { useEffect, useState } from 'react';
import axiosInstance from '../config/axiosconfig';
import { useParams } from 'react-router-dom';
import '../style/AddTask.css'

const MemberAssigned = (props) => {
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const { task} = useParams();
  const [searchMode, setSearchMode] = useState('name'); // 'name' or 'email'
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const { data } = await axiosInstance.get(`task/${task}/assigned`);
        console.log(data);
        const mem1 = data.map((obj) => ({ ...obj, name: `${obj.firstname} ${obj.lastname}` }));
        setMembers(mem1);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMembers();
  }, []);
  console.log(members)
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
  const filteredMembers = members ? members.filter(member => {
    if (searchMode === 'name') {
       return member.name.toLowerCase().includes(searchQuery.toLowerCase());
    } else {
      return member.email.toLowerCase().includes(searchQuery.toLowerCase());
    }
  }) : [];

  const handleClick=()=>{
    selectedMembers.forEach(m=>{
        const id=m.id; 
        try{
            axiosInstance.post('task/remove',{uid:id,taskid:task});
        }
        catch(err){
            console.log(err);
        }
    })
    setSelectedMembers([]);
  }

  return (
    <div className="task-assignment">
      <div style={{
                    backgroundColor: 'rgb(251, 251, 253)',padding:'5vh 5vw',borderRadius:"2vh",boxShadow:'0 10px 10px 0 rgba(0, 0, 0, 0.2)'} }>
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
            style={{fontSize:'1.05rem'}}
          />
        </div>

        <div className="members-list">
          <p>Assigned</p>
          <div style={{ overflowX: 'scroll', whiteSpace: 'nowrap', maxWidth: '70%',overflowY: 'scroll', maxHeight: '100px' }}>
            <ul>
              {filteredMembers.map(member => (
                <li key={member.email}>
                  <button onClick={() => handleSelectMember(member)}><div style={{margin:'0.5vh 0.5vw',fontSize:'1.05rem'}}><div style={{ display: 'flex', alignItems: 'center' }}
                  >Name: {member.name}</div><div style={{ display: 'flex', alignItems: 'center' }}>Email: {member.email}</div></div></button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="selected-members-list">
          <p>Remove</p>
          <div style={{ overflowX: 'scroll', whiteSpace: 'nowrap', maxWidth: '70%',overflowY: 'scroll', maxHeight: '100px' }}>
          <ul>
            {selectedMembers.map(member => (
              <li key={member.email}>
                <button onClick={() => handleRemoveMember(member)}><div style={{margin:'0.5vh 0.5vw'}}><div style={{ display: 'flex', alignItems: 'center' }}
                >Name: {member.name}</div><div style={{ display: 'flex', alignItems: 'center' }}>Email: {member.email}</div></div></button>
              </li>
            ))}
          </ul>
          </div>
        </div>
        <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
          <button onClick={handleClick} style={{minWidth:'10vw',height:'5vh',fontSize:'1.1rem',padding:'1vh 1vw',marginTop:'2vh'}}>Assign</button>
        </div>
      </div>
    </div>
  );
};

export default MemberAssigned;
