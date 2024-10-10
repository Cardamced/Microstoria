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

const icons = {
  birth: L.icon({
    iconUrl: "/Icon-birth.svg",
    iconSize: [50, 150],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  }),
  wedding: L.icon({
    iconUrl: "/Icon-wedding.svg",
    iconSize: [50, 50],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  }),
  death: L.icon({
    iconUrl: "/Icon-death.svg",
    iconSize: [50, 50],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  }),
};

// Icône personnalisée
const customIcon = L.icon({
  iconUrl: "/Logo-Microstoria-beige.svg",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Exemples de données en dur. Objet ancêtre contenant un tableau events pour gérer plusieurs
// événements par ancêtre et les localiser chacun avec ses coordonnées.
const ancestors = [
  {
    id: 1,
    name: "Pierre MARIE",
    events: [
      {
        type: "naissance",
        date: 1925,
        location: {
          lat: 48.9142,
          lng: 2.2876,
        },
      },
      {
        type: "mariage",
        date: 1947,
        location: {
          lat: 48.9142,
          lng: 2.2876,
        },
      },
      {
        type: "décès",
        date: 1995,
        location: {
          lat: 43.6119,
          lng: 3.8772,
        },
      },
    ],
  },
  {
    id: 2,
    name: "Jean Dupont",
    events: [
      {
        type: "naissance",
        date: 1850,
        location: {
          lat: 47.8566,
          lng: 3.3522,
        },
      },
      {
        type: "décès",
        date: 1920,
        location: {
          lat: 47.8566,
          lng: 3.3522,
        },
      },
    ],
  },
];

// Icône spécifique pour chaque type d'événement.
const getEventIcon = (eventType: string) => {
  switch (eventType) {
    case "naissance":
      return icons.birth; // Utilisez une icône spécifique pour la naissance
    case "mariage":
      return icons.wedding; // Utilisez une icône spécifique pour le mariage
    case "décès":
      return icons.death; // Utilisez une icône spécifique pour le décès
    default:
      return customIcon;
  }
};

// Création d'un contexte d'affichage en fonction de l'usage du composant.
// On passe en props les deux cas via un switch.
// Création préliminaire d'une interface pour le typage les props du composant.
interface MapAncestorsProps {
  context: "ancestor-view" | "search-bar";
  containerClassName?: string;
  mapStyle?: React.CSSProperties;
  // autres props : TODO passer les ancestors à terme, avec leurs lat, lng à prévoir pour chacun des events.
}

const MapAncestors: React.FC<MapAncestorsProps> = ({
  context,
  containerClassName,
  mapStyle,
  // autres props : TODO passer les ancestors à terme, avec leurs lat, lng à prévoir pour chacun des events.
}) => {
  const containerGetStyle = () => {
    switch (context) {
      case "ancestor-view":
        return { height: "560px", width: "100%" };
      case "search-bar":
        return {
          height: "700px",
          width: "100%",
        };
      default:
        return {};
    }
  };

  return (
    <div className={`map-container ${containerClassName || ''}`}
      style={containerGetStyle()}>
      <MapContainer
        center={[48.8566, 2.3522]}
        zoom={6}
        //   style={{ height: "100vh", width: "100%" }}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        dragging={true}
        zoomControl={true}
        attributionControl={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {ancestors.map((ancestor) =>
          ancestor.events.map((event, eventIndex) => (
            <Marker
              key={`${ancestor.id}-${event.type}`}
              position={[event.location.lat, event.location.lng]}
              icon={getEventIcon(event.type)}
            >
              <Popup className="leaflet-popup-content">
                {ancestor.name}
                <br />
                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}:{" "}
                {event.date}
              </Popup>
            </Marker>
          ))
        )}
      </MapContainer>
    </div>
  );
};

export default MapAncestors;
