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
    <div className="pointer-events-auto w-[200px] border border-gray bg-light p-1 shadow-md dark:bg-dark">
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
                    backgroundColor: chooseColor(project._id),
                    boxShadow: `0 0 2px ${chooseColor(project._id)}`,
                  }}
                  className={`relative flex size-3 cursor-pointer items-center justify-center border`}
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
      </ul>
    </div>
  );
}
