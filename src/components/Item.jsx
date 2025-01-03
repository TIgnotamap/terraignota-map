import ImageSlideshow from "./ImageSlideshow";
import VideoContainer from "./VideoContainer";
import ItemInfo from "./ItemInfo";

export default function Item({ currentItem }) {
  return (
    <>
      {currentItem?.template === "1" && currentItem?.images?.length > 0 && (
        <ImageSlideshow images={currentItem.images} />
      )}

      {currentItem?.template === "2" && currentItem?.video && (
        <div className="fixed left-[50%] top-36 w-2/6 -translate-x-1/2 px-6 drop-shadow-lg">
          <VideoContainer item={currentItem} />
        </div>
      )}

      {currentItem?.template === "3" && currentItem?.video && (
        <div className="fixed right-0 top-36 w-[calc(100%-224px)] px-6">
          <VideoContainer item={currentItem} />
        </div>
      )}

      {currentItem && <ItemInfo item={currentItem} />}
    </>
  );
}
