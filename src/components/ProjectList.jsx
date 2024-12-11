import { useContext } from "react";
import { LanguageContext } from "../utils/LanguageContext";

export default function ProjectList({
  projects,
  selectedProjects,
  setSelectedProjects,
  selectedTags,
  items,
}) {
  const { language } = useContext(LanguageContext);

  return (
    <div className="absolute bottom-2 w-[180px] border border-gray bg-light p-1 text-sm dark:bg-dark">
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
                  className={`${
                    selectedProjects?.includes(project._id) ? "bg-primary" : ""
                  } size-3 cursor-pointer border`}
                  onClick={() => {
                    if (selectedProjects?.includes(project._id)) {
                      setSelectedProjects(
                        selectedProjects.filter((p) => p !== project._id),
                      );
                    } else {
                      setSelectedProjects([...selectedProjects, project._id]);
                    }
                  }}
                />
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
