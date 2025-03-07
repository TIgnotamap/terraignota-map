import { useState, useContext, useEffect } from "react";
import { StatusBarContext } from "../utils/StatusBarContext";
import { LanguageContext } from "../utils/LanguageContext";
import { useLocation, useNavigate } from "react-router-dom";
import useIsMobile from "../hooks/useIsMobile";
import useScreenSize from "../hooks/useScreenSize";
import ProjectList from "./ProjectList";
import ItemList from "./ItemList";
import TagList from "./TagList";

export default function Nav({
  selectedProjects,
  setSelectedProjects,
  selectedTags,
  setSelectedTags,
  filteredItems,
  setCurrentItem,
  currentItem,
  setHoveredItem,
  data,
}) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { setStatus } = useContext(StatusBarContext);
  const { language } = useContext(LanguageContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const screenSize = useScreenSize();

  const translations = {
    showFilters: {
      en: "Show filters",
      es: "Mostrar filtros",
    },
    hideFilters: {
      en: "Hide filters",
      es: "Ocultar filtros",
    },
  };

  useEffect(() => {
    if (
      ((screenSize === "small" || screenSize === "medium") && currentItem) ||
      ((pathname === "/index" || pathname === "/info") &&
        screenSize !== "desktop")
    ) {
      setIsNavOpen(false);
    }
  }, [screenSize, currentItem, pathname]);

  const handleNavClick = () => {
    if (
      (pathname === "/index" || pathname === "/info") &&
      screenSize !== "desktop"
    ) {
      navigate("/");
    }
    setIsNavOpen(!isNavOpen);
  };

  const handleHover = () => {
    !isMobile &&
      (!isNavOpen
        ? setStatus(translations.showFilters[language])
        : setStatus(translations.hideFilters[language]));
  };

  useEffect(() => {
    handleHover();
  }, [isNavOpen]);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-10 flex h-full w-full select-none flex-col px-6 pb-12 pt-4 transition-all sm:pb-6 md:w-2/3 md:bg-transparent lg:w-1/2 dark:md:bg-transparent ${isNavOpen ? "bg-lightGray dark:bg-darkGray" : ""}`}
    >
      <div
        onClick={handleNavClick}
        onMouseEnter={handleHover}
        onMouseLeave={() => setStatus(null)}
        className="pointer-events-auto flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray bg-light p-2 text-center text-xs shadow-md sm:size-10 sm:hover:bg-lightGray dark:bg-dark dark:sm:hover:bg-darkGray"
      >
        {isNavOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#fff"
            className="invert dark:invert-0"
          >
            <path d="M256-227.69 227.69-256l224-224-224-224L256-732.31l224 224 224-224L732.31-704l-224 224 224 224L704-227.69l-224-224-224 224Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#fff"
            className="invert dark:invert-0"
          >
            <path d="M781.69-136.92 530.46-388.16q-30 24.77-69 38.77-39 14-80.69 14-102.55 0-173.58-71.01-71.03-71.01-71.03-173.54 0-102.52 71.01-173.6 71.01-71.07 173.54-71.07 102.52 0 173.6 71.03 71.07 71.03 71.07 173.58 0 42.85-14.38 81.85-14.39 39-38.39 67.84l251.23 251.23-42.15 42.16ZM380.77-395.38q77.31 0 130.96-53.66 53.66-53.65 53.66-130.96t-53.66-130.96q-53.65-53.66-130.96-53.66t-130.96 53.66Q196.15-657.31 196.15-580t53.66 130.96q53.65 53.66 130.96 53.66Z" />
          </svg>
        )}
      </div>
      {isNavOpen && (
        <>
          <div className="ml-[1.2rem] h-full w-[1px] border border-gray" />
          <div className="flex h-[calc(100%-4rem)] shrink-0 flex-col gap-6 text-lg sm:text-base md:h-2/3">
            <ProjectList
              projects={data?.projects}
              selectedProjects={selectedProjects}
              setSelectedProjects={setSelectedProjects}
              selectedTags={selectedTags}
              items={data?.items}
              setCurrentItem={setCurrentItem}
            />
            <ItemList
              filteredItems={filteredItems}
              setCurrentItem={setCurrentItem}
              setHoveredItem={setHoveredItem}
            />
            <TagList
              tags={data?.tags}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              items={data?.items}
              currentItem={currentItem}
            />
          </div>
        </>
      )}
    </div>
  );
}
