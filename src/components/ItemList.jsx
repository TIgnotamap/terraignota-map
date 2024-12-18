import { NavLink } from "react-router-dom";
import chooseColor from "../utils/chooseColor";

export default function ItemList({ setCurrentItem, filteredItems }) {
  return (
    <div className="h-[60vh] overflow-auto border border-gray bg-light p-1 shadow-md dark:bg-dark">
      <ul>
        {filteredItems?.map((item) => (
          <li className="font-serif" key={item._id}>
            <NavLink
              to={`/${item.slug.current}`}
              onClick={() => setCurrentItem(item)}
              className={({ isActive }) =>
                isActive ? "underline" : "hover:underline"
              }
            >
              <h3>
                <div
                  style={{
                    backgroundColor: chooseColor(item.project.title.en),
                    boxShadow: `0 0 1px ${chooseColor(item.project.title.en)}`,
                  }}
                  className={`mb-1 mr-0.5 inline-block size-1 rounded-full`}
                />
                {item.code} {item.name?.en || item.name?.es || ""}
              </h3>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
