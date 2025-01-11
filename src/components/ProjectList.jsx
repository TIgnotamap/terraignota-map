import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { LanguageContext } from "../utils/LanguageContext";
import chooseColor from "../utils/chooseColor";
import { StatusBarContext } from "../utils/StatusBarContext";

export default function ProjectList({
  projects,
  selectedProjects,
  setSelectedProjects,
  selectedTags,
  items,
  setCurrentItem,
}) {
  const { language } = useContext(LanguageContext);
  const { setStatus } = useContext(StatusBarContext);
  const [hoveredProject, setHoveredProject] = useState(null);

  const translations = {
    filter: {
      en: "Filter",
      es: "Filtrar",
    },
    exhibitions: {
      en: "Exhibitions",
      es: "Exhibiciones",
    },
    moreInfo: {
      en: "More info about",
      es: "Más información sobre",
    },
  };

  return (
    <div className="pointer-events-auto w-full border border-gray bg-light p-1 shadow-md md:w-[calc((100vw-1.5rem)/12*3-1.5rem)] lg:w-[calc((100vw-3rem)/6-1.5rem)] dark:bg-dark">
      <ul>
        {projects?.map((project) => {
          const hasMatchingTags = items.some(
            (item) =>
              item.project._id === project._id &&
              selectedTags.every((tag) =>
                item.tags?.some((itemTag) => itemTag._id === tag),
              ),
          );

          return (
            <li key={project._id}>
              <div
                className="flex items-center gap-1"
                onMouseEnter={() => {
                  setHoveredProject(project._id);
                }}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div
                  className="flex items-center gap-1 font-serif"
                  onMouseEnter={() => {
                    setStatus(
                      translations.filter[language] +
                        " " +
                        project.title[language],
                    );
                  }}
                  onMouseLeave={() => setStatus(null)}
                  onClick={() => {
                    if (hasMatchingTags) {
                      if (selectedProjects?.includes(project._id)) {
                        setSelectedProjects(
                          selectedProjects.filter((p) => p !== project._id),
                        );
                      } else {
                        setSelectedProjects([...selectedProjects, project._id]);
                      }
                    }
                  }}
                >
                  <div
                    style={{
                      backgroundColor: chooseColor(project._id),
                      boxShadow: `0 0 2px ${chooseColor(project._id)}`,
                    }}
                    className={`relative flex size-3 items-center justify-center border ${
                      !hasMatchingTags
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer"
                    }`}
                  >
                    {selectedProjects?.includes(project._id) && (
                      <div className="absolute size-1.5 rounded-full bg-dark" />
                    )}
                  </div>
                  <span
                    className={`${
                      (selectedTags.length > 0 && !hasMatchingTags) ||
                      (selectedProjects != 0 &&
                        !selectedProjects.includes(project._id))
                        ? "text-gray"
                        : ""
                    }`}
                  >
                    {project.title[language]}
                  </span>
                </div>
                {hoveredProject == project._id && (
                  <NavLink
                    to={`/${project.slug.current}`}
                    onClick={() => {
                      setCurrentItem(project);
                      setSelectedProjects([project._id]);
                    }}
                    onMouseEnter={() => {
                      setStatus(
                        translations.moreInfo[language] +
                          " " +
                          project.title[language],
                      );
                    }}
                    onMouseLeave={() => setStatus(null)}
                    className="dark:invert"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="18px"
                      viewBox="0 -960 960 960"
                      width="18px"
                      fill="#000"
                    >
                      <path d="M481.12-270.77q13.26 0 22.38-9.16t9.12-22.42q0-13.27-9.16-22.38-9.16-9.12-22.43-9.12-13.26 0-22.38 9.16-9.11 9.16-9.11 22.43 0 13.26 9.16 22.38 9.16 9.11 22.42 9.11Zm-20.66-132.46h38.62q1.54-26.08 9.8-42.39 8.27-16.3 34.04-41.61 26.77-26.77 39.85-47.96 13.08-21.19 13.08-49.06 0-47.29-33.23-75.37-33.23-28.07-78.62-28.07-43.15 0-73.27 23.46-30.11 23.46-44.11 53.92l36.76 15.23q9.62-21.84 27.5-38.61 17.89-16.77 51.58-16.77 38.92 0 56.85 21.34 17.92 21.35 17.92 46.97 0 20.77-11.23 37.11-11.23 16.35-29.23 32.89-34.77 32.07-45.54 54.38-10.77 22.31-10.77 54.54ZM480.13-120q-74.67 0-140.41-28.34-65.73-28.34-114.36-76.92-48.63-48.58-76.99-114.26Q120-405.19 120-479.87q0-74.67 28.34-140.41 28.34-65.73 76.92-114.36 48.58-48.63 114.26-76.99Q405.19-840 479.87-840q74.67 0 140.41 28.34 65.73 28.34 114.36 76.92 48.63 48.58 76.99 114.26Q840-554.81 840-480.13q0 74.67-28.34 140.41-28.34 65.73-76.92 114.36-48.58 48.63-114.26 76.99Q554.81-120 480.13-120Zm-.13-40q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                    </svg>
                  </NavLink>
                )}
              </div>
            </li>
          );
        })}
        <hr />
        <li>
          <div
            className="flex items-center gap-1 font-serif"
            onMouseEnter={() =>
              setStatus(
                translations.filter[language] +
                  " " +
                  translations.exhibitions[language],
              )
            }
            onMouseLeave={() => setStatus(null)}
            onClick={() => {
              if (!selectedTags.length > 0) {
                if (selectedProjects?.includes("exhibitions")) {
                  setSelectedProjects(
                    selectedProjects.filter((p) => p !== "exhibitions"),
                  );
                } else {
                  setSelectedProjects([...selectedProjects, "exhibitions"]);
                }
              }
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                boxShadow: `0 0 2px #fff`,
              }}
              className={`relative flex size-3 items-center justify-center border ${
                selectedTags.length === 0
                  ? "cursor-pointer"
                  : "cursor-not-allowed opacity-50"
              }`}
            >
              {selectedProjects?.includes("exhibitions") && (
                <div className="absolute size-1.5 rounded-full bg-dark" />
              )}
            </div>
            <span
              className={`${
                selectedTags.length > 0 ||
                (selectedProjects != 0 &&
                  !selectedProjects?.includes("exhibitions"))
                  ? "text-gray"
                  : ""
              }`}
            >
              {translations.exhibitions[language]}
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
}
