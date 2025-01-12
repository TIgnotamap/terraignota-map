import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function ImageSlideshow({ images }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});

  const resizeImage = () => {
    setIsZoomed(!isZoomed);
  };

  const size = {
    small: "?h=500&fm=webp",
    large: "?h=1080&fm=webp",
  };

  useEffect(() => {
    const firstImageKey = images[0]?._key;
    if (!isZoomed && firstImageKey && loadedImages[firstImageKey]) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [images, activeIndex, isZoomed, loadedImages]);

  const handleClick = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleImageLoad = (imageKey) => {
    setLoadedImages((prev) => ({
      ...prev,
      [imageKey]: true,
    }));
  };

  return (
    <>
      <div className="relative flex h-[30vh] items-center justify-center drop-shadow-lg sm:h-auto">
        <div
          style={{
            aspectRatio: images[activeIndex]?.dimensions?.aspectRatio || "3/2",
          }}
          className={`absolute inset-0 mx-auto max-h-full max-w-full rounded-md border border-gray bg-lightGray sm:max-h-none sm:w-full dark:bg-darkGray`}
        />
        {images.map((image, index) => (
          <div
            className={`${loadedImages[image._key] ? "opacity-100" : "opacity-0"} transition-opacity duration-[1500ms] ease-in-out`}
            key={image._key}
          >
            <img
              src={image.url + size.small}
              alt=""
              className={`${
                index === activeIndex ? "opacity-100" : "opacity-0"
              } absolute inset-0 mx-auto max-h-full max-w-full rounded-md border border-gray transition-opacity duration-[1500ms] ease-in-out sm:max-h-none`}
              onClick={handleClick}
              onLoad={() => handleImageLoad(image._key)}
            />
          </div>
        ))}

        {loadedImages[images[0]?._key] && (
          <div
            className="absolute right-3 top-3 hidden size-6 cursor-pointer items-center justify-center rounded-full border border-gray bg-light hover:invert sm:flex dark:bg-dark"
            onClick={resizeImage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="0.9rem"
              viewBox="0 -960 960 960"
              width="0.9rem"
              fill="#000"
              className="opacity-60 dark:invert"
            >
              <path d="M100.78-100.78V-334.7h106v127.92H334.7v106H100.78Zm525.09 0v-106h127.35V-334.7h106v233.92H625.87ZM100.78-625.87v-233.35H334.7v106H206.78v127.35h-106Zm652.44 0v-127.35H625.87v-106h233.35v233.35h-106Z" />
            </svg>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isZoomed && (
          <motion.div
            className="fixed inset-0 z-10 flex h-screen w-full items-center justify-center bg-light dark:bg-dark"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {images.map((image, index) => (
              <img
                src={image.url + size.large}
                alt=""
                key={image._key}
                className={`${
                  index === activeIndex ? "opacity-100" : "opacity-0"
                } absolute transition-opacity duration-[1500ms] ease-in-out`}
                onClick={handleClick}
                onLoad={() => handleImageLoad(image._key)}
              />
            ))}

            <div
              className="absolute right-3 top-3 hidden size-6 cursor-pointer items-center justify-center rounded-full border border-gray bg-dark hover:invert sm:flex dark:bg-light"
              onClick={resizeImage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="0.9rem"
                viewBox="0 -960 960 960"
                width="0.9rem"
                fill="#fff"
                className="opacity-60 dark:invert"
              >
                <path d="M228.7-100.78V-228.7H100.78v-106H334.7v233.92h-106Zm397.17 0V-334.7h233.35v106H731.87v127.92h-106ZM100.78-625.87v-106H228.7v-127.35h106v233.35H100.78Zm525.09 0v-233.35h106v127.35h127.35v106H625.87Z" />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
