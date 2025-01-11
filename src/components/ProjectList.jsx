import { useContext } from "react";
import { LanguageContext } from "../utils/LanguageContext";
import chooseColor from "../utils/chooseColor";
import { StatusBarContext } from "../utils/StatusBarContext";

export default function ProjectList({
  projects,
  selectedProjects,
  setSelectedProjects,
  selectedTags,
  items,
}) {
  const { language } = useContext(LanguageContext);
  const { setStatus } = useContext(StatusBarContext);

  const translations = {
    filter: {
      en: "Filter",
      es: "Filtrar",
    },
    exhibitions: {
      en: "Exhibitions",
      es: "Exhibiciones",
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
              <div className="flex items-center gap-1 font-serif">
                <div
                  onMouseEnter={() =>
                    setStatus(
                      translations.filter[language] +
                        " " +
                        project.title[language],
                    )
                  }
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
            </li>
          );
        })}
        <hr />
        <li>
          <div className="flex items-center gap-1 font-serif">
            <div
              onMouseEnter={() =>
                setStatus(
                  translations.filter[language] +
                    " " +
                    translations.exhibitions[language],
                )
              }
              onMouseLeave={() => setStatus(null)}
              onClick={() => {
                // setSelectedProjects(["exhibitions"]);
                if (selectedProjects?.includes("exhibitions")) {
                  setSelectedProjects(
                    selectedProjects.filter((p) => p !== "exhibitions"),
                  );
                } else {
                  setSelectedProjects([...selectedProjects, "exhibitions"]);
                }
              }}
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
                selectedProjects?.includes("exhibitions") ? "text-gray" : ""
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
