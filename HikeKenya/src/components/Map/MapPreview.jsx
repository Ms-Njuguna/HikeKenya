import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup,  Polyline } from 'react-leaflet';

export default function MapPreview({title, route}) {
    const center = route[0];

    const mapRef = useRef();

    useEffect(() => {
      if (mapRef.current && route?.length > 1) {
        mapRef.current.fitBounds(route);
      }
    }, [route]);

    return (
        <div className="my-4 shadow-lg border rounded-[12px] overflow-hidden  max-w-4xl mx-auto">
            <h2 className="text-lg font-semibold p-2">{title}</h2>
            <div style={{ height: "400px", width: "100%" }}>
                <MapContainer center={center} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
                   <TileLayer
                   url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                   attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                   />
                   <Marker position={center}>
                      <Popup>{title}</Popup>
                   </Marker>
                   {route && <Polyline positions={route} pathOptions={{ color: "green", weight: 10}}  />}
                </MapContainer>
            </div>
        </div>
    );
};

