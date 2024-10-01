import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StackedBarChart = () => {
    const [data,setData] = useState([])
    const [district,setDistrict] = useState([])
    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#ff0000', '#ffb219' ];

    useEffect(()=>{fetchData()},[])
    const fetchData = async()=>{
        const data = await axios.get("http://localhost:4000/stacked-bar-chart")
        const district = await axios.get("http://localhost:4000/district")
        setDistrict(district.data)
        // console.log(data.data)
    
        const modifiedData = data.data.map((i)=>{
    
            const id = i._id
            const obj={}
            i.fieldN.forEach(element => {
    
            obj[element.district] = element.total
            
           });
    
           return {name: id ,...obj}
        })
    
        setData(modifiedData)
      
    }
  

    console.log(data)
    console.log(district);
    
  return (
    <div>
      <BarChart
          width={500}
          height={500}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {

          district.length!= 0 && district.map(((item,index)=><Bar dataKey={item._id} stackId="a" fill={colors[index % colors.length]} />))



         }
          
    
        </BarChart>
    </div>
  )
}

export default StackedBarChart
