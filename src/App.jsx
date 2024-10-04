

// import OpenLayersMap from './OpenLayersMap.jsx';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import { crimeData } from './data.js';
import Barchart from './components/Barchart/Barchart.jsx';
import { useState ,useEffect} from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import "leaflet/dist/leaflet.css"
import {MapContainer, TileLayer} from 'react-leaflet';
import {HeatmapLayer} from "react-leaflet-heatmap-layer-v3"

import './App.css';
import StackedBarChart from './components/StackedBarChart/StackedBarChart.jsx';
import AreaChartt from './components/AreaChartt/AreaChartt.jsx';
import axios from 'axios';






function App() {
  
const [data,setData] = useState(crimeData)
const [data2,setData2] = useState(crimeData)
const [data3,setData3] = useState(crimeData)
const [year,setYear] = useState(2001)
const [state,setState] = useState("KERALA")
const [points,setPoints] = useState([])
const [district,setDistrict] = useState([])
const colors = [
  
     "#FF5733", // Red-Orange
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
const count = 0
useEffect(()=>{
  // const newData = data.features.filter(i=> (i.properties["STATE/UT"] === state && i.properties.YEAR == year)).map(item=>{
  //   return ({
  //     name:item.properties.DISTRICT,
  //     murder : item.properties.MURDER,
  //     rape: item.properties.RAPE,
  //     robbery : item.properties.ROBBERY
  //   })
  // })  

  // const newData = await axios.get('http://localhost:4000/line-graph')
  fetchData()


  // setData2(newData)
  const pointData = crimeData.features.map(feature => {
    if (feature.geometry && feature.geometry.coordinates && feature.properties.YEAR && feature.properties.YEAR == year) {
      const [longitude, latitude] = feature.geometry.coordinates;
      return [latitude,longitude]; 
    }
    return null}).filter(i => i !== null)
  setPoints(pointData)
  getCrime()

  
  // const newData3 = data.features.filter(i=> (i.properties["STATE/UT"] === "KERALA" && i.properties.YEAR == year)).map(item=>{
  //   return ({
  //     name:item.properties.DISTRICT,
  //     murder : item.properties.MURDER,
  //     rape: item.properties.RAPE,
  //     robbery : item.properties.ROBBERY
  //   })
  // })  
  // setData2(newData3)
  

 },[year,state])

  const fetchData= async()=>{
    const newData = await axios.get('http://localhost:4000/line-graph')
    console.log(newData);
    
    setData2(newData.data)
    const crime = await axios.get("http://localhost:4000/crime")
    setDistrict(crime.data)

  }
console.log(data2);

  const onClick =()=>{
    console.log(data)
    console.log(points)
    
  }
 
  const getCrime = ()=>{
    const crimeObj ={
      MURDER:0,
      ATTEMP_TO_MURDER:0,
      CULPABLE_HOMICIDE_NOT_AMOUNTING_TO_MURDER:0,
      RAPE:0,
      CUSTODIAL_RAPE:0,
      KIDNAPPING_ABDUCTION:0
    }
  
    for(var i = 0;i<data.features.length;i++){
      crimeObj.MURDER = crimeObj.MURDER + data.features[i].properties.MURDER
      crimeObj.ATTEMP_TO_MURDER = crimeObj.ATTEMP_TO_MURDER + data.features[i].properties["ATTEMPT TO MURDER"]
      crimeObj.CULPABLE_HOMICIDE_NOT_AMOUNTING_TO_MURDER = crimeObj.CULPABLE_HOMICIDE_NOT_AMOUNTING_TO_MURDER + data.features[i].properties[ "CULPABLE HOMICIDE NOT AMOUNTING TO MURDER"]
      crimeObj.RAPE = crimeObj.RAPE + data.features[i].properties["RAPE"]
      crimeObj.CUSTODIAL_RAPE= crimeObj.CUSTODIAL_RAPE+ data.features[i].properties["CUSTODIAL RAPE"]
      crimeObj.KIDNAPPING_ABDUCTION= crimeObj.KIDNAPPING_ABDUCTION+ data.features[i].properties["KIDNAPPING & ABDUCTION"]

    }
    const crimeObjArr=[]
    for(const [key,value] of Object.entries(crimeObj)){
      crimeObjArr.push({name:key,uv:value})

    }
    console.log(crimeObjArr);
    
    return crimeObjArr
  }
  return (
    <>
    <nav className='navbar' onClick={onClick}>
      <h1 style={{color:'orange'}}>icfoss</h1>

       <input type='text' placeholder="search"/>

      <ul>        
        <li>sign in</li>
      </ul>

    </nav>
    {/* <Sidebar/> */}
  

  

  <div className="dashboard-container">
    <div className="map-container">
    <MapContainer center={[8.524139, 76.936638
      ]} zoom={13}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'>

    </TileLayer>

     {points.length != 0 && <HeatmapLayer
        
        fitBoundsOnLoad
        fitBoundsOnUpdate
        points={points}
        longitudeExtractor={m => m[1]}
        latitudeExtractor={m => m[0]}
        intensityExtractor={m => parseFloat(m[2])} 
        radius ={19}
        
        
        />
    }
    
   
  </MapContainer>

    </div>



    <div className="line-chart">
    <select onChange={(e)=>{setYear(e.target.value)}}>
     {data.features.filter((i)=> (i.properties["STATE/UT"] === "KERALA")).map((item,idx)=>(<option value={item.properties.YEAR} key={idx} >{item.properties.YEAR}</option>))}
    </select>
    <select onChange={(e)=>{setState(e.target.value)}}>
     <option value="KERALA">KERALA</option>
     <option value="ANDHRA PRADESH">ANDHRA PRADESH</option>
     <option value="KARNATAKA">KARNATAKA</option>
     <option value="TAMIL NADU">TAMIL NADU</option>
    </select>
    <ResponsiveContainer>
    <LineChart  data={data2}>  
     <XAxis dataKey="name" angle={-30}  />
     <YAxis />
     <Tooltip />
     {district.length!= 0 && district.map((item,index)=><Line type="monotone" dot={false} dataKey={item} stroke={colors[index % colors.length]} />)}
     </LineChart>
    </ResponsiveContainer>
  
    </div>
    <div className="bar-chart">
      <Barchart data={ getCrime()}/>
    </div>
    <div className="stacked">
      <StackedBarChart/>
    </div>
    <div className="area-chart">
      <AreaChartt/>
    </div>
   

  </div>
     
    </>
  )
}

export default App
