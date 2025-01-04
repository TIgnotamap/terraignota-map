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
    <>
      <div className="pointer-events-none fixed top-11 flex w-full flex-col items-center">
        <Title
          title={currentItem?.code}
          subtitle={currentItem?.location?.[language]}
          handleClose={handleClose}
        />
        {(currentItem?.video || currentItem?.images?.length > 0) && (
          <div className="h-8 w-[1px] bg-gray" />
        )}
      </div>
      <div className="pointer-events-none fixed top-48 grid w-full grid-cols-12 items-start px-6">
        {currentItem?.template === "1" && currentItem?.images?.length > 0 && (
          <div className="pointer-events-auto col-span-4 col-start-5">
            <ImageSlideshow images={currentItem.images} />
          </div>
        )}
        {currentItem?.template === "2" && currentItem?.video && (
          <div className="pointer-events-auto col-span-4 col-start-5">
            <VideoContainer item={currentItem} />
          </div>
        )}
        {currentItem?.template === "3" && currentItem?.video && (
          <div className="pointer-events-auto col-span-10 col-start-3">
            <VideoContainer item={currentItem} />
          </div>
        )}
        {(currentItem?.images?.length > 0 || currentItem?.video) &&
          currentItem.template != "3" && (
            <div className="mt-12 h-[1px] w-full bg-gray" />
          )}
        <div className="pointer-events-auto col-span-3 col-start-10">
          {currentItem && <ItemInfo item={currentItem} />}
        </div>
      </div>
    </>
  );
}
