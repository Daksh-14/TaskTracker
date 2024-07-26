import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axiosInstance from '../config/axiosconfig';
import '../style/Calender.css'
import { Link } from 'react-router-dom';


function MyCalendar() {
  const [events,setEvents]=useState([])
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [highlight,setHighlight]=useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/task/findall');
        // console.log(response.data);
        const temp = response.data.map((d) => ({
          ...d,
          duedate: new Date(d.duedate).toLocaleString().split(',')[0],
        }));
        let arr=[];
        temp.forEach(e => {
          arr.push(e.duedate)
        });
        setHighlight(arr);
        console.log(temp);
        setEvents(temp);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const selectedDateString = selectedDate.toLocaleString().split(',')[0];
  console.log(selectedDateString);
  // Find events for the selected date
  const selectedEvents = events.filter((event) =>
    event.duedate === selectedDateString
  );

  return (
    <div style={{display:'flex',justifyContent:'center'}}>
      <div>
        <div>Tasks Calendar</div>
      <Calendar
        className='calendar'
          onChange={handleDateChange}
          value={selectedDate}
          tileClassName={({ date }) =>
            highlight.includes(date.toLocaleString().split(',')[0])
              ? 'highlight' // Apply your custom CSS class
              : ''
          }
        />
      {selectedEvents.length > 0 && (
        <div>
          <h3>Events on {selectedDate.toDateString()}:</h3>
          {selectedEvents.map((event, index) => (
            <div key={index}>
              <Link to='../'>{event.title}</Link>
              <p>{event.description}</p>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}

export default MyCalendar;
