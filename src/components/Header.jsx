import { LanguageContext } from "../utils/LanguageContext";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useMap } from "@vis.gl/react-maplibre";

export default function Header({ data, theme, setTheme }) {
  const { language, setLanguage } = useContext(LanguageContext);
  const { terraIgnotaMap } = useMap();

  return (
    <header className="sticky top-0 flex items-center justify-between font-serif">
      <h1 className="border border-gray bg-light px-1 py-1 text-sm dark:bg-dark dark:text-light">
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
          className="size-6 rounded-full border border-darkGray bg-light p-1 text-center font-mono text-xs lowercase dark:bg-dark dark:text-light"
        >
          ?
        </NavLink>
        <NavLink
          to="/index"
          className="rounded-full border border-darkGray bg-light px-2 py-1 font-mono text-xs lowercase dark:bg-dark dark:text-light"
        >
          Index
        </NavLink>
        <button
          className="size-6 rounded-full border border-darkGray bg-light p-1 pt-[2px] text-center font-mono text-xs lowercase dark:bg-dark dark:text-light"
          onClick={() => setLanguage(language === "es" ? "en" : "es")}
        >
          {language === "es" ? "EN" : "ES"}
        </button>
      </nav>
    </header>
  );
}
