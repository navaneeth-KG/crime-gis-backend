import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const Barchart = ({data}) => {
    
    const COLORS = ['#402E7A', '#4C3BCF', '#4B70F5', '#3DC2EC','#C8ACD6','#C8ACD6'];
  return (
    <PieChart width={600} height={500}>
    <Pie
      data={data}
      cx={300}
      cy={200}
      labelLine={false}
      outerRadius={150}
      innerRadius={50} // Adjust inner radius for padding effect
      paddingAngle={2} // Set padding between slices
      dataKey="uv"
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
    <Legend />
  </PieChart>
    
  )
}

export default Barchart
