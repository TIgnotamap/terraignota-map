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
        x
      </div>
    </>
  );
}
