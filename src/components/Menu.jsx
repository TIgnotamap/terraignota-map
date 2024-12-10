import { LanguageContext } from "../utils/LanguageContext";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

export default function Menu({ data, theme, setTheme }) {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <nav className="fixed right-2 top-2 flex items-center gap-2">
      <NavLink
        to="/info"
        className="size-6 rounded-full border border-darkGray bg-light p-1 text-center font-mono text-xs lowercase dark:bg-dark dark:text-light"
      >
        ?
      </NavLink>
      <NavLink
        to="/index"
        className="border border-darkGray bg-light px-2 py-1 font-mono text-xs lowercase dark:bg-dark dark:text-light"
      >
        Index
      </NavLink>
      <button
        className="font-mono text-xs"
        onClick={() => setLanguage(language === "es" ? "en" : "es")}
      >
        {language === "es" ? "EN" : "ES"}
      </button>
      <button
        className="pb-1"
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
