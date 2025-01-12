import { useState, useEffect } from "react";

export default function VideoContainer({ item }) {
  const [isVisible, setIsVisible] = useState(false);
  const [quote, setQuote] = useState();
  const [loadingText, setLoadingText] = useState("loading...");

  useEffect(() => {
    setIsVisible(false);
    setQuote("");

    fetch("https://api.quotable.io/random?query=patience")
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.content);
      })
      .catch((error) => {
        console.error("Error fetching quote:", error);
      });
  }, [item]);

  useEffect(() => {
    setLoadingText("loading...");

    const interval = setInterval(() => {
      if (quote) {
        setLoadingText(quote);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [item, quote]);

  return (
    <>
      {!isVisible && (
        <div className="flex min-h-16 items-center justify-center rounded-md border border-lightGray bg-light px-6 py-3 text-center font-mono text-xs text-darkGray dark:border-darkGray dark:bg-dark dark:text-gray">
          <p className="animate-pulse">{loadingText}</p>
        </div>
      )}
      <video
        src={item.video.url}
        controls
        autoPlay
        onLoadedData={() => {
          setIsVisible(true);
        }}
        className={`${isVisible ? "scale-100" : "scale-0"} pointer-events-auto rounded-md border border-gray drop-shadow-lg`}
      />
    </>
  );
}
