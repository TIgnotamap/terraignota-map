import { LanguageContext } from "../utils/LanguageContext";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { StatusBarContext } from "../utils/StatusBarContext";
import useIsMobile from "../hooks/useIsMobile";

export default function Menu({
  data,
  theme,
  setTheme,
  toggleBgAudio,
  bgAudioIsPlaying,
}) {
  const { language, setLanguage } = useContext(LanguageContext);
  const { setStatus } = useContext(StatusBarContext);
  const isMobile = useIsMobile();

  const translations = {
    toggleBgAudio: {
      en: "Toggle background audio",
      es: "Prender/apagar audio de fondo",
    },
    changeLanguage: {
      en: "Change language",
      es: "Cambiar idioma",
    },
    showInfo: {
      en: "What is this?",
      es: "Que es todo esto?",
    },
    changeMode: {
      en: "Change color mode",
      es: "Cambiar modo de color",
    },
    openIndex: {
      en: "Open index",
      es: "Abrir index",
    },
  };

  return (
    <nav className="fixed right-6 top-4 z-10 flex select-none items-center gap-2 font-serif text-base sm:text-sm">
      <button
        onClick={toggleBgAudio}
        className={`sm:hover:underline ${bgAudioIsPlaying ? "animate-pulse opacity-100" : "opacity-30"}`}
        onMouseOver={() =>
          !isMobile && setStatus(translations.toggleBgAudio[language])
        }
        onMouseOut={() => !isMobile && setStatus(null)}
      >
        audio
      </button>
      <NavLink
        to="/info"
        className="flex size-6 items-center justify-center rounded-full border border-gray bg-light pt-[2px] text-center lowercase sm:hover:bg-lightGray dark:bg-dark dark:text-light dark:sm:hover:bg-darkGray"
        onMouseOver={() =>
          !isMobile && setStatus(translations.showInfo[language])
        }
        onMouseOut={() => !isMobile && setStatus(null)}
      >
        ?
      </NavLink>
      <NavLink
        onMouseOver={() =>
          !isMobile && setStatus(translations.openIndex[language])
        }
        onMouseOut={() => !isMobile && setStatus(null)}
        to="/index"
        className="border border-gray bg-light px-2 sm:hover:bg-lightGray dark:bg-dark dark:text-light dark:sm:hover:bg-darkGray"
      >
        index
      </NavLink>
      <button
        className="w-3 sm:hover:underline"
        onClick={() => setLanguage(language === "es" ? "en" : "es")}
        onMouseOver={() =>
          !isMobile && setStatus(translations.changeLanguage[language])
        }
        onMouseOut={() => !isMobile && setStatus(null)}
      >
        {language === "es" ? "EN" : "ES"}
      </button>
      <button
        className="size-4 transform rounded-full bg-dark pb-0.5 transition-transform duration-200 sm:size-3 sm:hover:scale-125 dark:bg-light"
        onMouseEnter={() =>
          !isMobile && setStatus(translations.changeMode[language])
        }
        onMouseLeave={() => !isMobile && setStatus(null)}
        onClick={() => {
          if (theme === "dark") {
            setTheme("light");
            document.documentElement.classList.toggle("dark");
          } else {
            setTheme("dark");
            document.documentElement.classList.toggle("dark");
          }
        }}
      />
    </nav>
  );
}
