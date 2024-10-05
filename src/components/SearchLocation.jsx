import { GeoSearchControl } from 'leaflet-geosearch'
import { useMap } from 'react-leaflet';
import { useEffect } from 'react';
const SearchLocation = (props) => {
    
    const { provider } = props;
  
    
    const searchControl = new GeoSearchControl({
      provider,
    //   style:'bar',
      autoComplete: true,
      autoCompleteDelay: 250,
      keepResult: true,
      searchLabel: 'Search for a location',
    });
  
  
    const map = useMap(props);
    useEffect(() => { 
      map.addControl(searchControl);
      return () => map.removeControl(searchControl);
    },[map,searchControl]);
  
    return null; 
  }

  export default SearchLocation