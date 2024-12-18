import { useContext } from "react";
import { LanguageContext } from "../utils/LanguageContext";
import chooseColor from "../utils/chooseColor";

export default function ProjectList({
  projects,
  selectedProjects,
  setSelectedProjects,
  selectedTags,
  items,
}) {
  const { language } = useContext(LanguageContext);

  return (
    <div className="border border-gray bg-light p-1 shadow-md dark:bg-dark">
      <ul>
        {projects?.map((project) => {
          const hasMatchingTags = items.some(
            (item) =>
              item.project._id === project._id &&
              item.tags?.some((tag) => selectedTags?.includes(tag._id)),
          );

          return (
            <li key={project._id}>
              <div className="flex items-center gap-1 font-serif">
                <div
                  onClick={() => {
                    if (selectedProjects?.includes(project._id)) {
                      setSelectedProjects(
                        selectedProjects.filter((p) => p !== project._id),
                      );
                    } else {
                      setSelectedProjects([...selectedProjects, project._id]);
                    }
                  }}
                  style={{
                    backgroundColor: chooseColor(project.title[language]),
                    boxShadow: `0 0 2px ${chooseColor(project.title[language])}`,
                  }}
                  className={`relative flex size-3 cursor-pointer items-center justify-center border`}
                >
                  {selectedProjects?.includes(project._id) && (
                    <div className="absolute size-1.5 rounded-full bg-dark" />
                  )}
                </div>
                <span
                  className={`${selectedTags.length > 0 && !hasMatchingTags ? "text-gray" : ""}`}
                >
                  {project.title[language]}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
