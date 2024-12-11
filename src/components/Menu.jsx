import { LanguageContext } from "../utils/LanguageContext";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

export default function Menu({ data, theme, setTheme }) {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <nav className="fixed right-6 top-4 flex items-center gap-2 font-serif text-sm">
      <NavLink
        to="/info"
        className="size-6 rounded-full border border-darkGray bg-light pt-[2px] text-center lowercase dark:bg-dark dark:text-light"
      >
        ?
      </NavLink>
      <NavLink
        to="/index"
        className="border border-darkGray bg-light px-2 dark:bg-dark dark:text-light"
      >
        index
      </NavLink>
      <button
        className=""
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
