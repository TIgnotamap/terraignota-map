import { Marker, useMap } from "@vis.gl/react-maplibre";
import { NavLink } from "react-router-dom";
import chooseColor from "../../utils/chooseColor";

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
      <NavLink
        className={() => "relative flex items-center justify-center"}
        to={`/${item.slug.current}`}
      >
        <div
          onClick={() => {
            setCurrentItem(item);
          }}
          style={{
            background: `radial-gradient(circle, ${chooseColor(item.project.title.en)} 10%, #ffffff00 70%)`,
          }}
          className={`absolute size-8 cursor-pointer rounded-full text-xs`}
        />
        <div className="absolute size-4 rounded-full border border-dark" />
      </NavLink>
    </Marker>
  );
}
