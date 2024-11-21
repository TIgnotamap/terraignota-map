import { useContext } from "react";
import { LanguageContext } from "../../utils/LanguageContext";

export default function ProjectList({ projects, items }) {
  const { language } = useContext(LanguageContext);
  const translations = {
    title: {
      en: "Projects",
      es: "Proyectos",
    },
  };
  const translate = (textKey) => translations[textKey]?.[language] || textKey;

  return (
    <div>
      <h1 className="py-4 font-bold">{translate("title")}:</h1>
      <ul>
        {projects?.map((project) => (
          <li key={project._id} className="pl-4">
            <h2 className="underline">{project.title[language]}</h2>
            <ul>
              {items
                .filter((item) => item.project._id === project._id)
                .map((item) => (
                  <li className="pl-4 font-thin" key={item._id}>
                    <h3>{item.code}</h3>
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
