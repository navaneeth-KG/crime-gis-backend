import React from 'react'
import { Map,View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import { OSM } from 'ol/source'
import { useEffect} from 'react'
import { useRef } from 'react'
import 'ol/ol.css'
import './OpenLayersMap.css'

const OpenLayersMap = () => {

    
    const mapDiv = useRef(0)

    useEffect(()=>{
        new Map({
        target: mapDiv.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: [0, 0],
          zoom: 3,
        }),
      })
    }
      ,[])
  return (
    <div ref={mapDiv} className='map-container'></div>
      )
}

export default OpenLayersMap
