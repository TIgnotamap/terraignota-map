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
      <div
        className="bg-[radial-gradient(#fff_0%,_#ffffff00_80%)] text-4xl drop-shadow-[0_0_2px_#fff] dark:bg-[radial-gradient(#000_0%,_#00000000_80%)] dark:drop-shadow-[0_0_2px_#000]"
        // style={{
        //   background: `radial-gradient(#fff 0%, #ffffff00 80%)`,
        // }}
      >
        {currentItem.code}
      </div>
      {currentItem.location && (
        <div className="bg-[radial-gradient(#fff_0%,_#ffffff00_80%)] drop-shadow-[0_0_2px_#fff] dark:bg-[radial-gradient(#000_0%,_#00000000_80%)] dark:drop-shadow-[0_0_2px_#000]">
          {currentItem.location[language]}
        </div>
      )}
      <div
        onClick={() => {
          terraIgnotaMap?.flyTo({
            center: [-66.9918726, -56.89128362],
            zoom: 3.5,
          });
          setCurrentItem(null);
          navigate("/");
        }}
        className="pointer-events-auto cursor-pointer select-none bg-[radial-gradient(#fff_0%,_#ffffff00_80%)] font-mono dark:invert"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="undefined"
          className="drop-shadow-[0_0_2px_#fff]"
        >
          <path d="M256-227.69 227.69-256l224-224-224-224L256-732.31l224 224 224-224L732.31-704l-224 224 224 224L704-227.69l-224-224-224 224Z" />
        </svg>
      </div>
    </>
  );
}
