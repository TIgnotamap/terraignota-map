import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMap } from "@vis.gl/react-maplibre";
import { LanguageContext } from "../utils/LanguageContext";
import ImageSlideshow from "./ImageSlideshow";
import VideoContainer from "./VideoContainer";
import ItemInfo from "./ItemInfo";
import Title from "./Title";

export default function Item({ currentItem, setCurrentItem }) {
  const { terraIgnotaMap } = useMap();
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);

  function handleClose() {
    terraIgnotaMap?.flyTo({
      center: [-66.9918726, -56.89128362],
      zoom: 3.5,
    });
    setCurrentItem(null);
    navigate("/");
  }

  return (
    <div className="fixed flex h-screen w-full flex-col items-center gap-6 overflow-scroll pb-24 pt-16 sm:pointer-events-none sm:pt-11 md:z-50">
      <div className="sticky top-0 z-10 sm:static">
        <Title
          title={currentItem?.code}
          name={currentItem?.name?.[language]}
          subtitle={currentItem?.location?.[language]}
          details={[
            currentItem?.lat ? currentItem.lat.toFixed(5) : "...",
            currentItem?.long ? currentItem.long.toFixed(5) : "...",
          ]}
          handleClose={handleClose}
        />
      </div>

      {(currentItem?.video || currentItem?.images?.length > 0) && (
        <svg
          className={`fixed top-[115px] -z-10 w-[1px] bg-gray sm:top-[150.5px] ${currentItem?.template === "3" ? "h-6" : "h-96 sm:h-[4.55rem] md:h-6"}`}
        >
          <line x1="0" y1="0" x2="100%" y2="0" stroke="#aaa" strokeWidth="1" />
        </svg>
      )}

      <div className="grid grid-cols-1 items-start gap-6 px-6 sm:grid-cols-2 md:grid-cols-12 lg:gap-0">
        {currentItem?.template === "1" && currentItem?.images?.length > 0 && (
          <div className="pointer-events-auto md:col-span-4 md:col-start-5">
            <ImageSlideshow images={currentItem.images} />
          </div>
        )}

        {currentItem?.template === "2" && currentItem?.video && (
          <div className="pointer-events-auto md:col-span-4 md:col-start-5">
            <VideoContainer item={currentItem} />
          </div>
        )}
        {currentItem?.template === "3" && currentItem?.video && (
          <div className="pointer-events-none col-span-2 md:col-span-6 md:col-start-4 lg:col-span-8 lg:col-start-3">
            <VideoContainer item={currentItem} />
          </div>
        )}

        {(currentItem?.images?.length > 0 || currentItem?.video) &&
          currentItem.template != "3" && (
            <svg className="absolute left-[calc(50%-0.75rem)] -z-10 mt-12 hidden w-[calc(1.5rem+1px)] sm:block md:left-[calc(100%/3*2-1rem)] lg:static lg:block lg:w-full">
              <line
                x1="0"
                y1="0"
                x2="100%"
                y2="0"
                stroke="#aaa"
                strokeWidth="1"
              />
            </svg>
          )}

        <div className="pointer-events-auto md:col-span-4 md:col-start-9 lg:col-span-3 lg:col-start-10">
          {currentItem && <ItemInfo item={currentItem} />}
        </div>
      </div>
    </div>
  );
}
