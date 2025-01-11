import { Marker, useMap } from "@vis.gl/react-maplibre";
import { NavLink } from "react-router-dom";
import chooseColor from "../../utils/chooseColor";
import { useContext } from "react";
import { StatusBarContext } from "../../utils/StatusBarContext";
import { LanguageContext } from "../../utils/LanguageContext";

export default function ItemMarker({
  item,
  setCurrentItem,
  currentItem,
  hoveredItem,
  setHoveredItem,
}) {
  const { current: map } = useMap();
  const { setStatus } = useContext(StatusBarContext);
  const { language } = useContext(LanguageContext);

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
        onMouseEnter={() => {
          setHoveredItem(item);
          setStatus(item.code + " " + (item.name ? item.name[language] : ""));
        }}
        onMouseLeave={() => {
          setHoveredItem(null);
          setStatus(null);
        }}
      >
        <div
          onClick={() => {
            setCurrentItem(item);
          }}
          style={{
            background: `radial-gradient(circle, ${chooseColor(item.project?._id)} 10%, #ffffff00 70%)`,
          }}
          className={`absolute size-8 cursor-pointer rounded-full text-xs transition-opacity duration-500 ${item == currentItem || item == hoveredItem || (hoveredItem == null && currentItem == null) ? "z-[100] opacity-100" : "opacity-20"}`}
        />
        <div
          className={`absolute size-4 rounded-full border border-dark transition-opacity duration-500 ${item == currentItem || item == hoveredItem || (hoveredItem == null && currentItem == null) ? "z-[100] opacity-100" : "opacity-20"}`}
        />
        <div
          className={`absolute size-12 animate-spin rounded-full transition-opacity duration-500 dark:invert ${item == currentItem ? "opacity-100" : "hidden opacity-0"}`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100' ry='100' stroke='black' stroke-width='1' stroke-dasharray='16%2c 2%2c 16' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e")`,
          }}
        />
      </NavLink>
      {item._type === "exhibition" && (
        <div className="font-serif text-xl">EX</div>
      )}
    </Marker>
  );
}
