import { PieChart } from '@mui/x-charts/PieChart';
import { useEffect, useState } from 'react';
import axiosInstance from '../config/axiosconfig';

const StatusChart=()=>{
    const [data,setdata]=useState([0,0,0])

    const [resize,setResize]=useState(false);
    
    useEffect(()=>{
        window.addEventListener('resize',()=>{
            if(window.innerWidth<960 )setResize(true);
            else setResize(false)
        })
        const fetch=async ()=>{
            const response=await axiosInstance.get('/task/findall');
            let a=0,b=0,c=0;
            console.log(response.data)
            response.data.forEach(e => {
                if(e.status=='pending'){
                    const d=new Date().getTime();
                    const t=new Date(`${e.duedate}`).getTime();
                    
                    if (d>t) {
                        c++;
                    } else {
                        b++;
                    }
                }
                else if(e.status=='completed'){
                    a++;
                }
            });
            console.log(a,b,c)
            setdata([a,b,c]);
        }
        fetch();
    },[])
    const outerRadius = resize ? 90 : 130;
    console.log(resize)
    return (
        <>
            <div >
                <div style={{width:'100%', display:'flex', justifyContent:'center',fontSize:'1.5rem', fontWeight:'bold'}}>Tasks Status</div>
                <PieChart
                series={[
                    {
                    data: [{ id: 0, value: data[0], label: 'compeleted' },
                    { id: 1, value: data[1], label: 'pending' },
                    { id: 2, value: data[2], label: 'overdue' },],
                    innerRadius: 30,
                    outerRadius: outerRadius,
                    paddingAngle: 3,
                    cornerRadius: 5,
                    cx: outerRadius,
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                    },
                ]}
                width={resize?350:500}
                height={400}
                />
                
            </div>
        </>
    )
}

export default StatusChart;