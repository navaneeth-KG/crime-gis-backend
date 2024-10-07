import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AreaChartt = ({state}) => {
   

    const [data,setData] =useState([])
    const [district,setDistrict] = useState([])
    const colors = [    "#FF5733", "#33FF57", "#3357FF", "#F1C40F", "#E74C3C",
      "#8E44AD", "#3498DB", "#2ECC71", "#9B59B6", "#F39C12",
      "#1ABC9C", "#D35400", "#34495E", "#16A085", "#C0392B",
      "#27AE60", "#2980B9", "#8E44AD", "#F1C40F", "#2C3E50",
      "#FF9F00", "#FF6F61", "#6A5ACD", "#D2691E", "#CD5C5C",
      "#ADFF2F", "#FF1493", "#00CED1", "#FFD700", "#FF4500",
      "#32CD32", "#4682B4", "#7FFF00", "#FF69B4", "#B0E0E6",
      "#800080", "#FFA500", "#B22222", "#FF6347", "#2F4F4F",
      "#FFFACD", "#C71585", "#4682B4", "#7B68EE", "#E0FFFF",
      "#FFDAB9", "#FFB6C1", "#DDA0DD", "#F0E68C", "#98FB98",
      "#FF7F50", "#708090", "#6B8E23", "#FF00FF", "#8B0000"
      ]
    const fetchData =async()=>{
        const data = await axios.get(`http://localhost:4000/year-graph/${state}`)
        const modifiedData = data.data.map((i)=>{
    
            const id = i._id
            const obj={}
            i.fieldN.forEach(element => {
    
            obj[element.district] = element.total
            
           });
    
           return {name: id ,...obj}
        })
    
        setData(modifiedData)
        
        const district = await axios.get(`http://localhost:4000/district/${state}`)
        setDistrict(district.data)


    }
    useEffect(()=>{fetchData()},[state])
    console.log(district);
    console.log(data);
    
    
  return (
   <ResponsiveContainer>
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {district.length!=0 && district.map((item,index) => <Area type="monotone" dataKey={item._id} stackId="1" stroke={colors[index%colors.length]} fill={colors[index%colors.length]} />)}
        </AreaChart>
   </ResponsiveContainer>

      
    
  )
}

export default AreaChartt
