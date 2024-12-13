import { useState, useEffect } from "react";

export default function VideoContainer({ item }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
  }, [item]);

  return (
    <>
      {!isVisible && (
        <div className="pointer-events-none fixed left-0 top-0 flex h-screen w-full items-center justify-center">
          <div>Loading...</div>
        </div>
      )}
      <video
        src={item.video.url || item.video.fileUrl}
        controls
        autoPlay
        onLoadedData={() => {
          setIsVisible(true);
        }}
        className={`${isVisible ? "scale-100" : "scale-0"} rounded-lg`}
      />
    </>
  );
}
