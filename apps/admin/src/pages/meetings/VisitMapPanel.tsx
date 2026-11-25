"use client";

import { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* 🔥 FIX marker icon */
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function VisitMapPanel({ employee }: any) {
  const visits = employee?.visits ?? [];

  const center = useMemo(() => {
    if (!visits.length) return [25.5941, 85.1376];
    return [visits[0].lat, visits[0].lng];
  }, [visits]);

  const handleDirection = (lat: number, lng: number, client: string) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    console.log("Direction →", client, url);
    window.open(url, "_blank");
  };

  if (!employee)
    return (
      <div
        className="w-full h-[250px] sm:h-[350px] md:h-full 
                      border rounded-xl 
                      flex items-center justify-center 
                      text-muted-foreground 
                      text-center p-6"
      >
        Select employee to view map
      </div>
    );

  return (
    <div
      className="w-full 
                    h-[300px] sm:h-[400px] md:h-full 
                    border rounded-xl 
                    overflow-hidden"
    >
      <MapContainer center={center as any} zoom={13} className="h-full w-full">
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {visits.map((v: any) => (
          <Marker
            key={v.id}
            position={[v.lat, v.lng]}
            eventHandlers={{
              click: () => handleDirection(v.lat, v.lng, v.client),
            }}
          >
            <Popup>
              <div className="space-y-2">
                <div className="font-medium">{v.client}</div>
                <div className="text-xs">{v.time}</div>

                <button
                  className="text-blue-600 text-xs underline"
                  onClick={() => handleDirection(v.lat, v.lng, v.client)}
                >
                  Get Direction
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
