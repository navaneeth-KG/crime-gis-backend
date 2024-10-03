import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend ,ResponsiveContainer} from 'recharts';
import './Barchart.css'

const Barchart = ({data}) => {
    
    const COLORS = ['#402E7A', '#4C3BCF', '#4B70F5', '#3DC2EC','#C8ACD6','#C8ACD6'];
  return (
  <ResponsiveContainer width="100%" height="100%">
    <PieChart >
    <Pie
      data={data}
      cx="50%"
      cy="100%"
      labelLine={false}
      outerRadius={90}
      innerRadius={50} // Adjust inner radius for padding effect
      paddingAngle={2} // Set padding between slices
      dataKey="uv"
      
    >
      <Legend  className='pie-legend' display={false}/>
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}\
      
    </Pie>
    <Tooltip />
    <Legend />
  </PieChart>
    </ResponsiveContainer>

    
  )
}

export default Barchart
