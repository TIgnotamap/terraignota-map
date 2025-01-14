import { useState, useEffect } from "react";

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
};

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState(getScreenSize());

  function getScreenSize() {
    const width = window.innerWidth;
    if (width < breakpoints.sm) return "small";
    if (width < breakpoints.md) return "medium";
    if (width < breakpoints.lg) return "large";
    return "desktop";
  }

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getScreenSize());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenSize;
};

export default useScreenSize;
