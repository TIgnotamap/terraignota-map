import { useState, useEffect } from "react";

export default function ImageSlideshow({ images, isZoomed }) {
  const [activeIndex, setActiveIndex] = useState(0);
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
      {images.map((image, index) => (
        <img
          src={`${image.url}${isZoomed ? size.large : size.small}`}
          alt=""
          key={image._key}
          className={`${
            index === activeIndex ? "opacity-100" : "opacity-0"
          } absolute rounded-md border border-gray transition-opacity duration-[1500ms] ease-in-out`}
          onClick={() => handleClick()}
        />
      ))}
    </>
  );
}
