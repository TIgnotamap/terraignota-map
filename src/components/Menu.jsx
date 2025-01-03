import { LanguageContext } from "../utils/LanguageContext";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

export default function Menu({
  data,
  theme,
  setTheme,
  toggleBgAudio,
  bgAudioIsPlaying,
}) {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <nav className="fixed right-6 top-4 flex items-center gap-2 font-serif text-sm">
      <button
        onClick={toggleBgAudio}
        className={`${bgAudioIsPlaying ? "animate-pulse opacity-100" : "opacity-30"}`}
      >
        audio
      </button>
      <NavLink
        to="/info"
        className="size-6 rounded-full border border-gray bg-light pt-[2px] text-center lowercase dark:bg-dark dark:text-light"
      >
        ?
      </NavLink>
      <NavLink
        to="/index"
        className="border border-gray bg-light px-2 dark:bg-dark dark:text-light"
      >
        index
      </NavLink>
      <button
        className="w-3"
        onClick={() => setLanguage(language === "es" ? "en" : "es")}
      >
        {language === "es" ? "EN" : "ES"}
      </button>
      <button
        className="pb-0.5"
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
