import { useContext } from "react";
import { StatusBarContext } from "../utils/StatusBarContext";
import { LanguageContext } from "../utils/LanguageContext";
import useIsMobile from "../hooks/useIsMobile";

export default function Title({ title, name, subtitle, details, handleClose }) {
  const { language } = useContext(LanguageContext);
  const { setStatus } = useContext(StatusBarContext);
  const isMobile = useIsMobile();

  const translations = {
    exit: {
      en: "Exit",
      es: "Salir",
    },
  };

  if (!title) return null;

  return (
    <div className="flex select-none flex-col items-center">
      <div className="flex flex-wrap items-center justify-center gap-1 sm:flex-col sm:gap-0">
        <div
          className="font-serif text-xl leading-tight drop-shadow-[0_0_5px_#fff] sm:text-[2.75rem] dark:drop-shadow-[0_0_5px_#000]"
          // style={{
          //   background: `radial-gradient(#fff 0%, #ffffff00 80%)`,
          // }}
        >
          {title} {name ? `[${name}]` : ""}
        </div>
        <div
          className={`font-serif text-xl drop-shadow-[0_0_5px_#fff] sm:text-base dark:drop-shadow-[0_0_5px_#000] ${subtitle ? "" : "hidden sm:block"}`}
        >
          {subtitle ? `${subtitle}` : "."}
        </div>
      </div>

      {details && (
        <div className="block font-serif text-sm drop-shadow-[0_0_5px_#fff] sm:hidden dark:drop-shadow-[0_0_5px_#000]">
          {details.join(" ")}
        </div>
      )}

      <div
        onClick={() => {
          handleClose();
          setStatus(null);
        }}
        onMouseEnter={() => !isMobile && setStatus(translations.exit[language])}
        onMouseLeave={() => !isMobile && setStatus(null)}
        className="pointer-events-auto mt-2 cursor-pointer select-none border border-gray bg-light font-mono drop-shadow-md sm:mt-4 sm:hover:bg-lightGray dark:bg-dark dark:sm:hover:bg-darkGray"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="undefined"
          className="dark:invert"
        >
          <path d="M256-227.69 227.69-256l224-224-224-224L256-732.31l224 224 224-224L732.31-704l-224 224 224 224L704-227.69l-224-224-224 224Z" />
        </svg>
      </div>
    </div>
  );
}
