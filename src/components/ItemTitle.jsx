import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMap } from "@vis.gl/react-maplibre";
import { LanguageContext } from "../utils/LanguageContext";

export default function ItemTitle({ currentItem, setCurrentItem }) {
  const { terraIgnotaMap } = useMap();
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);

  return (
    <>
      <div className="text-4xl">{currentItem.code}</div>
      {currentItem.location && <div>{currentItem.location[language]}</div>}
      <div
        onClick={() => {
          terraIgnotaMap?.flyTo({ center: [-67, -57], zoom: 3.5 });
          setCurrentItem(null);
          navigate("/");
        }}
        className="pointer-events-auto cursor-pointer select-none font-mono"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="undefined"
        >
          <path d="M256-227.69 227.69-256l224-224-224-224L256-732.31l224 224 224-224L732.31-704l-224 224 224 224L704-227.69l-224-224-224 224Z" />
        </svg>
      </div>
    </>
  );
}
