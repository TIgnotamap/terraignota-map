import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../utils/LanguageContext";
import Title from "./Title";

export default function Info({ data }) {
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();

  function handleClose() {
    navigate("/");
  }

  return (
    <>
      <div className="pointer-events-none fixed top-11 flex w-full flex-col items-center">
        <Title title={data?.title[language]} handleClose={handleClose} />
      </div>
      <div className="fixed right-6 top-16 flex items-start gap-2">
        <div className="h-[60vh] w-[33vw] overflow-auto border bg-light dark:bg-dark">
          <p>{data.info && data.info[language]}</p>
          <p>{data.hideCredits}</p>
          <div>
            <a href="https://maplibre.org/">MapLibre</a> |{" "}
            <a href="https://openfreemap.org/">OpenFreeMap</a>{" "}
            <a href="https://www.openmaptiles.org/">© OpenMapTiles</a> Data
            from
            <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>
          </div>
        </div>
      </div>
    </>
  );
}
