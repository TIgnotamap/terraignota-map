import { LanguageContext } from "../utils/LanguageContext";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { StatusBarContext } from "../utils/StatusBarContext";

export default function Menu({
  data,
  theme,
  setTheme,
  toggleBgAudio,
  bgAudioIsPlaying,
}) {
  const { language, setLanguage } = useContext(LanguageContext);
  const { setStatus } = useContext(StatusBarContext);

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
    <nav className="fixed right-6 top-4 z-10 flex select-none items-center gap-2 font-serif text-sm">
      <button
        onClick={toggleBgAudio}
        className={`${bgAudioIsPlaying ? "animate-pulse opacity-100" : "opacity-30"}`}
        onMouseOver={() => setStatus(translations.toggleBgAudio[language])}
        onMouseOut={() => setStatus(null)}
      >
        audio
      </button>
      <NavLink
        to="/info"
        className="size-6 rounded-full border border-gray bg-light pt-[2px] text-center lowercase dark:bg-dark dark:text-light"
        onMouseOver={() => setStatus(translations.showInfo[language])}
        onMouseOut={() => setStatus(null)}
      >
        ?
      </NavLink>
      <NavLink
        onMouseOver={() => setStatus(translations.openIndex[language])}
        onMouseOut={() => setStatus(null)}
        to="/index"
        className="border border-gray bg-light px-2 dark:bg-dark dark:text-light"
      >
        index
      </NavLink>
      <button
        className="w-3"
        onClick={() => setLanguage(language === "es" ? "en" : "es")}
        onMouseOver={() => setStatus(translations.changeLanguage[language])}
        onMouseOut={() => setStatus(null)}
      >
        {language === "es" ? "EN" : "ES"}
      </button>
      <button
        className="pb-0.5"
        onMouseEnter={() => setStatus(translations.changeMode[language])}
        onMouseLeave={() => setStatus(null)}
        onClick={() => {
          if (theme === "dark") {
            setTheme("light");
            document.documentElement.classList.toggle("dark");
          } else {
            setTheme("dark");
            document.documentElement.classList.toggle("dark");
          }
        }}
      >
        ●
      </button>
    </nav>
  );
}
