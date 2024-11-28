import { LanguageContext } from "../utils/LanguageContext";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useMap } from "@vis.gl/react-maplibre";

export default function Header({ data, theme, setTheme }) {
  const { language, setLanguage } = useContext(LanguageContext);
  const { terraIgnotaMap } = useMap();

  return (
    <header className="sticky top-0 flex items-center justify-between font-serif">
      <h1 className="border-gray bg-light dark:bg-dark dark:text-light border px-1 py-1 text-sm">
        <NavLink
          to="/"
          onClick={() =>
            terraIgnotaMap?.flyTo({ center: [-67, -57], zoom: 3.5 })
          }
        >
          {data?.settings?.title[language] || "Terra Ignota Map"}
        </NavLink>
      </h1>
      <nav className="flex items-center gap-2">
        <button
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
        <NavLink
          to="/info"
          className="bg-light dark:bg-dark dark:text-light border-darkGray size-6 rounded-full border p-1 text-center font-mono text-xs lowercase"
        >
          ?
        </NavLink>
        <NavLink
          to="/credits"
          className="bg-light dark:bg-dark dark:text-light border-darkGray rounded-full border px-2 py-1 font-mono text-xs lowercase"
        >
          Index
        </NavLink>
        <button
          className="bg-light dark:bg-dark dark:text-light border-darkGray size-6 rounded-full border p-1 pt-[2px] text-center font-mono text-xs lowercase"
          onClick={() => setLanguage(language === "es" ? "en" : "es")}
        >
          {language === "es" ? "EN" : "ES"}
        </button>
      </nav>
    </header>
  );
}
