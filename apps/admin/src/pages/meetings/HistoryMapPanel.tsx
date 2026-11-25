"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function HistoryMapPanel({ data }: any) {
  if (!data) return null;

  return (
    <div className="w-full h-[300px] sm:h-[400px] md:h-full 
                    border-t md:border-t-0 md:border-l 
                    bg-white rounded-xl overflow-hidden">
      
      <MapContainer
        center={[data.lat, data.lng]}
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[data.lat, data.lng]}>
          <Popup>
            <div>
              <div className="font-medium">{data.agent}</div>
              <div className="text-xs">{data.client}</div>
              <div className="text-xs">{data.location}</div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}