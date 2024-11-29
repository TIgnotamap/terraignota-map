import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { LanguageContext } from "../utils/LanguageContext";

export default function Info({ data }) {
  const { language } = useContext(LanguageContext);
  return (
    <div className="fixed inset-0 flex h-screen flex-col items-center justify-center backdrop-blur-sm">
      <h1>{data.title[language]}</h1>
      <p>{data.info && data.info[language]}</p>
      <p>{data.hideCredits}</p>
      <div>
        <a href="https://maplibre.org/">MapLibre</a> |{" "}
        <a href="https://openfreemap.org/">OpenFreeMap</a>{" "}
        <a href="https://www.openmaptiles.org/">© OpenMapTiles</a> Data from
        <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>
      </div>
      <NavLink to={`/`}>
        <h3>x</h3>
      </NavLink>
    </div>
  );
}
