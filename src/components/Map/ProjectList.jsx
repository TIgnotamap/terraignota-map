import { useContext } from "react";
import { LanguageContext } from "../../utils/LanguageContext";
import { NavLink } from "react-router-dom";
import { useMap } from "@vis.gl/react-maplibre";

export default function ProjectList({
  projects,
  items,
  setCurrentItem,
  filteredItems,
}) {
  const { terraIgnotaMap } = useMap();
  const { language } = useContext(LanguageContext);

  return (
    <div className="absolute mt-2 max-w-[180px] border border-gray bg-light p-1 text-sm dark:bg-dark">
      <ul>
        {projects?.map((project) => (
          <li key={project._id}>
            <h2 className="font-serif">{project.title[language]}</h2>
            <ul>
              {items
                .filter((item) => item.project._id === project._id)
                .map((item) => (
                  <li className="pl-4 font-serif" key={item._id}>
                    {filteredItems?.includes(item) ? (
                      <NavLink
                        to={`/${item.slug.current}`}
                        onClick={() => {
                          setCurrentItem(item);
                          terraIgnotaMap?.flyTo({
                            center: [item.long, item.lat],
                            zoom: 8,
                          });
                        }}
                        className={({ isActive }) =>
                          isActive ? "underline" : "hover:underline"
                        }
                      >
                        <h3>{item.code}</h3>
                      </NavLink>
                    ) : (
                      <h3 className="text-gray">{item.code}</h3>
                    )}
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
