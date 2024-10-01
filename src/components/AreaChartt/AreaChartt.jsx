import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AreaChartt = () => {
   

    const [data,setData] =useState([])
    const [district,setDistrict] = useState([])
    const colors = [    "#FF5733", // Red-Orange
      "#33FF57", // Green
      "#3357FF", // Blue
      "#F1C40F", // Yellow
      "#8E44AD", // Purple
      "#E67E22", // Orange
      "#2ECC71", // Light Green
      "#3498DB", // Light Blue
      "#E74C3C", // Red
      "#9B59B6", // Lavender
      "#FF8D1A", // Bright Orange
      "#1ABC9C", // Turquoise
      "#D35400", // Dark Orange
      "#C0392B", // Dark Red
      "#2980B9", // Dark Blue
      "#27AE60", // Dark Green
      "#F39C12", // Golden Yellow
      "#8E44AD", // Dark Purple
      "#2C3E50", // Dark Slate Blue
      "#F4D03F", // Bright Gold
      "#34495E"  // Charcoal Gray
      ]
    const fetchData =async()=>{
        const data = await axios.get('http://localhost:4000/year-graph')
        const modifiedData = data.data.map((i)=>{
    
            const id = i._id
            const obj={}
            i.fieldN.forEach(element => {
    
            obj[element.district] = element.total
            
           });
    
           return {name: id ,...obj}
        })
    
        setData(modifiedData)
        
        const district = await axios.get('http://localhost:4000/district')
        setDistrict(district.data)


    }
    useEffect(()=>{fetchData()},[])
    console.log(district);
    console.log(data);
    
    
  return (
    <div>
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
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {district.length!=0 && district.map((item,index) => <Area type="monotone" dataKey={item._id} stackId="1" stroke={colors[index%colors.length]} fill={colors[index%colors.length]} />)}
        </AreaChart>
      
    </div>
  )
}

export default AreaChartt
