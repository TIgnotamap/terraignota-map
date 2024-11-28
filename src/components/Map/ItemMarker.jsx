import { Marker, useMap } from "@vis.gl/react-maplibre";
import { NavLink } from "react-router-dom";

export default function ItemMarker({ item, setCurrentItem }) {
  const { current: map } = useMap();

  if (!map) return null;

  return (
    <Marker
      latitude={item.lat}
      longitude={item.long}
      anchor="bottom"
      mapStyle="/terraignota-map/styles/light.json"
    >
      <NavLink to={`/${item.slug.current}`}>
        <div
          onClick={() => {
            setCurrentItem(item);
            map.flyTo({
              center: [item.long, item.lat],
              zoom: 8,
            });
          }}
          className="size-4 cursor-pointer border border-[#000] bg-[#0f0] p-[2px] text-xs text-[#00464F]"
        />
      </NavLink>
    </Marker>
  );
}
