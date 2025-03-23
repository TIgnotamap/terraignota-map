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
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
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
