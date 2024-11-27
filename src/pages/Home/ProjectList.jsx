import { useContext } from "react";
import { LanguageContext } from "../../utils/LanguageContext";
import { NavLink } from "react-router-dom";

export default function ProjectList({ projects, items, setCurrentItem }) {
  const { language } = useContext(LanguageContext);

  return (
    <div className="bg-light dark:bg-dark border-gray absolute mt-2 max-w-[180px] border p-1 text-sm">
      <ul>
        {projects?.map((project) => (
          <li key={project._id}>
            <h2 className="font-serif">{project.title[language]}</h2>
            <ul>
              {items
                .filter((item) => item.project._id === project._id)
                .map((item) => (
                  <li className="pl-4 font-serif" key={item._id}>
                    <NavLink
                      to={`/${item.slug.current}`}
                      onClick={() => setCurrentItem(item)}
                      className={({ isActive }) =>
                        isActive ? "underline" : "hover:underline"
                      }
                    >
                      <h3>{item.code}</h3>
                    </NavLink>
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
