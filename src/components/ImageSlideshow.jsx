import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function ImageSlideshow({ images }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const resizeImage = () => {
    setIsZoomed(!isZoomed);
  };

  const size = {
    small: "?h=500&fm=webp",
    large: "?h=1080&fm=webp",
  };

  useEffect(() => {
    if (!isZoomed) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [images, activeIndex, isZoomed]);

  const handleClick = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <>
      <div className="drop-shadow-lg">
        {images.map((image, index) => (
          <img
            src={image.url + size.small}
            alt=""
            key={image._key}
            className={`${
              index === activeIndex ? "opacity-100" : "opacity-0"
            } absolute rounded-md border border-gray transition-opacity duration-[1500ms] ease-in-out`}
            onClick={handleClick}
          />
        ))}

        <div
          className="absolute right-3 top-3 flex size-4 cursor-pointer items-center justify-center rounded-sm border bg-white hover:size-5"
          onClick={resizeImage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="0.75rem"
            viewBox="0 -960 960 960"
            width="0.75rem"
            fill="undefined"
          >
            <path d="M160-160v-176.92h40V-200h136.92v40H160Zm463.85 0v-40h136.92v-136.92h40V-160H623.85ZM160-623.08V-800h176.92v40H200v136.92h-40Zm600.77 0V-760H623.85v-40h176.92v176.92h-40Z" />
          </svg>
        </div>
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
              />
            ))}

            <div
              className="absolute right-3 top-3 flex size-4 cursor-pointer items-center justify-center rounded-sm border bg-white hover:size-5"
              onClick={resizeImage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="0.75rem"
                viewBox="0 -960 960 960"
                width="0.75rem"
                fill="undefined"
              >
                <path d="M296.92-160v-136.92H160v-40h176.92V-160h-40Zm326.93 0v-176.92h176.92v40H663.85V-160h-40ZM160-623.08v-40h136.92V-800h40v176.92H160Zm463.85 0V-800h40v136.92h136.92v40H623.85Z" />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
