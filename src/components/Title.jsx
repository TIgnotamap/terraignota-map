import { useContext } from "react";
import { StatusBarContext } from "../utils/StatusBarContext";
import { LanguageContext } from "../utils/LanguageContext";

export default function Title({ title, subtitle, handleClose }) {
  const { language } = useContext(LanguageContext);
  const { setStatus } = useContext(StatusBarContext);
  const translations = {
    exit: {
      en: "Exit",
      es: "Salir",
    },
  };

  if (!title) return null;

  return (
    <div className="flex flex-col items-center">
      <div
        className="bg-[radial-gradient(#fff_10%,_#ffffff00_70%)] font-serif text-3xl leading-tight drop-shadow-[0_0_2px_#fff] sm:text-[2.75rem] dark:bg-[radial-gradient(#000_0%,_#00000000_70%)] dark:drop-shadow-[0_0_2px_#000]"
        // style={{
        //   background: `radial-gradient(#fff 0%, #ffffff00 80%)`,
        // }}
      >
        {title}
      </div>

      <div className="bg-[radial-gradient(#fff_10%,_#ffffff00_70%)] font-serif drop-shadow-[0_0_2px_#fff] dark:bg-[radial-gradient(#000_0%,_#00000000_70%)] dark:drop-shadow-[0_0_2px_#000]">
        {subtitle ?? "."}
      </div>

      <div
        onClick={() => {
          handleClose();
          setStatus(null);
        }}
        onMouseEnter={() => setStatus(translations.exit[language])}
        onMouseLeave={() => setStatus(null)}
        className="pointer-events-auto mt-4 cursor-pointer select-none border border-gray bg-light font-mono drop-shadow-md dark:invert"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="undefined"
          className="drop-shadow-[0_0_2px_#fff]"
        >
          <path d="M256-227.69 227.69-256l224-224-224-224L256-732.31l224 224 224-224L732.31-704l-224 224 224 224L704-227.69l-224-224-224 224Z" />
        </svg>
      </div>
    </div>
  );
}
