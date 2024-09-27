import { useState } from 'react'
import './Sidebar.css'

const Sidebar = () => {
    const [isDisplay,setIsDisplay] = useState(false)

    return (
    <div className="side-bar" style={isDisplay?{width:"20vw"}:{width:"2vw"}}>
        <h1 onClick={()=>{setIsDisplay(!isDisplay)}} style={{color:"white",fontSize:"18px"}}><i class="fa-solid fa-bars"></i></h1>
        <nav className="nav ">
         

        </nav>
      
    </div>
  )
}

export default Sidebar
