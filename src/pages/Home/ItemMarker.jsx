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
      <div className="size-4 cursor-pointer border border-[#000] bg-[#0f0] p-[2px] text-xs text-[#00464F]" />
    </Marker>
  );
}
