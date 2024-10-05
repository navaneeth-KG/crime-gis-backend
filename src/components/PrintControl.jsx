// src/MapWithPrint.js
import { useEffect } from 'react';
import {useMap } from 'react-leaflet';
import L from 'leaflet'; 
import 'leaflet/dist/leaflet.css';
import 'leaflet-easyprint';

const PrintControl = () => {
  const map = useMap();

  useEffect(() => {
    const easyPrintControl = L.easyPrint({
      title: 'Print Map',
      position: 'topleft',
      sizeModes: ['A4Portrait', 'A4Landscape'],
      filename: 'myMap',
      exportOnly: true,
      hideControlContainer: true,
    });

    map.addControl(easyPrintControl);

    return () => {
      map.removeControl(easyPrintControl);
    };
  }, [map]);

  return null;
};

export default PrintControl
