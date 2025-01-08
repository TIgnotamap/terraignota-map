import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { LanguageContext } from "../utils/LanguageContext";
import chooseColor from "../utils/chooseColor";

export default function ItemList({
  setCurrentItem,
  filteredItems,
  setHoveredItem,
}) {
  const { language } = useContext(LanguageContext);

  return (
    <div className="pointer-events-auto h-full w-[calc((100vw-3rem)/6-1.5rem)] overflow-auto border border-gray bg-light p-1 shadow-md dark:bg-dark">
      <ul>
        {filteredItems?.map((item) => (
          <li className="font-serif" key={item._id}>
            <NavLink
              to={`/${item.slug.current}`}
              onClick={() => setCurrentItem(item)}
              onMouseEnter={() => setHoveredItem(item)}
              onMouseOut={() => setHoveredItem(null)}
              className={({ isActive }) =>
                isActive ? "underline" : "hover:underline"
              }
            >
              <h3>
                <div
                  style={{
                    backgroundColor: chooseColor(item.project._id),
                    boxShadow: `0 0 1px ${chooseColor(item.project._id)}`,
                  }}
                  className={`mb-1 mr-0.5 inline-block size-1 rounded-full`}
                />
                {item.code} {item.name ? item.name[language] : ""}
              </h3>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
