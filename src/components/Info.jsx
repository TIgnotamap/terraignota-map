import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { LanguageContext } from "../utils/LanguageContext";

export default function Info({ data }) {
  const { language } = useContext(LanguageContext);
  return (
    <div className="fixed right-6 top-16 flex items-start gap-2">
      <NavLink to="/" className="border px-2 font-mono text-xs">
        X
      </NavLink>

      <div className="h-[60vh] w-[33vw] overflow-auto border bg-light dark:bg-dark">
        <h1>{data.title[language]}</h1>
        <p>{data.info && data.info[language]}</p>
        <p>{data.hideCredits}</p>
        <div>
          <a href="https://maplibre.org/">MapLibre</a> |{" "}
          <a href="https://openfreemap.org/">OpenFreeMap</a>{" "}
          <a href="https://www.openmaptiles.org/">© OpenMapTiles</a> Data from
          <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>
        </div>
      </div>
    </div>
  );
}
