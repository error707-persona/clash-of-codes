import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiamhhbnZpcGFuZHlhMzI1IiwiYSI6ImNsZXR2eGU5NzFraGEzc281cG9jOXkwb2gifQ._-4xkNeGICZFbUv2Tg9BSA';


export default function MapCode({childToParent}){

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(72.8777);
    const [lat, setLat] = useState(19.0760);
    const [zoom, setZoom] = useState(9);
     
    useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [lng, lat],
    zoom: zoom
    });
    });
     
    useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
    setLng(map.current.getCenter().lng.toFixed(4));
    setLat(map.current.getCenter().lat.toFixed(4));
    setZoom(map.current.getZoom().toFixed(2));
    const codes={lat,lng}
    childToParent(codes);
    });
    });
     
    return (
    <div>
    <div className="sidebar">
    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
    </div>
    <div ref={mapContainer} className="map-container" />
    </div>
    );
  
  
  }
