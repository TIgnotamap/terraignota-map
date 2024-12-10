import { useContext } from "react";
import { LanguageContext } from "../utils/LanguageContext";

export default function ProjectList({ projects }) {
  const { language } = useContext(LanguageContext);

  return (
    <div className="absolute bottom-2 w-[180px] border border-gray bg-light p-1 text-sm dark:bg-dark">
      <ul>
        {projects?.map((project) => (
          <li key={project._id}>
            <div className="font-serif">
              <span>{project.title[language]}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
