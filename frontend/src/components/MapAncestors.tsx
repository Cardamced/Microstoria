import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MapAncestors.css";
import L from "leaflet";

// Correction de l'icône par défaut de Leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Exemples de données d'ancêtres
const ancestors = [
  {
    id: 1,
    name: "Pierre MARIE",
    birth: 1925,
    death: 1995,
    lat: 48.9142,
    lng: 2.2876,
  },
  {
    id: 2,
    name: "Jean Dupont",
    birth: 1850,
    death: 1920,
    lat: 47.8566,
    lng: 3.3522,
  },
  {
    id: 3,
    name: "Marie Martin",
    birth: 1855,
    death: 1925,
    lat: 45.764,
    lng: 4.8357,
  },
];

const MapAncestors = () => {

  return (
      <div className="map-container">
      <MapContainer
        center={[48.8566, 2.3522]}
        zoom={6}
        //   style={{ height: "100vh", width: "100%" }}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        dragging={true}
        zoomControl={true}
        attributionControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {ancestors.map((ancestor) => (
          <Marker key={ancestor.id} position={[ancestor.lat, ancestor.lng]}>
            <Popup>
              {ancestor.name} ({ancestor.birth} - {ancestor.death})
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapAncestors;
