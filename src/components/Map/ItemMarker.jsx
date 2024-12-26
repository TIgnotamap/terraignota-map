import { Marker, useMap } from "@vis.gl/react-maplibre";
import { NavLink } from "react-router-dom";
import chooseColor from "../../utils/chooseColor";

export default function ItemMarker({ item, setCurrentItem, currentItem }) {
  const { current: map } = useMap();

  if (!map) return null;

  return (
    <Marker
      latitude={item.lat}
      longitude={item.long}
      anchor="bottom"
      mapStyle="/terraignota-map/styles/light.json"
    >
      <NavLink
        className={() => "relative flex items-center justify-center"}
        to={`/${item.slug.current}`}
      >
        <div
          onClick={() => {
            setCurrentItem(item);
          }}
          style={{
            background: `radial-gradient(circle, ${chooseColor(item.project._id)} 10%, #ffffff00 70%)`,
          }}
          className={`absolute size-8 cursor-pointer rounded-full text-xs ${item == currentItem || currentItem == null ? "" : "opacity-40"}`}
        />
        <div
          className={`absolute size-4 rounded-full border border-dark ${item == currentItem || currentItem == null ? "" : "opacity-40"}`}
        />
        <div
          className={`absolute size-12 rounded-full border border-dashed border-dark ${item == currentItem ? "" : "opacity-0"}`}
        />
      </NavLink>
    </Marker>
  );
}
