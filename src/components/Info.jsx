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
        <div className="h-8 w-[1px] bg-gray" />
      </div>
      <div className="pointer-events-none fixed top-48 grid w-full grid-cols-12 items-start px-6">
        <div className="pointer-events-auto col-span-6 col-start-4 h-[60vh] overflow-auto border border-gray bg-light px-4 shadow-md dark:bg-dark">
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
