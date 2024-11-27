import { Marker, useMap } from "@vis.gl/react-maplibre";

export default function ItemMarker({ item }) {
  const { current: map } = useMap();

  if (!map) return null;

  return (
    <Marker
      latitude={item.lat}
      longitude={item.long}
      anchor="bottom"
      mapStyle="/terraignota-map/styles/light.json"
    >
      <div className="bg-[#00464F] text-xs text-white">
        {item.code && <>{item.code}</>}
      </div>
    </Marker>
  );
}
